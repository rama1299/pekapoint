import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import fs from 'fs'

dotenv.config()
const secret = process.env.JWT_SECRET

// export const authentication = async (req, res, next) => {
//     try {
//         const { authorization } = req.headers
        
//         if (authorization === undefined || !authorization) {
//             return res.status(401).json({ message: 'Unauthorized' })
//         }
        
//         try {
//             const token = authorization.split(" ")[1]
//             const decodedToken = await jwt.verify(token, secret);
//             req.decodedToken = decodedToken;
//             next();
//           } catch (error) {
//             if (error.name === 'TokenExpiredError') {
//               return res.status(401).json({ message: 'Token has expired' });
//             } else if (error.name === 'JsonWebTokenError') {
//               return res.status(401).json({ message: 'Invalid token' });
//             } else {
//               console.error('Error verifying token:', error);
//               return res.status(401).json({ message: 'Unauthorized' });
//             }
//           }
//     } catch (error) {
//         throw new Error(error)
//     }
// }

export const authentication = async (req, res, next) => {
  try {
    const ip = req.ip
    const UserAgent = req.get('User-Agent')
    const fileName = 'dataLogin.txt'
    
    try {
      const fileContent = await fs.readFileSync(fileName, 'utf8');
      const fileContenJSON = JSON.parse(fileContent)
      const currentDate = new Date()
      const filterExpiredData = fileContenJSON.filter(data => new Date(data.expired) > currentDate)
      const updateDataLogin = await fs.writeFileSync(fileName, JSON.stringify(filterExpiredData, null, 2), 'utf8');

      if (filterExpiredData.length === 0) {
        console.log('file gagal di filter')
        return res.status(401).json({message: 'Unauthorized'})
      }

      const findExistData = filterExpiredData.find(data => data.ip == ip && data.UserAgent == UserAgent)
      if (!findExistData) {
        console.log('data tidak ada')
        return res.status(401).json({message: 'Unauthorized'})
      }

      next()

    } catch (error) {
      console.log(error.message)
      return res.status(500).json({message: 'Internal server error'})
    }


  } catch (error) {
      console.log(error.message)
      return res.status(500).json({message: 'Internal server error'})
  }
}