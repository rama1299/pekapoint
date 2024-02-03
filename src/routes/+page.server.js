import {readablestreamToJson} from '../helpers/readablestreamToJson.js'
import product from '../helpers/product.json'
import productHome from '../helpers/productHome.json'
import {FetchProductUrl} from '../modules/fetchProductUrl.js'
import { FetchProduct } from '../modules/fetchProduct.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		let dataProductMostView = productHome[0]
		let dataComapreMostView = productHome[1]
		let dataCompareNew = productHome[2]
		let dataTopProduct = productHome[3]

		// let resProductMostView = await FetchProductUrl.getProductUrl(1,'?limit=8')
		// let dataProductMostView = []
		// if (resProductMostView.status == 200) {
		// 	dataProductMostView = resProductMostView.data.data
		// }

		// let resCompareMostView = await FetchProductUrl.getProductUrl(2, '?limit=8')
		// let dataComapreMostView = []
		// if (resCompareMostView.status == 200) {
		// 	dataComapreMostView = resCompareMostView.data.data
		// }

		// let resCompareNew = await FetchProductUrl.getProductUrl(2, '?filter=new&limit=8')
		// let dataCompareNew = []
		// if (resCompareNew.status == 200) {
		// 	dataCompareNew = resCompareNew.data.data
		// }

		// let resTopProduct = await FetchProduct.getTopProducts()
		// let dataTopProduct = []
		// if (resTopProduct.status == 200) {
		// 	dataTopProduct = resTopProduct.data
		// }

		let dataTitleProduct = product
		
		return {dataTitleProduct, dataProductMostView, dataComapreMostView, dataCompareNew, dataTopProduct}
	} catch (error) {
		console.log(error)
		return {dataTitleProduct: [], dataProductMostView: [], dataComapreMostView: [], dataCompareNew: [], dataTopProduct: []}
	}
}