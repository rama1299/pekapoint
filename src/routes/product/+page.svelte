<script>
	import { page } from '$app/stores';
	import LoadMoreButton from './components/loadMoreButton/LoadMoreButton.svelte';
    import ProductList from './components/productList/ProductList.svelte';
	import FilterBar from './components/filterBar/FilterBar.svelte';
    import Layout from '../../lib/components/layout/Layout.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import { Translate } from '../../helpers/translate';
    export let data
    import ProductNotFound from './components/ProductNotFound.svelte';

    $: totalPages = data.totalPages
    let productList = []
    $: pageUrl = $page.url.searchParams.get('page')
    $: currentPage = pageUrl === null ? 1 : pageUrl
    let filter = $page.url.searchParams.getAll('filter')
    let search = $page.url.searchParams.get('search')
<<<<<<< HEAD
    let text = ['Products']
    $: status = data.status

    onMount(async() => {
        let translate = await Translate.client(text)
        text = translate
    })
=======

    console.log(productList)
>>>>>>> master

    afterUpdate(() => {
        if ($page.url.searchParams.size === 0 || filter[0] != $page.url.searchParams.getAll('filter')[0] || data.data.length === 0 || search != $page.url.searchParams.get('search')) {
            productList = data.data
        } else {
            productList = [...productList, ...data.data]
                productList = Array.from(new Set(productList.map(item => item.id)))
                    .map(id => {
                        return productList.find(item => item.id === id);
                });
        }
        filter = $page.url.searchParams.getAll('filter')
        pageUrl = $page.url.searchParams.get('page')
        search = $page.url.searchParams.get('search')
    })
    
    // function handleMessageLoadMore(event) {
    //     const message = event.detail.data
    //     productList = [...productList, ...message]
    // }
</script>

<svelte:head>
  <title>{text[0]}</title>
</svelte:head>

<Layout isProductPage={true}>
    <div class="w-full h-96 bg-cover bg_gradient">
        <div class="container lg:w-wrap font-monst h-full pt-44 mx-auto">
            <h1 class="text-5xl font-bold text-white">{text[0]}</h1>
        </div>
    </div>
    <main class="container min-h-[600px] font-monst m-auto space-y-4 py-5">
        <div class="w-full px-2">
            <FilterBar/>
        </div>
        {#if productList.length > 0}
            <div class="w-full min-h-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row m-auto gap-4 px-1">
                {#each productList as item (item.id)}
                    <ProductList item={item}/>
                {/each}
<<<<<<< HEAD
            </div>
        {/if}

        {#if productList.length == 0 && status == 'error'}
        <div class="w-full h-[500px]">
            <ProductNotFound/>
=======
                {#if productList.length == 0}
                    <p class="text-xl font-semibold">Data not found...</p>
                {/if}
>>>>>>> master
        </div>
        {/if}
        {#if productList.length > 0 && currentPage < totalPages}
             <div class="w-full">
                 <LoadMoreButton/>
             </div>
        {/if}
    </main>
</Layout>

<style>
    .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    }
</style>