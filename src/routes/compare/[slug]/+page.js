import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'
import { FetchAds } from '../../../modules/fetchAdsManagement.js';
import { FetchHpVariant } from '../../../modules/fetchHpVariant.js';
import { FetchProduct } from '../../../modules/fetchProduct';
import { FetchProductUrl } from '../../../modules/fetchProductUrl.js';


/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
    const pathName = url.pathname
    const slug = params.slug;

    let dataAds = []
    let dataProduct = []
    let dataSpec = []
    let dataVariant = []
    let status = 'error'
    try {

        try {
            let responseAds = await FetchAds.getAllAds('compare-slug')

            if (responseAds && responseAds.status == 200) {
                dataAds = responseAds.data
            }            
        } catch (error) {
            console.error(error.message)
        }

        try {
            const productUrlResponse = await FetchProductUrl.getProductUrlByUrl(pathName)
            
            if (productUrlResponse && productUrlResponse.status === 200) {

                const {product_ids, slug, variant_ids} = productUrlResponse.data

                try {
                    const productResponse = await FetchProduct.getProductBySlug(slug)
                    const specResponse = await FetchProduct.getSpecProductById(JSON.parse(product_ids))

                    if (productResponse && productResponse.status === 200 && specResponse && specResponse.status === 200) {
        
                        const resDataProduct = productResponse.data
                        const resDataSpec = specResponse.data
        
                        dataProduct = resDataProduct
                        dataSpec = resDataSpec
                        status= 'success'

                    }
                    
                } catch (error) {
                    console.error(error.message)
                }
    
            } else {
    
                try {
                    const productResponse = await FetchProduct.getProductBySlug(slug);
                    
                    if (productResponse && productResponse.status === 200) {

                        const resDataProduct = productResponse.data;
                        let dataId = resDataProduct.map(data => data.id)

                        try {
                            const specResponse = await FetchProduct.getSpecProductById(dataId);

                            if (specResponse && specResponse.status === 200) {

                                const resDataSpec = specResponse.data;
                                
                                const dataInputProductUrl = {url: pathName, idProduct: dataId, write_type: 'compare'}

                                try {

                                    await FetchProductUrl.createProductUrl(dataInputProductUrl)
                                    
                                } catch (error) {
                                    console.error(error.message)
                                }
            
                                dataProduct = resDataProduct
                                dataSpec = resDataSpec
                                status= 'success'

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
            console.error(error.message)
        }
        
        return { dataProduct, dataSpec, dataVariant, status, dataAds }

    } catch (error) {
        console.error(error.message);
        if (error.response.status === 401 || error.response.statusText == 'Unauthorized') {
            Cookies.remove('status')
        }
        return { dataProduct, dataSpec, dataVariant, status, dataAds }
    }
} 