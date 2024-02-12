import {readablestreamToJson} from '../helpers/readablestreamToJson.js'
import product from '../helpers/product.json'
import { FetchProduct } from '../modules/fetchProduct.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		let dataProductMostView = []
		let dataComapreMostView = []
		let dataCompareNew = []
		let dataTopProduct = []
		let dataTitleProduct = product

		let response = await FetchProduct.getHomeProducts()

		if (response.status == 200) {
			let productHome = response.data

			dataProductMostView = productHome[0]
			dataComapreMostView = productHome[1]
			dataCompareNew = productHome[2]
			dataTopProduct = productHome[3]
		}
				
		return {dataTitleProduct, dataProductMostView, dataComapreMostView, dataCompareNew, dataTopProduct}
	} catch (error) {
		console.log(error)
		return {dataTitleProduct: [], dataProductMostView: [], dataComapreMostView: [], dataCompareNew: [], dataTopProduct: []}
	}
}