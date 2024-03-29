import { pool } from "../../../config/dbConfig.js"
import dotenv from "dotenv"
import { generateHashPassword, compareHashPassword } from "../../../system/services/hashingPassword.js"
import { generateJwtToken } from "../../../system/services/jwt.js"
import { saveDataToFile } from "../../../system/services/saveDataToFile.js"
import fs from 'fs'
import jwt from 'jsonwebtoken'

dotenv.config()

const schema = process.env.SCHEMA

export class UserController {
    static async userRegister(req, res, next) {
        const client = await pool.connect();
    
        try {
          const { username, password, email, role } = req.body;
    
          if (!username || !password || !email, role) {
            throw { name: 'InvalidCredentials'};
          }
    
          if (password.length < 8) {
            throw { name: 'InvalidPassword'};
          }

          const findUser = await client.query(
            `SELECT * FROM ${schema}.app_user
            WHERE username = $1;`,
            [username]
          )

          if (findUser.rows.length > 0) {
            throw { name: 'UsernameAlreadyExist' };
          }
    
          const hashedPassword = await generateHashPassword(password, 10);
    
          const query = {
            text: `INSERT INTO ${schema}.app_user (username, password, email, role) VALUES ($1, $2, $3, $4);`,
            values: [username, hashedPassword, email, role],
          };
    
          const response = await client.query(query);
    
          if (response.rowCount === 1) {
            res.status(201).json({ message: 'Registration successful' });
          } else {
            throw { name: 'RegistrationFailed'};
          }
        } catch (error) {
          next(error);
        } finally {
          client.release();
        }
    }
    
    static async userLogin(req, res, next) {
        const client = await pool.connect()
        let token
        try {
            const { username, password } = req.body
            const ip = req.ip
            const UserAgent = req.get('User-Agent')

            if (!username || !password) {
                throw ({ name: 'InvalidCredentials'})
            }

            const findUser = await client.query(
                `SELECT * FROM ${schema}.app_user
                WHERE username = $1;`,
                [username]
            )
    
            if (findUser.rows.length === 0) {
                throw { name: 'WrongUsernameOrPassword' };
            }

            const existUser = findUser.rows[0]

            const comparePassword = await compareHashPassword(password, existUser.password)

            if (!comparePassword) {
                throw { name: 'WrongUsernameOrPassword' };
            }

            let currentDate = new Date()
            let expired = new Date(currentDate.getTime() + (1 * 60 * 60 * 1000));

            const data = {
              ip,
              UserAgent,
              expired
            }

            const saveData = await saveDataToFile(data)

            if (!saveData) {
              throw ({name: 'LoginFailed'})
            }
            
            res.status(200).json({ message: 'Login successful'})
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async adminLogin(req, res, next) {
      const client = await pool.connect()
      try {
        const { username, password } = req.body

      if (!username || !password) {
        res.status(200).json({ message : 'unauthorized'})
        return
      }

      const findUser = await client.query(
        `SELECT * FROM ${schema}.app_user
        WHERE username = $1;`,
        [username]
      )

      if (findUser.rows.length === 0) {
        res.status(200).json({ message : 'unauthorized'})
        return
      }

      const existUser = findUser.rows[0]

      const comparePassword = await compareHashPassword(password, existUser.password)

      if (!comparePassword) {
        res.status(200).json({ message : 'unauthorized'})
        return
      }

      if (existUser.role != 'admin') {
        res.status(200).json({ message : 'unauthorized'})
        return
      }

      const token = jwt.sign(
        {
          username: existUser.username,
          role: existUser.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '12h'}
      )

      res.status(200).json({token})
      } catch (error) {
        res.status(200).json({ message : 'unauthorized'})
        return
      } finally {
        client.release()
      }
    }
}