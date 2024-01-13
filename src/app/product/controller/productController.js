import { pool } from "../../../config/dbConfig.js"

export class ProductController {
    static async findProduct(req, res, next) {
        const client = await pool.connect();
        if (!parseInt(req.query.page)) {
            req.query.page = 1;
          }
          console.log('masuk')
          const filters = req.query.filter
          let filterObject
          if (filters != undefined && typeof filters === 'object') {
              filterObject = filters.map((filter) => {
                let [key, value] = filter.split('=')
                let arrayValue = value.split(',')
                return {
                    [key] : arrayValue
                }
              })
            } else if (filters != undefined && typeof filters === 'string') {
                let [key, value] = filters.split('=')
                let arrayValue = value.split(',')
                filterObject = {[key] : arrayValue}
            }
        try {
            const page = req.query.page
            const perPage = 24
            const limit = perPage;
            const offset = (page - 1) * perPage;

            if (filterObject) {
                const arrayBrand = filterObject.brand
                const query = {
                    text: `SELECT *, '[{"store":"Shopee","price":"19450000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"},{"store":"Tokopedia","price":"20000000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"}]' as affiliate, '21000000' as launch_price FROM public.products WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL ORDER BY spec_score DESC, created_at DESC LIMIT $2 OFFSET $3`,
                    values: [arrayBrand.map(brand => `%${brand}%`), limit, offset],
                };

                const response = await client.query(query)
                const totalResult = await pool.query({
                    text: `SELECT COUNT(*) FROM public.products WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL`,
                    values: [arrayBrand.map(brand => `%${brand}%`)],
                });
              
                const data = response.rows
                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);

                if (data.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }
    
                res.status(200).json({data, totalProducts, totalPages})
            } else {
                const response = await client.query(
                    `SELECT *, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"},{\"store\":\"Tokopedia\",\"price\":\"20000000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"}]' as affiliate, '21000000' as launch_price FROM products WHERE summary IS NOT NULL ORDER BY spec_score DESC, created_at DESC LIMIT $1 OFFSET $2`,
                    [limit, offset]
                );
        
                const data = response.rows
                const totalResult = await pool.query('SELECT COUNT(*) FROM products');
                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);
    
                if (data.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }

                res.status(200).json({data, totalProducts, totalPages})
            }
        } catch (error) {
            console.log(error)
            next(error)
        } finally {
            client.release();
        }
    }

    static async findProductBySlug(req, res, next) {
        const client = await pool.connect();
    
        try {
          const slug = req.params.slug;
    
          if (!slug) {
            throw { name: 'ValidationError'};
          }
    
          const slugs = slug.split('-vs-').map((item) => item.replace('vs-', '')).slice(0, 4);
    
          const response = await client.query(
            'SELECT * FROM products WHERE slug = ANY($1::text[])',
            [slugs]
          );
    
          const data = response.rows;
    
          if (data.length === 0) {
            throw { name: 'ErrorNotFound'};
          }
    
          res.status(200).json(data);
        } catch (error) {
          console.error(error);
          next(error);
        } finally {
          client.release();
        }
      }

    static async findProductSpecById(req, res, next) {
        const client = await pool.connect()
        try {
            const id = req.params.id
            let dataId = id.split(',').map((item) => item.replace(',', ''));
            const placeholders = dataId.map((_, index) => `$${index + 1}`).join(", ");

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

            if (data.length === 0) {
                throw ({name: 'ErrorNotFound'})
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release();
        }
    }

    static async findBrand(req, res, next) {
        const client = await pool.connect()
        try {
            const response = await client.query(
                `SELECT DISTINCT SPLIT_PART(title, ' ', 1) AS brand
                FROM public.products
                ORDER BY brand ASC;`
            )

            const data = response.rows

            if(data.length === 0) {
                throw ({name: 'ErrorNotFound'})
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release();
        }
    }

    static async findProductImageBySlug(req, res, next) {
        const client = await pool.connect()
        const slug = req.params.slug

        try {
            if (!slug) {
                throw ({name: 'ValidationError'})
            }
            
            const response = await client.query(
                `SELECT feature_image
                 FROM public.products
                 WHERE slug = $1;`,
                [slug]
            );

            const data = response.rows
            if (data.length === 0) {
                throw ({name: 'ErrorNotFound'})
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release();
        }
    }
}