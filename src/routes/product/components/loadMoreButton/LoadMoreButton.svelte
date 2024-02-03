<script>
	import { goto } from '$app/navigation';
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    import { readablestreamToJson } from "../../../../helpers/readablestreamToJson";
    import { page } from '$app/stores';
  import { Translate } from '../../../../helpers/translate';

  let text = ['Load More']
    onMount(async () => {
        let translate = await Translate.client(text)
        text = translate
    })
    
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
        goto(`/product${updateSearchPage}`, {noScroll: true})
    }

</script>

<svelte:window/>

<div class="w-full flex justify-center items-center py-5">
    <div class="mx-auto w-auto">
        <button class="w-60 py-2 bg-white shadow-md border rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg" on:click={handleLoadMore}>{text[0]}</button>
    </div>
</div>