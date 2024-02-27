import { CronJob } from "cron";
import fs from 'fs'
import { pool } from '../../config/dbConfig.js'


export async function updateProductHomeJson() {
    const client = await pool.connect();
    try {

        const filter = [[1, 8], [2, 8], [2, 8]];
        let dataResult = [];

        for (let index = 0; index < filter.length; index++) {
            let sort = index < 2 ? 'visitor' : 'created_at';
            const urlResponse = await client.query(
                `SELECT product_ids, url, id, created_at, visitor
                FROM public.product_url_rewrite
                WHERE item = $1
                ORDER BY ${sort} DESC
                LIMIT $2;`,
                filter[index]
            );

            if (urlResponse.rows.length === 0) {
                dataResult.push([]);
                continue;  // Lanjutkan ke iterasi berikutnya
            } 

            const urlData = urlResponse.rows.map((data) => {
                return {
                    ...data,
                    product_ids: JSON.parse(data.product_ids)
                };
            });

            console.log('index '+ index)
            console.log(sort)

            const arrayProduct_ids = urlData.map(data => data.product_ids);
            const flatAndUniqueIds = [...new Set(arrayProduct_ids.flat())];
            const placeholders = flatAndUniqueIds.map((_, i) => `$${i + 1}`);

            const productResponse = await client.query(
                `SELECT id, feature_image, title, spec_score, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\",\"rating\":\"4.5\"}]' as affiliate
                FROM public.products
                WHERE id IN (${placeholders})`,
                flatAndUniqueIds
            );

            if (productResponse.rows.length === 0) {
                dataResult.push([]);
                continue;  // Lanjutkan ke iterasi berikutnya
            }

            const dataProduct = productResponse.rows;

            const data = urlData.map((data) => {
                const matchData = data.product_ids.map((ids) => {
                    const product = dataProduct.find(obj => obj.id === ids);

                    if (product) {
                        return {
                            product_id: product.id,
                            feature_image: product.feature_image,
                            spec_score: product.spec_score,
                            title: product.title,
                            affiliate: JSON.parse(product.affiliate)
                        };
                    } else {
                        return {
                            product_id: '',
                            feature_image: '',
                            spec_score: '',
                            title: '',
                            affiliate: []
                        };
                    }
                });

                return {
                    id: data.id,
                    url: data.url,
                    product: matchData,
                    created_at: data.created_at,
                    visitor: data.visitor
                };
            });

            dataResult.push(data);
        }

        const findProduct = await client.query(
            `SELECT title, feature_image, slug, spec_score, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\",\"rating\":\"4.0\"}]' as affiliate
            FROM public.products
            WHERE summary IS NOT NULL
            ORDER BY spec_score DESC, created_at DESC
            LIMIT 12;`
        )

        if (findProduct.rows.length == 0) {
            dataResult.push([])
        }

        dataResult.push(findProduct.rows);

        const fileName = 'src/system/services/productHome.json';

        // Update atau buat file productHome.json
        fs.writeFileSync(fileName, JSON.stringify(dataResult, null, 2), 'utf8');

        console.log('productHome.json updated successfully.');
        return dataResult
    } catch (error) {
        console.error('Error updating productHome.json:', error);
        return ""
    } finally {
        client.release();
    }
}

const cronSchedule = "0 0 */1 * *";

export const cronJobUpdateProductHome = new CronJob(cronSchedule, updateProductHomeJson, null, true);