import {readablestreamToJson} from '../../../helpers/readablestreamToJson.js'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const slug = params.slug
        const response = await fetch(`http://localhost:3000/api/product/${slug}`)
        const data = await readablestreamToJson(response.body)
        return {data : data[0]}   
    } catch (error) {
        console.log(error)
    }

}