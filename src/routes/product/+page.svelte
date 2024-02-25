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
    let text = ['Products']
    $: status = data.status

    onMount(async() => {
        let translate = await Translate.client(text)
        text = translate
    })

    afterUpdate(async() => {
        if ($page.url.searchParams.size === 0 || filter.join('') != $page.url.searchParams.getAll('filter').join('') || data.data.length === 0 || search != $page.url.searchParams.get('search')) {
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

    let dataAds = data.dataAds
</script>

<svelte:head>
  <title>{text[0]}</title>
</svelte:head>

<Layout isProductPage={true}>
    <!-- <div class="w-full h-52 lg:h-80 bg-cover bg_gradient">
        <div class="w-full lg:w-[90%] font-monst h-full pt-24 px-3 lg:px-0 lg:pt-40 mx-auto">
            <h1 class="text-2xl lg:text-3xl font-bold text-white">{text[0]}</h1>
        </div>
    </div> -->
    <div class="w-full flex">
        {#if dataAds.length > 0}
            {#each dataAds as item}
                {#if item.content_position == 'left'}
                     <div class="w-[10%] h-screen hidden lg:flex justify-center items-center p-2 mt-24">
                        <div class="wrapper flex justify-center items-center">
                            {@html item.content}
                        </div>
                     </div>
                {/if} 
            {/each}
        {/if}
        <div class="wrapper min-h-[600px] font-monst m-auto space-y-4 py-5">
            <div class="w-full px-2">
                <FilterBar/>
            </div>
            <div class="w-full h-full flex justify-between items-start gap-5">
                <div class="hidden w-[25%] h-[750px] bg-white border rounded lg:flex sticky top-5">

                </div>
                <div class="w-full lg:w-[75%] h-full">
                    {#if productList.length > 0}
                        <div class="w-full min-h-[600px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row m-auto gap-4">
                            {#each productList as item (item.id)}
                                <ProductList item={item}/>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
    
            {#if productList.length == 0 && status == 'error'}
            <div class="w-full h-[500px]">
                <ProductNotFound/>
            </div>
            {/if}
            {#if productList.length > 0 && currentPage < totalPages}
                 <div class="w-full">
                     <LoadMoreButton/>
                 </div>
            {/if}
        </div>
        {#if dataAds.length > 0}
            {#each dataAds as item}
                {#if item.content_position == 'right'}
                     <div class="w-[10%] h-screen hidden lg:flex justify-center items-center p-2 mt-24">
                        <div class="wrapper flex justify-center items-center">
                            {@html item.content}
                        </div>
                     </div>
                {/if} 
            {/each}
        {/if}
    </div>
</Layout>

<style>
    .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    }
</style>