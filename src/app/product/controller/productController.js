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
                `SELECT *, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"},{\"store\":\"Tokopedia\",\"price\":\"20000000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"}]' as affiliate, '21000000' as launch_price FROM products WHERE summary IS NOT NULL ORDER BY spec_score DESC, created_at DESC LIMIT $1 OFFSET $2`,
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
            
            let slugs = slug.split('-vs-').map((item) => item.replace('vs-', ''));
            slugs = slugs.slice(0, Math.min(slugs.length, 4));

            const placeholders = slugs.map((_, index) => `$${index + 1}`).join(", ");

            const response = await client.query(
                `SELECT * FROM products WHERE slug IN (${placeholders})`,
                slugs
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

    static async findProductSpecById(req, res) {
        try {
            const id = req.params.id
            let dataId = id.split('-').map((item) => item.replace('-', ''));
            const placeholders = dataId.map((_, index) => `$${index + 1}`).join(", ");

            const client = await pool.connect()
            const response = await client.query(
                `SELECT 
                product_id, 
                concat(
                    '[', 
                    array_to_string(
                        array_agg(resume), 
                        ', '
                    ),
                    ']'
                ) AS datas 
            FROM (
                SELECT 
                    psa.product_id, 
                    concat(
                        '{"title":"', 
                        ag.name, 
                        '","score":', case WHEN ags.score is null THEN 0 ELSE ags.score END    ,',"attributes":[', 
                        array_to_string(
                            array_agg(
                                concat(
                                    '{"title":"', 
                                    sa.name, 
                                    '","score":',
                                    CASE
                                        WHEN psa.value = 'Yes' THEN 100
                                        WHEN psa.value = 'No' THEN 0
                                        ELSE psa.score
                                    END,
                                    ',"spec":"', 
                                    replace(psa.value, '"', ''''), 
                                    '"}'
                                ) 
                            ), 
                            ', '
                        ),
                        ']}'
                    ) AS resume 
                FROM 
                    public.prod_spec_attributes psa 
                    INNER JOIN spec_attributes sa ON psa.attribute_id=sa.id
                    INNER JOIN attribute_groups ag ON psa.attribute_group_id=ag.id
                    LEFT JOIN attr_group_spec_score ags ON ag.id=ags.attr_group_id AND psa.product_id=ags.product_id
                WHERE 
                    psa.product_id IN (${placeholders})
                GROUP BY 
                    psa.product_id, ag.id, ags.id
            ) product_summary
            GROUP BY 
                product_id;
            `,
                dataId
            )

            const data = response.rows

            res.status(200).json(data)
            client.release()
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error!'})
        }
    }
}