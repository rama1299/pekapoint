import { FetchAds } from '../../modules/fetchAdsManagement';
import { FetchProductUrl } from '../../modules/fetchProductUrl';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const search = url.search;
        const productUrlResponse = await FetchProductUrl.getProductUrl(2, search);

        let dataAds = []

        let responseAds = await FetchAds.getAllAds('compare')

        if (responseAds.status == 200) {
            dataAds = responseAds.data
        }
        
        if (productUrlResponse && productUrlResponse.status == 200) {
            const dataProductUrl = productUrlResponse.data

            return {...dataProductUrl, dataAds}
        } else {
            return {data: [], dataAds, totalProducts: 0, totalPage: 0}
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return {data: [], dataAds: [], totalProducts: 0, totalPage: 0}
    }
}