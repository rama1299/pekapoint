<script>
	import { page } from '$app/stores';
	import LoadMore from './components/loadMore/LoadMore.svelte';
	import CompareList from './components/compareList/CompareList.svelte';
  import FilterBar from './components/filterBar/FilterBar.svelte';
  import {afterUpdate} from 'svelte'
  import Layout from "../../lib/components/layout/Layout.svelte";

  export let data
    
    let dataCompare = []
    let filter = $page.url.searchParams.get('filter')
    $: pageUrl = $page.url.searchParams.get('page')
    $: currentPage = pageUrl === null ? 1 : pageUrl
    $: totalPages = data.totalPages

    afterUpdate(() => {
      if ($page.url.searchParams.size === 0 || filter != $page.url.searchParams.get('filter') || data.data.length === 0) {
        dataCompare = data.data
      } else {
        dataCompare = [...dataCompare, ...data.data]
      }
      filter = $page.url.searchParams.get('filter')
      pageUrl = $page.url.searchParams.get('page')
    })
</script>


<svelte:head>
  <title>Compare</title>
</svelte:head>
<Layout>
  <div class="w-full h-96 bg-cover bg_gradient">
    <div class="container lg:w-wrap font-monst h-full pt-44 mx-auto">
        <h1 class="text-5xl font-bold text-white">Compare</h1>
    </div>
  </div>
  <main class="w-full min-h-screen px-2 mx-auto py-5 space-y-4 bg-gray-100">
    <FilterBar/>
    <CompareList data={dataCompare}/>
    {#if currentPage < totalPages}
       <LoadMore/>
    {/if}
  </main>
</Layout>

<style>
  .bg_gradient {
      background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
  }
</style>