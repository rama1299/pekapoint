import dotenv from 'dotenv'
import {pool} from '../../../config/dbConfig.js'

dotenv.config() 

export class AdsManagementController{
    static async findAll(req, res, next) {
        const client = await pool.connect()
        try {

            const page = req.query.page || null

            let dataFindAll

            if (page) {

                const response = await client.query(
                    `SELECT * FROM ads_management WHERE page = $1`,
                    [page]
                )

                dataFindAll = response
            } else {

                const response = await client.query(
                    `SELECT * FROM ads_management`
                )

                dataFindAll = response
            }

            if (dataFindAll.rows == 0) {
                throw {name: 'ErrorNotFound'}
            }


            const data = dataFindAll.rows

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

    static async update(req, res, next) {
        const client = await pool.connect()
        try {
            const id = req.params.id || null
            const {title, page, content_position, content} = req.body
            console.log(req.body)

            if (!id) {
                throw {name: 'InvalidCredentials'}
            }

            if (!title || !page || !content_position || !content) {
                throw {name: 'InvalidCredentials'}
            }
            
            let rowCount = 0

            const existData = await client.query(
                `SELECT * FROM ads_management WHERE id = $1`,
                [id]
            )

            if (existData.rows == 0) {
                throw {name: 'ErrorNotFound'}
            }

            const updateData = await client.query(
                `UPDATE ads_management
                SET title = $1, page = $2, content_position = $3, content = $4
                WHERE id = $5`,
                [title, page, content_position, content, id]
            )

            rowCount = updateData.rowCount

            if (rowCount == 0) {
                throw {name: 'CreateFailed'}
            }

            res.status(200).json({message: 'Update ads successfully!'})

        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async delete(req, res, next) {
        const client = await pool.connect()
        try {
            let id = parseFloat(req.params.id) || null

            const deleteData = await client.query(
                `DELETE FROM ads_management WHERE id = $1`,
                [id]
            )

            console.log(deleteData)

            res.status(200).json({message: 'Delete ads successfully!'})
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }
}