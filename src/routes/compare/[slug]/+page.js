import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const slug = params.slug
        const fetchProduct = await fetch(`http://localhost:3000/api/product/${slug}`)
        const dataProduct = await readablestreamToJson(fetchProduct.body)
        const dataId = dataProduct.map(product => product.id).join('-')
        const fetchSpec = await fetch(`http://localhost:3000/api/product/spec/${dataId}`)
        const dataSpec = await readablestreamToJson(fetchSpec.body)
        return {dataProduct: dataProduct, dataSpec: dataSpec}   
    } catch (error) {
        console.log(error)
    }

}