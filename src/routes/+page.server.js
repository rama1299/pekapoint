import {readablestreamToJson} from '../helpers/readablestreamToJson.js'
import product from '../helpers/product.json'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		let data = product
		if (data) {
			return {data}
		} else {
			return {message: 'Data not found!'}
		}
	} catch (error) {
		console.log(error)
	}
}