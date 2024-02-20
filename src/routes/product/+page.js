import {readablestreamToJson} from '../../helpers/readablestreamToJson'
import { Translate } from '../../helpers/translate';
import { FetchProduct } from '../../modules/fetchProduct';
import { FetchAds } from '../../modules/fetchAdsManagement'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    try {
        const query = url.search;
        const searchQuery = url.searchParams.get('search')
        const pageQuery = url.searchParams.get('page')

        let dataAds = []

        const resAds = await FetchAds.getAllAds('product')

        if (resAds.status == 200) {
            dataAds = resAds.data
        }

        if (searchQuery) {
            const searchResponse = await FetchProduct.getProductSearch(searchQuery, pageQuery)

            if (searchResponse && searchResponse.status == 200) {
                const resData = searchResponse.data
                let dataTranslate = await Translate.product(resData.data)
                return {...resData, data: dataTranslate, status: 'success', dataAds}
            } else {
                return {data: [], totalPages: 0, totalProducts: 0, status: 'error', dataAds}
            }

        } else {
            const productResponse = await FetchProduct.getProducts(query);
    
            if (productResponse && productResponse.status === 200) {
                const resData = productResponse.data
                let dataTranslate = await Translate.product(resData.data)
                return {...resData, data: dataTranslate, status: 'success', dataAds};
            } else {
                return { data: [], totalPages: 0, totalProducts: 0, status: 'error', dataAds};
            }
        }
    } catch (error) {
        return { data: [], totalPages: 0, totalProducts: 0, dataAds: [] };
    }
}