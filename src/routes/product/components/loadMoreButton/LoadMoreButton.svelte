<script>
	import { goto } from '$app/navigation';
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    import { readablestreamToJson } from "../../../../helpers/readablestreamToJson";
    import { page } from '$app/stores';

    onMount(() => {
    })
    
    export let currentPage
    export let isFilter
    // const dispatch = createEventDispatcher()

    // $: search = ''
    // $: nextPage = parseInt(currentPage) + 1
    // $: queryPage = isFilter ? '&page=' : '?page='
    // const apiURL = 'http://localhost:3000/api/product'

    afterUpdate(() => {
        currentPage = $page.url.searchParams.get('page')
        search = $page.url.search === '' ? '?page=1' : $page.url.search
        if (!search.includes('page=')) {
            search += '&page=1';
        }
    })
    $: currentPage = null
    $: nextPage = currentPage == null ? 2 : parseInt(currentPage) + 1
    $: search = ''
    $: updateSearchPage = search.replace(/page=.*/, `page=${nextPage}`)




    

    async function handleLoadMore() {
        // try {
        //     search = window.location.search
        //     const res = await fetch(`${apiURL}${search}${queryPage}${nextPage}`)
        //     const data = await readablestreamToJson(res.body)
        //     if(res.ok) {
        //         dispatch('message', {
        //             data
        //         })
        //         goto(`/product${search}${queryPage}${nextPage}`, {noScroll: true})
        //         nextPage++
        //     } else {
        //             console.log('failed')
        //     }
        //     console.log(search)

        // } catch (error) {
        //     console.log(error)
        // }
        goto(`/product${updateSearchPage}`, {noScroll: true})
    }

</script>

<svelte:window/>

<div class="w-full flex justify-center items-center py-5">
    <div class="mx-auto w-auto">
        <button class="w-60 py-2 bg-white shadow-md border rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg" on:click={handleLoadMore}>Load More</button>
    </div>
</div>