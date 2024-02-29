import {readablestreamToJson} from '../../helpers/readablestreamToJson'
import { Translate } from '../../helpers/translate';
import { FetchProduct } from '../../modules/fetchProduct';
import { FetchAds } from '../../modules/fetchAdsManagement'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const query = url.search;
    const searchQuery = url.searchParams.get('search')
    const pageQuery = url.searchParams.get('page')

    let dataAds = []
    let data = []
    let totalPages = 0
    let totalProducts = 0
    let status = 'error'

    try {
        try {
            const resAds = await FetchAds.getAllAds('product')

            if (resAds && resAds.status == 200) {
                dataAds = resAds.data
            }
        } catch (error) {
            console.error(error.message)
        }


        if (searchQuery) {
            try {
                const searchResponse = await FetchProduct.getProductSearch(searchQuery, pageQuery)

                if (searchResponse && searchResponse.status == 200) {

                    const resData = searchResponse.data

                    let dataTranslate = await Translate.product(resData.data)

                    data = dataTranslate
                    totalPages = resData.totalPages
                    totalProducts = resData.totalProducts
                    status = 'success'

                } else {
                    throw new Error('Error get product search')
                }
                
            } catch (error) {
                console.log(error.message)
            }

        } else {
            try {
                const productResponse = await FetchProduct.getProducts(query);
                
                if (productResponse && productResponse.status === 200) {

                    const resData = productResponse.data

                    let dataTranslate = await Translate.product(resData.data)

                    data = dataTranslate
                    totalPages = resData.totalPages
                    totalProducts = resData.totalProducts
                    status = 'success'
                } else {
                    throw new Error('Error get products')
                }
            } catch (error) {
                console.error(error.message)
            }
    
        }

        return { data, totalProducts, totalPages, status, dataAds }
    } catch (error) {
        return { data, totalProducts, totalPages, status, dataAds };
    }
}