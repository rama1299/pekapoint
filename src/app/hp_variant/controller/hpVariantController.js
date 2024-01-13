import { pool } from "../../../config/dbConfig.js"

export class HpVariantController {
    static async findVariantByProductId(req, res, next) {
        const client = await pool.connect()

        try {
            const id = req.params.id
            let dataFind = id.split(',').map((item) => item.replace(',', ''));
            const placeholders = dataFind.map((_, index) => `$${index + 1}`).join(", ");
            
            const country = req.query.country ?? 'us'
            const placeholderCountry = `$${dataFind.length + 1}`
            dataFind = [...dataFind, country]

            if (!id) {
                throw ({name: 'InvalidCredentials'})
            }

            const response = await client.query(
                `SELECT
                product_id,
                jsonb_agg(jsonb_build_object(
                  'id', id,
                  'variant', variant,
                  'serie', serie,
                  'code', code,
                  'var_slug', var_slug,
                  'ram', ram,
                  'storage', storage,
                  'prices', prices
                )) AS data
              FROM (
                SELECT
                  v.id,
                  v.product_id,
                  v.variant,
                  v.serie,
                  v.code,
                  v.var_slug,
                  v.ram,
                  v.storage,
                  jsonb_agg(jsonb_build_object(
                    'price_id', vp.id,
                    'country', vp.country,
                    'price', vp.price,
                    'currency', vp.currency
                  )) AS prices
                FROM
                  public.hp_variants AS v
                LEFT JOIN
                  public.hp_variant_prices AS vp ON v.id = vp.variant_id
                WHERE
                  v.product_id IN (${placeholders}) AND vp.country = ${placeholderCountry}
                GROUP BY
                  v.id, v.product_id, v.variant, v.serie, v.code, v.var_slug, v.ram, v.storage
              ) AS subquery
              GROUP BY
                product_id;              
              `,
                dataFind
            )

            const data = response.rows

            if (data.length == 0) {
                throw ({name: 'ErrorNotFound'})
            }

            res.status(200).json(data)
        }catch (error) {
          next(error)
        } finally {
            client.release()
        }
    }
}