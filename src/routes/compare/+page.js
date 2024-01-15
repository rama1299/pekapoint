import { FetchProductUrl } from '../../modules/fetchProductUrl';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const search = url.search;
        const productUrlResponse = await FetchProductUrl.getProductUrlCompare(search);
        
        if (productUrlResponse && productUrlResponse.status == 200) {
            const dataProductUrl = productUrlResponse.data
            return {data :dataProductUrl}
        } else {
            return {data: []}
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return {data: []}
    }
}