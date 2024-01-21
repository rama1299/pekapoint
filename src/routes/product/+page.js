import {readablestreamToJson} from '../../helpers/readablestreamToJson'
import { FetchProduct } from '../../modules/fetchProduct';
import Cookies from 'js-cookie';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const query = url.search;
        const searchQuery = url.searchParams.get('search')
        const pageQuery = url.searchParams.get('page')

        if (searchQuery) {
            const searchResponse = await FetchProduct.getProductSearch(searchQuery, pageQuery)

            if (searchResponse && searchResponse.status == 200) {
                return searchResponse.data
            } else {
                return {data: [], totalPages: 0, totalProducts: 0}
            }

        } else {
            const productResponse = await FetchProduct.getProducts(query);
    
            if (productResponse && productResponse.status === 200) {
                return productResponse.data;
            } else {
                return { data: [], totalPages: 0, totalProducts: 0 };
            }
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return { data: [], totalPages: 0, totalProducts: 0 };
    }
}