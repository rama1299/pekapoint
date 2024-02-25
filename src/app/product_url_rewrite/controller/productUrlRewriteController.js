import {pool} from '../../../config/dbConfig.js'
import dotenv from 'dotenv'

dotenv.config() 

const schema = process.env.SCHEMA

export class ProductUrlRewriteController {
    static async getProductUrl(req, res, next) {
        const client = await pool.connect()
        let filter = req.query.filter == 'new' ? 'created_at' : 'visitor'
        if (!parseInt(req.query.page)) {
            req.query.page = 1;
        }
        if (!parseInt(req.query.limit)) {
            req.query.limit = 24
        }
        try {
            const item = req.params.item
            const page = req.query.page
            const perPage = req.query.limit
            const limit = perPage;
            const offset = (page - 1) * perPage;

            const urlResponse = await client.query(
                `SELECT product_ids, url, id, created_at
                FROM ${schema}.product_url_rewrite
                WHERE item = $1
                ORDER BY ${filter} DESC
                LIMIT $2
                OFFSET $3;`,
                [item, limit, offset]
            )

            if (urlResponse.rows === 0) {
                throw({name: 'ErrorNotFound'})
            } 

            const urlCount = await client.query(
                `SELECT COUNT(*)
                FROM ${schema}.product_url_rewrite
                WHERE item = 2`
            )

            let totalProducts = parseInt(urlCount.rows[0].count)
            const totalPages = Math.ceil(totalProducts / limit)

            let urlData = urlResponse.rows.map((data) => {
                return {
                    ...data,
                    product_ids: JSON.parse(data.product_ids)
                }
            })

            let arrayProduct_ids = urlData.map(data => data.product_ids)
            let flatAndUniqueIds = [...new Set(arrayProduct_ids.flat())]
            let placeholders = flatAndUniqueIds.map((_, i) => { return `$${i + 1}`})

            const productResponse = await client.query(
                `SELECT id, feature_image, title, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\",\"rating\":\"4.5\"}]' as affiliate
                FROM ${schema}.products
                WHERE id IN (${placeholders})`,
                flatAndUniqueIds
            )

            if (productResponse.rows === 0) {
                throw({name: 'ErrorNotFound'})
            }

            let dataProduct = productResponse.rows

            let data = urlData.map((data) => {
                let matchData = data.product_ids.map((ids) => {
                    let data = dataProduct.find(obj => obj.id === ids)

                    if (data) {
                        return {
                            product_id : data.id,
                            feature_image: data.feature_image,
                            title: data.title,
                            affiliate : JSON.parse(data.affiliate)
                        }
                    } else {
                        return {
                            product_id : '',
                            feature_image: '',
                            title: '',
                            affiliate: [],
                        }
                    }
                })
                return {
                    id : data.id,
                    url : data.url,
                    product: matchData,
                    created_at: data.created_at
                }
            })

            res.status(200).json({data, totalProducts, totalPages})
        } catch (error) {
            console.log(error)
        } finally {
            client.release()
        }
    }

    static async getProductUrlByUrl(req, res, next) {
        const client = await pool.connect()
        try {
            const url = req.body.url

            if (!url) {
                throw ({name: 'InvalidCredentials'})
            }

            const findData = await client.query(
                `SELECT *
                FROM ${schema}.product_url_rewrite
                WHERE url = $1;`,
                [url]
            )

            if (findData.rowCount <= 0) {
                throw ({name: 'ErrorNotFound'})
            }

            const existData = findData.rows[0]

            const updateVisitor = existData.visitor + 1

            const updateData = await client.query(
                `UPDATE ${schema}.product_url_rewrite
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
            let {url, idProduct, idVariant, write_type} = req.body

            if (!url) {
                throw ({name: 'InvalidCredentials'})
            }

            const findData = await client.query(
                `SELECT * FROM ${schema}.product_url_rewrite WHERE url = $1;`,
                [url]
            )

            if (findData.rowCount > 0) {
                throw ({name: 'DataAlreadyExist'})
            }

            const visitor = 1
            const slug = url.split('/').filter(Boolean).pop()
            const item = idProduct.length
            idProduct = JSON.stringify(idProduct)
            idVariant = JSON.stringify(idVariant)
            console.log(item)

            const createData = await client.query(
                `INSERT INTO ${schema}.product_url_rewrite (url, product_ids, variant_ids, slug, visitor, write_type, item)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [url, idProduct, idVariant, slug, visitor, write_type, item]
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