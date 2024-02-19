import { pool } from "../../../config/dbConfig.js"
import { getImagesFromData } from "../../../system/services/getImagesFromData.js";
import { Translate } from "../../../system/services/translate.js";


export class ProductController {
    static async findProduct(req, res, next) {
        const client = await pool.connect();
        if (!parseInt(req.query.page)) {
            req.query.page = 1;
          }
          const filters = req.query.filter ?? []
          let filterObject

          if (filters != undefined && typeof filters === 'object') {
              filterObject = filters.map((filter) => {
                let [key, value] = filter.split('=')
                if (value) {
                    let arrayValue = value.split(',')
                    console.log('object')
                    return {
                        [key] : arrayValue
                    }
                }else{
                    return undefined
                }
              }).filter(Boolean)
            } else if (filters != undefined && typeof filters === 'string') {
                let [key, value] = filters.split('=')
                if (value) {
                    let arrayValue = value.split(',')
                    filterObject = [{[key] : arrayValue}]
                } else {
                    filterObject = []
                }
                console.log('string')
            }
            filterObject = filterObject.filter((filter) => Object.keys(filter).some(key => ['brand', 'ram'].includes(key)));
        try {
            const page = req.query.page
            const perPage = 24
            const limit = perPage;
            const offset = (page - 1) * perPage;

            if (filterObject.length === 1 && Object.keys(filterObject[0])[0] == 'brand') {
                const arrayBrand = filterObject[0].brand
                const query = {
                    text: `SELECT *, '[{"store":"Shopee","price":"19450000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"},{"store":"Tokopedia","price":"20000000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"}]' as affiliate, '21000000' as launch_price
                    FROM public.products
                    WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL
                    ORDER BY spec_score DESC, release_date DESC
                    LIMIT $2
                    OFFSET $3`,
                    values: [arrayBrand.map(brand => `%${brand}%`), limit, offset],
                };

                const response = await client.query(query)
                const totalResult = await pool.query({
                    text: `SELECT COUNT(*) FROM public.products WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL`,
                    values: [arrayBrand.map(brand => `%${brand}%`)],
                });
              
                if (response.rows.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }

                let data = response.rows

                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);

                data = await Promise.all(data.map(async (item) => {
                    let summaryJson = JSON.parse(item.summary)
                    let titleGroup = Object.keys(summaryJson)[0]
                    let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                        return {
                            ...obj,
                            code: obj.title
                        }
                    }))
                    return {
                        ...item,
                        summary: JSON.stringify({[titleGroup]: attribute})
                    }
                }))
    
                res.status(200).json({data, totalProducts, totalPages})
            } else if (filterObject.length === 1 && Object.keys(filterObject[0])[0] == 'ram') {
                const arrayRam = filterObject[0].ram;
                const query = {
                    text: `SELECT *, 
                                  '[{"store":"Shopee","price":"19450000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"},
                                    {"store":"Tokopedia","price":"20000000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"}]' as affiliate,
                                  '21000000' as launch_price
                            FROM public.products
                            WHERE summary IS NOT NULL
                                AND EXISTS (
                                    SELECT 1
                                    FROM json_array_elements(CAST(variant AS json)) AS v
                                    WHERE (v->>'ram')::numeric IN (SELECT UNNEST($1::numeric[]))
                                )
                            ORDER BY spec_score DESC, release_date DESC
                            LIMIT $2
                            OFFSET $3`,
                    values: [arrayRam.map(ram => ram), limit, offset],
                };
                const response = await client.query(query)
                const totalResult = await pool.query({
                    text: `SELECT COUNT(*) FROM public.products
                    WHERE summary IS NOT NULL
                    AND EXISTS (
                        SELECT 1
                        FROM json_array_elements(CAST(variant AS json)) AS v
                        WHERE (v->>'ram')::numeric IN (SELECT UNNEST($1::numeric[]))
                        )`,
                    values: [arrayRam.map(ram => ram)],
                });
              
                if (response.rows.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }

                let data = response.rows

                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);

                data = await Promise.all(data.map(async (item) => {
                    let summaryJson = JSON.parse(item.summary)
                    let titleGroup = Object.keys(summaryJson)[0]
                    let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                        return {
                            ...obj,
                            code: obj.title
                        }
                    }))
                    return {
                        ...item,
                        summary: JSON.stringify({[titleGroup]: attribute})
                    }
                }))
    
                res.status(200).json({data, totalProducts, totalPages})
            } else if (filterObject.length === 2) {
                const arrayBrand = filterObject.filter((filter) => Object.keys(filter).some(key => key == 'brand'))[0].brand
                const arrayRam = filterObject.filter((filter) => Object.keys(filter).some(key => key == 'ram'))[0].ram

                const query = {
                    text: `SELECT *, '[{"store":"Shopee","price":"19450000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"},{"store":"Tokopedia","price":"20000000","link":"https://shopee.co.id/Handphone-cat.11044458.11044476"}]' as affiliate, '21000000' as launch_price
                    FROM public.products
                    WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL
                        AND EXISTS (
                            SELECT 1
                            FROM json_array_elements(CAST(variant AS json)) AS v
                            WHERE (v->>'ram')::numeric IN (SELECT UNNEST($2::numeric[]))
                        )
                    ORDER BY spec_score DESC, release_date DESC
                    LIMIT $3
                    OFFSET $4`,
                    values: [arrayBrand.map(brand => `%${brand}%`), arrayRam.map(ram => ram), limit, offset],
                };

                const response = await client.query(query)
                const totalResult = await pool.query({
                    text: `SELECT COUNT(*) FROM public.products WHERE title ILIKE ANY($1::text[]) AND summary IS NOT NULL
                    AND EXISTS (
                        SELECT 1
                        FROM json_array_elements(CAST(variant AS json)) AS v
                        WHERE (v->>'ram')::numeric IN (SELECT UNNEST($2::numeric[]))
                    )`,
                    values: [arrayBrand.map(brand => `%${brand}%`), arrayRam.map(ram => ram)],
                });

                if (response.rows.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }

                let data = response.rows

                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);

                data = await Promise.all(data.map(async (item) => {
                    let summaryJson = JSON.parse(item.summary)
                    let titleGroup = Object.keys(summaryJson)[0]
                    let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                        return {
                            ...obj,
                            code: obj.title
                        }
                    }))
                    return {
                        ...item,
                        summary: JSON.stringify({[titleGroup]: attribute})
                    }
                }))
    
                res.status(200).json({data, totalProducts, totalPages})
            } else {
                const response = await client.query(
                    `SELECT *, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"},{\"store\":\"Tokopedia\",\"price\":\"20000000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"}]' as affiliate, '21000000' as launch_price FROM products WHERE summary IS NOT NULL ORDER BY spec_score DESC, release_date DESC LIMIT $1 OFFSET $2`,
                    [limit, offset]
                );
        
                let data = response.rows
                const totalResult = await pool.query('SELECT COUNT(*) FROM products');
                const totalProducts = parseInt(totalResult.rows[0].count);
                const totalPages = Math.ceil(totalProducts / limit);
    
                if (data.length === 0) {
                    throw ({name: 'ErrorNotFound'})
                }

                data = await Promise.all(data.map(async (item) => {
                    let summaryJson = JSON.parse(item.summary)
                    let titleGroup = Object.keys(summaryJson)[0]
                    let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                        return {
                            ...obj,
                            code: obj.title
                        }
                    }))
                    return {
                        ...item,
                        summary: JSON.stringify({[titleGroup]: attribute})
                    }
                }))

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
    
          let data = response.rows;
    
          if (data.length === 0) {
            throw { name: 'ErrorNotFound'};
          }

          
        //   if (data.length === 1) {
        //       data = await Promise.all(data.map(async (obj) => {
        //           let arraySlug = obj.slug.split('-');
        //         let pathName = `/${arraySlug[0]}/${arraySlug[1]}`
        //         let pathDir = `static/images${pathName}`;
        //         let dataImages = await getImagesFromData(pathDir, obj.slug);
                
        //         dataImages = dataImages.map((titleImage) => {
        //             return `${pathName}/${titleImage}`;
        //         }).slice(0,8);
        //         console.log(dataImages)
        //         return {
        //             ...obj,
        //             images: dataImages,
        //         };
        //     }));

        // }

        data = await Promise.all(data.map(async (item) => {
            let summaryJson = JSON.parse(item.summary)
            let titleGroup = Object.keys(summaryJson)[0]
            let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                return {
                    ...obj,
                    code: obj.title
                }
            }))
            return {
                ...item,
                summary: JSON.stringify({[titleGroup]: attribute})
            }
        }))
        console.log(data)
        
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
        let language = req.query.language ?? 'en'
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
                                        ELSE coalesce(psa.score,0)
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

            let data = response.rows

            if (data.length === 0) {
                throw ({name: 'ErrorNotFound'})
            }

            data = await Promise.all(data.map(async (item) => {
                let dataSpecJson = JSON.parse(item.datas)
                const dataSpec = await Promise.all(dataSpecJson.map(async (data) => {
                    let attributes = await Promise.all(data.attributes.map(async (item) => {
                        return {
                            ...item,
                            code: item.title
                        }
                    }))
                    return {
                      ...data,
                      attributes: attributes,
                      code: data.title
                    };
                }));
                return {
                    ...item,
                    datas: JSON.stringify(dataSpec)
                }
            }))

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
                WHERE summary IS NOT NULL
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

            let arrayTitle = slug.split('-')
            let brand = arrayTitle[0]
            let brandType = arrayTitle[1]
            let pathImages = `data/images/${brand}/${brandType}`

            const images = await getImagesFromData(pathImages, slug)
            console.log(images)
            
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

    static async getProductBySearch(req, res, next) {
        const client = await pool.connect()
        if (!parseInt(req.query.page)) {
            req.query.page = 1;
        }
        try {
            const search = req.body.search.toLowerCase()
            const page = req.query.page
            const perPage = 24
            const limit = perPage;
            const offset = (page - 1) * perPage;
            
            if (!search) {
                throw ({name: 'InvalidCredentials'})
            }
            
            const arraySearch = search.split('-').map(item => `%${item}%`);
            const placeholders = arraySearch.map((_, i) => {
                return `LOWER(title) LIKE $${i + 1}`;
            }).join(' AND ');
            
            const values = [...arraySearch, limit, offset]
            
            const response = await client.query(
                `SELECT *, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"},{\"store\":\"Tokopedia\",\"price\":\"20000000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\"}]' as affiliate, '21000000' as launch_price
                FROM public.products
                WHERE ${placeholders} AND summary IS NOT NULL
                ORDER BY spec_score DESC, release_date DESC
                LIMIT   $${arraySearch.length + 1}
                OFFSET $${arraySearch.length + 2};`,
                values
                );
                
                let data = response.rows
                
                if (data.length == 0) {
                    throw ({name: 'ErrorNotFound'})
                }
                
                const responseTotal = await client.query(
                    `SELECT COUNT(*)
                    FROM public.products
                    WHERE ${placeholders} AND summary IS NOT NULL`,
                    arraySearch
                    )
                    
                    const totalProducts = parseInt(responseTotal.rows[0].count);
                    const totalPages = Math.ceil(totalProducts / limit);

            data = await Promise.all(data.map(async (item) => {
                let summaryJson = JSON.parse(item.summary)
                let titleGroup = Object.keys(summaryJson)[0]
                let attribute = await Promise.all(summaryJson[titleGroup].map(async (obj) => {
                    return {
                        ...obj,
                        code: obj.title
                    }
                }))
                return {
                    ...item,
                    summary: JSON.stringify({[titleGroup]: attribute})
                }
            }))

            res.status(200).json({data, totalPages, totalProducts})
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async getTopProduct(req, res, next) {
        const client = await pool.connect()
        try {
            const findProduct = await client.query(
                `SELECT title, feature_image, slug, spec_score, '[{\"store\":\"Shopee\",\"price\":\"19450000\",\"link\":\"https://shopee.co.id/Handphone-cat.11044458.11044476\",\"rating\":\"4.0\"}]' as affiliate
                FROM public.products
                WHERE summary IS NOT NULL
                ORDER BY spec_score DESC, created_at DESC
                LIMIT 12;`
            )

            if (findProduct.rows.length == 0) {
                throw ({name: 'ErrorNotFound'})
            }

            const data = findProduct.rows

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }
} 