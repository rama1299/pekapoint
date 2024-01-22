import {readablestreamToJson} from '../helpers/readablestreamToJson.js'
import product from '../helpers/product.json'
import {FetchProductUrl} from '../modules/fetchProductUrl.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		let resProductMostView = await FetchProductUrl.getProductUrl(1,'')
		let dataProductMostView = []
		if (resProductMostView.status == 200) {
			dataProductMostView = resProductMostView.data.data
		}

		let resCompareMostView = await FetchProductUrl.getProductUrl(2, '')
		let dataComapreMostView = []
		if (resCompareMostView.status == 200) {
			dataComapreMostView = resCompareMostView.data.data
		}

		let resCompareNew = await FetchProductUrl.getProductUrl(2, '?filter=new')
		let dataCompareNew = []
		if (resCompareNew.status == 200) {
			dataCompareNew = resCompareNew.data.data
		}

		let dataTitleProduct = product
		
		return {dataTitleProduct, dataProductMostView, dataComapreMostView, dataCompareNew}
	} catch (error) {
		console.log(error)
		return {dataTitleProduct: [], dataProductMostView: [], dataComapreMostView: [], dataCompareNew: []}
	}
}