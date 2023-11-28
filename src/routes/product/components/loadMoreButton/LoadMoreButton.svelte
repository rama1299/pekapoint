<script>
	import { goto } from '$app/navigation';
    import { createEventDispatcher } from "svelte";
    import { readablestreamToJson } from "../../../../helpers/readablestreamToJson";

    const dispatch = createEventDispatcher()

    export let currentPage
    let nextPage = parseInt(currentPage) + 1

    async function handleLoadMore() {
        try {
            const res = await fetch(`http://localhost:3000/api/product?page=${nextPage}`)
            const data = await readablestreamToJson(res.body)
            console.log(data)
            if(res.ok) {
                dispatch('message', {
                    data
                })
                goto(`/product?page=${nextPage}`, {noScroll: true})
                nextPage++
            } else {
                    console.log('failed')
            }  
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class="w-full flex justify-center items-center py-5">
    <div class="mx-auto w-auto">
        <button class="w-60 py-2 bg-white shadow-md border rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg" on:click={handleLoadMore}>Load More</button>
    </div>
</div>