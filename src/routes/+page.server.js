import {readablestreamToJson} from '../helpers/readablestreamToJson.js'
import product from '../helpers/product.json'
import { FetchProduct } from '../modules/fetchProduct.js'
import axios from 'axios'
import { FetchAds } from '../modules/fetchAdsManagement.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		let dataProductMostView = []
		let dataComapreMostView = []
		let dataCompareNew = []
		let dataTopProduct = []
		let dataAds = []
		let dataTitleProduct = product

		let response = await FetchProduct.getHomeProducts()
		let ads = await FetchAds.getAllAds('home')

		if (response.status == 200) {
			let productHome = response.data

			dataProductMostView = productHome[0]
			dataComapreMostView = productHome[1]
			dataCompareNew = productHome[2]
			dataTopProduct = productHome[3]
		}

		if (ads.status == 200) {
			dataAds = ads.data
		}

		return {dataTitleProduct, dataProductMostView, dataComapreMostView, dataCompareNew, dataTopProduct, dataAds}
	} catch (error) {
		return {dataTitleProduct: [], dataProductMostView: [], dataComapreMostView: [], dataCompareNew: [], dataTopProduct: []}
	}
}