import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const slug = params.slug
        const fetchProduct = await fetch(`http://localhost:3000/api/product/${slug}`)
        const dataProduct = await readablestreamToJson(fetchProduct.body)
        const dataId = dataProduct[0].id
        const fetchSpec = await fetch(`http://localhost:3000/api/product/${dataId}/spec`)
        const dataSpec = await readablestreamToJson(fetchSpec.body)
        return {dataProduct: dataProduct[0], dataSpec: dataSpec[0]}   
    } catch (error) {
        console.log(error)
    }

}