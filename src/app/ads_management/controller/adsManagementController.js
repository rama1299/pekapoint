import dotenv from 'dotenv'
import {pool} from '../../../config/dbConfig.js'

dotenv.config() 

export class AdsManagementController{
    static async findAll(req, res, next) {
        const client = await pool.connect()
        try {

            const findAll = await client.query(
                `SELECT * FROM ads_management`
            )

            if (findAll.rows == 0) {
                throw {name: 'ErrorNotFound'}
            }


            const data = findAll.rows

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async findById(req, res, next) {
        const client = await pool.connect()
        try {
            let id = parseFloat(req.params.id) || null

            const findData = await client.query(
                `SELECT * FROM ads_management WHERE id = $1`,
                [id]
            )

            if (findData.rows == 0) {
                throw {name: 'ErrorNotFound'}
            }

            res.status(200).json(findData.rows)
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async create(req, res, next) {
        const client = await pool.connect()
        try {
            const {title, page, content_position, content} = req.body
            console.log(req.body)

            if (!title || !page || !content_position || !content) {
                throw {name: 'InvalidCredentials'}
            }
            
            let rowCount = 0

            const createData = await client.query(
                `INSERT INTO ads_management(title, page, content_position, content)
                VALUES ($1,$2,$3,$4)`,
                [title, page, content_position, content]
            )

            rowCount = createData.rowCount

            if (rowCount == 0) {
                throw {name: 'CreateFailed'}
            }

            res.status(200).json({message: 'Created ads successfully!'})

        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }
}