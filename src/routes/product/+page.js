import {readablestreamToJson} from '../../helpers/readablestreamToJson'
import { FetchProduct } from '../../modules/fetchProduct';
import Cookies from 'js-cookie';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const search = url.search;
        const productResponse = await FetchProduct.getProducts(search);

        if (productResponse && productResponse.status === 200) {
            return productResponse.data;
        } else {
            return { data: [], totalPages: 0, totalProducts: 0 };
        }
    } catch (error) {
        console.error("Error loading products:", error.message);
        return { data: [], totalPages: 0, totalProducts: 0 };
    }
}