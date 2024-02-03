import {readablestreamToJson} from '../../helpers/readablestreamToJson'
import { Translate } from '../../helpers/translate';
import { FetchProduct } from '../../modules/fetchProduct';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const query = url.search;
        const searchQuery = url.searchParams.get('search')
        const pageQuery = url.searchParams.get('page')

        if (searchQuery) {
            const searchResponse = await FetchProduct.getProductSearch(searchQuery, pageQuery)

            if (searchResponse && searchResponse.status == 200) {
                const resData = searchResponse.data
                let dataTranslate = await Translate.product(resData.data)
                return {...resData, data: dataTranslate, status: 'success'}
            } else {
                return {data: [], totalPages: 0, totalProducts: 0, status: 'error'}
            }

        } else {
            const productResponse = await FetchProduct.getProducts(query);
    
            if (productResponse && productResponse.status === 200) {
                const resData = productResponse.data
                let dataTranslate = await Translate.product(resData.data)
                return {...resData, data: dataTranslate, status: 'success'};
            } else {
                return { data: [], totalPages: 0, totalProducts: 0, status: 'error'};
            }
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return { data: [], totalPages: 0, totalProducts: 0 };
    }
}