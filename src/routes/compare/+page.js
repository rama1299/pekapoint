import { FetchAds } from '../../modules/fetchAdsManagement';
import { FetchProductUrl } from '../../modules/fetchProductUrl';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const search = url.search;

    let totalPage = 0
    let totalProducts = 0
    let data = []
    let dataAds = []
    try {
        try {
            let responseAds = await FetchAds.getAllAds('compare')
            
            if (responseAds && responseAds.status == 200) {
                dataAds = responseAds.data
            } else if (responseAds && responseAds.status == 404) {
                throw new Error('ads not found')
            }
        } catch (error) {
            console.error(error.message)
        }

        try {
            const productUrlResponse = await FetchProductUrl.getProductUrl(2, search);

            if (productUrlResponse && productUrlResponse.status == 200) {
                const dataProductUrl = productUrlResponse.data
                
                totalPage = dataProductUrl.totalPage
                totalProducts = dataProductUrl.totalProducts
                data = dataProductUrl.data
            }
        } catch (error) {
            console.error(error.message)
        }

        return {data, totalPage, totalProducts, dataAds}
    } catch (error) {
        console.error(error.message);
        return {data, totalPage, totalProducts, dataAds}
    }
}