import {pool} from '../../../config/dbConfig.js'

export class ProductUrlRewriteController {
    static async getProductUrlByUrl(req, res, next) {
        const client = await pool.connect()
        try {
            const url = req.body.url

            if (!url) {
                throw ({name: 'InvalidCredentials'})
            }

            const findData = await client.query(
                `SELECT *
                FROM public.product_url_rewrite
                WHERE url = $1;`,
                [url]
            )

            if (findData.rowCount <= 0) {
                throw ({name: 'ErrorNotFound'})
            }

            const existData = findData.rows[0]

            const updateVisitor = existData.visitor + 1

            const updateData = await client.query(
                `UPDATE public.product_url_rewrite
                SET visitor = $1
                WHERE url = $2;`,
                [updateVisitor, url]
            )

            return res.status(200).json(existData)

        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async createProductUrl(req, res, next) {
        const client = await pool.connect()
        try {
            let {url, idProduct, idVariant} = req.body

            if (!url) {
                throw ({name: 'InvalidCredentials'})
            }

            const findData = await client.query(
                `SELECT * FROM public.product_url_rewrite WHERE url = $1;`,
                [url]
            )

            if (findData.rowCount > 0) {
                throw ({name: 'DataAlreadyExist'})
            }

            const visitor = 1
            const slug = url.split('/').filter(Boolean).pop()
            idProduct = JSON.stringify(idProduct)
            idVariant = JSON.stringify(idVariant)

            const createData = await client.query(
                `INSERT INTO public.product_url_rewrite (url, product_ids, variant_ids, slug, visitor)
                VALUES ($1, $2, $3, $4, $5)`,
                [url, idProduct, idVariant, slug, visitor]
            )

            if (createData.rowCount == 0) {
                throw ({name: 'CreateFailed'})
            }

            res.status(201).json({message: 'Created successful'})
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }
}