import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'
import { FetchProduct } from '../../../modules/fetchProduct.js';
import { FetchHpVariant } from '../../../modules/fetchHpVariant.js';
import { checkIpInfo } from '../../../helpers/checkIpInfo.js';
import { FetchProductUrl } from '../../../modules/fetchProductUrl.js';
import { FetchAds } from '../../../modules/fetchAdsManagement.js';


/** @type {import('./$types').PageLoad} */
// export async function load({ params, url }) {
//     try {
//         const pathName = url.pathname
//         const slug = params.slug;
//         let dataAds = []

//         const productUrlResponse = await FetchProductUrl.getProductUrlByUrl(pathName)

//         let responseAds = await FetchAds.getAllAds('product-slug')

//         if (responseAds.status == 200) {
//             dataAds = responseAds.data
//         }

//         if (productUrlResponse && productUrlResponse.status === 200) {

//             const {product_ids, slug, variant_ids} = productUrlResponse.data

//             const productResponse = await FetchProduct.getProductBySlug(slug)
//             const specResponse = await FetchProduct.getSpecProductById(JSON.parse(product_ids))
            
//             if (productResponse && productResponse.status === 200 && specResponse && specResponse.status === 200) {

//                 const dataProduct = productResponse.data
//                 const dataSpec = specResponse.data

//                 // const responseVariant = await FetchHpVariant.getVariantById(JSON.parse(product_ids))

//                 // if (responseVariant && responseVariant.status == 200) {
//                 //     const dataVariant = responseVariant.data
//                 //     return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: dataVariant, status: 'success' };
//                 // }

//                 return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: [], dataAds, status: 'success' };
//             }
            
//             return { dataProduct: [], dataSpec: [], dataVariant: [], dataAds, status: 'error' };
//         } else {

//             const productResponse = await FetchProduct.getProductBySlug(slug);

//             if (productResponse && productResponse.status === 200) {
//                 const dataProduct = productResponse.data;
//                 let dataId = dataProduct[0].id;
    
//                 const specResponse = await FetchProduct.getSpecProductById(dataId);

//                 if (specResponse && specResponse.status === 200) {
//                     const dataSpec = specResponse.data;

//                     // const variantResponse = await FetchHpVariant.getVariantById(dataId)
//                     dataId = [dataId]
                    
//                     // if (variantResponse && variantResponse.status === 200) {
//                     //     const dataVariant = variantResponse.data

//                     //     const variantId = await dataVariant.map(data => data.id)
//                     //     const dataInputProductUrl = {url: pathName, idProduct: dataId, idVariant: variantId, write_type: "product"}

//                     //     const createProductUrl = await FetchProductUrl.createProductUrl(dataInputProductUrl)

//                     //     return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: dataVariant, status: 'success' };
//                     // }
                    
//                     const dataInputProductUrl = {url : pathName, idProduct : dataId, write_type: "product"}

//                     const createProductUrl = await FetchProductUrl.createProductUrl(dataInputProductUrl)
                    
//                     return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: [], dataAds, status: 'success' }; 
//                 }
    
//             } else {
//                 return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error', dataAds: []};
//             }

//             return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error', dataAds: [] };
//         }
//     } catch (error) {
//         console.error("Error loading product:", error.message);
//         if (error.response.status === 401 || error.response.statusText == 'Unauthorized') {
//             Cookies.remove('status')
//         }
//         return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error', dataAds:[] };
//     }
// }

export async function load({ params, url }) {
    const pathName = url.pathname
    const slug = params.slug;

    let dataProduct = []
    let dataSpec = []
    let dataVariant = []
    let dataAds  = []
    let status = 'error' 

    try {
        //fetch ads
        try {
            let responseAds = await FetchAds.getAllAds('product-slug')

            if (responseAds && responseAds.status == 200) {
                dataAds = responseAds.data
            }
        } catch (error) {
            console.error(error.message)
        }

        //fetch product url
        try {
            const productUrlResponse = await FetchProductUrl.getProductUrlByUrl(pathName)

            //jika ada
            if (productUrlResponse && productUrlResponse.status == 200) {

                const {product_ids, slug, variant_ids} = productUrlResponse.data

                try {
                    const productResponse = await FetchProduct.getProductBySlug(slug)
                    const specResponse = await FetchProduct.getSpecProductById(JSON.parse(product_ids))

                    if (productResponse && productResponse.status === 200 && specResponse && specResponse.status === 200) {
                        
                        const resDataProduct = productResponse.data
                        const resDataSpec = specResponse.data

                        dataProduct = resDataProduct[0]
                        dataSpec = resDataSpec[0]
                        status = 'success'
                    }

                } catch (error) {
                    console.log(error.message)
                }
                
                //jika tidak ada
            } else {
                try {
                    const productResponse = await FetchProduct.getProductBySlug(slug);

                    if (productResponse && productResponse.status == 200) {
                        const resDataProduct = productResponse.data;
                        let dataId = resDataProduct[0].id;

                        try {
                            const specResponse = await FetchProduct.getSpecProductById(dataId);

                            console.log('masuk')
                            if (specResponse && specResponse.status == 200) {
                                const resDataSpec = specResponse.data;

                                dataId = [dataId]

                                const dataInputProductUrl = {url : pathName, idProduct : dataId, write_type: "product"}

                                try {
                                    await FetchProductUrl.createProductUrl(dataInputProductUrl)
                                } catch (error) {
                                    console.error(error.message)
                                }

                                dataProduct = resDataProduct[0]
                                dataSpec = resDataSpec[0]
                                status = 'success'
                                
                            }
                        } catch (error) {
                            console.error(error.message)
                        }
                    }
                } catch (error) {
                    console.error(error.message)
                }
            }

        } catch (error) {
            console.log(error)
        }

        return {dataProduct, dataSpec, dataAds, dataVariant, status}

    } catch (error) {
        console.error(error.message);
        // if (error.response.status === 401 || error.response.statusText == 'Unauthorized') {
        //     Cookies.remove('status')
        // }
        return {dataProduct, dataSpec, dataAds, dataVariant, status}
    }
}