/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    const slug = params.slug
    return { slug }

}