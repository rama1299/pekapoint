import { FetchProductUrl } from '../../modules/fetchProductUrl';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const search = url.search;
        const productUrlResponse = await FetchProductUrl.getProductUrl(2, search);
        
        if (productUrlResponse && productUrlResponse.status == 200) {
            const dataProductUrl = productUrlResponse.data

            return dataProductUrl
        } else {
            return {data: [], totalProducts: 0, totalPage: 0}
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return {data: [], totalProducts: 0, totalPage: 0}
    }
}