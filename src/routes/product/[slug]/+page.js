import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'
import { FetchProduct } from '../../../modules/fetchProduct.js';
import { FetchHpVariant } from '../../../modules/fetchHpVariant.js';
import { checkIpInfo } from '../../../helpers/checkIpInfo.js';
import { FetchProductUrl } from '../../../modules/fetchProductUrl.js';


/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
    try {
        const pathName = url.pathname
        const slug = params.slug;

        const productUrlResponse = await FetchProductUrl.getProductUrlByUrl(pathName)

        if (productUrlResponse && productUrlResponse.status === 200) {

            const {product_ids, slug, variant_ids} = productUrlResponse.data

            const productResponse = await FetchProduct.getProductBySlug(slug)
            const specResponse = await FetchProduct.getSpecProductById(JSON.parse(product_ids))
            
            if (productResponse && productResponse.status === 200 && specResponse && specResponse.status === 200) {

                const dataProduct = productResponse.data
                const dataSpec = specResponse.data

                // const responseVariant = await FetchHpVariant.getVariantById(JSON.parse(product_ids))

                // if (responseVariant && responseVariant.status == 200) {
                //     const dataVariant = responseVariant.data
                //     return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: dataVariant, status: 'success' };
                // }

                return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: [], status: 'success' };
            }
            
            return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error' };
        } else {

            const productResponse = await FetchProduct.getProductBySlug(slug);

            if (productResponse && productResponse.status === 200) {
                const dataProduct = productResponse.data;
                let dataId = dataProduct[0].id;
    
                const specResponse = await FetchProduct.getSpecProductById(dataId);

                if (specResponse && specResponse.status === 200) {
                    const dataSpec = specResponse.data;

                    const variantResponse = await FetchHpVariant.getVariantById(dataId)
                    dataId = [dataId]
                    
                    // if (variantResponse && variantResponse.status === 200) {
                    //     const dataVariant = variantResponse.data

                    //     const variantId = await dataVariant.map(data => data.id)
                    //     const dataInputProductUrl = {url: pathName, idProduct: dataId, idVariant: variantId, write_type: "product"}

                    //     const createProductUrl = await FetchProductUrl.createProductUrl(dataInputProductUrl)

                    //     return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: dataVariant, status: 'success' };
                    // }
                    
                    const dataInputProductUrl = {url : pathName, idProduct : dataId, write_type: "product"}

                    const createProductUrl = await FetchProductUrl.createProductUrl(dataInputProductUrl)
                    
                    return { dataProduct: dataProduct[0], dataSpec: dataSpec[0], dataVariant: [], status: 'success' }; 
                }
    
            } else {
                return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error' };
            }

            return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error' };
        }
    } catch (error) {
        console.error("Error loading product:", error.message);
        if (error.response.status === 401 || error.response.statusText == 'Unauthorized') {
            Cookies.remove('status')
        }
        return { dataProduct: [], dataSpec: [], dataVariant: [], status: 'error' };
    }
}