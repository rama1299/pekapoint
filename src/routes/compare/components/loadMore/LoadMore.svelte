<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';

    export let currentPage

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
        goto(`/compare${updateSearchPage}`, {noScroll: true})
    }
</script>

<div class="w-full flex justify-center items-center py-5">
    <div class="mx-auto w-auto">
        <button class="w-60 py-2 bg-white shadow-md border rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg" on:click={handleLoadMore}>Load More</button>
    </div>
</div>