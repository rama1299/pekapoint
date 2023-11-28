import { pool } from "../../../config/dbConfig.js"

export class ProductController {
    static async findProduct(req, res) {
        if (!parseInt(req.query.page)) {
            req.query.page = 1;
          }
        try {
            const client = await pool.connect();
            const page = req.query.page
            const perPage = 21
            const limit = perPage;
            const offset = (page - 1) * perPage;

            const response = await client.query(
                'SELECT * FROM products ORDER BY spec_score DESC, created_at DESC LIMIT $1 OFFSET $2',
                [limit, offset]
            );
            const data = response.rows

            if (data.length === 0) {
                return res.status(404).json({message: 'Data Not Found!'})
            }

            res.status(200).json(data)
            client.release()
        } catch (error) {
            console.log(error)
            return res.status(505).json({message: 'Internal Server Error!'})
        }
    }

    static async findProductBySlug(req, res) {
        try {
            const client = await pool.connect()
            const slug = req.params.slug

            const response = await client.query(
                'SELECT * FROM products WHERE slug=$1',
                [slug]
            )
            const data = response.rows

            if (data.length === 0) {
                return res.status(404).json({message: 'Data Not Found!'})
            }

            res.status(200).json(data)
            client.release()
        } catch (error) {
            
        }
    }
}