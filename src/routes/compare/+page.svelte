<script>
	import { page } from '$app/stores';
	import LoadMore from './components/loadMore/LoadMore.svelte';
	import CompareList from './components/compareList/CompareList.svelte';
  import FilterBar from './components/filterBar/FilterBar.svelte';
  import {afterUpdate, onMount} from 'svelte'
  import Layout from "../../lib/components/layout/Layout.svelte";
  import { Translate } from '../../helpers/translate';

  export let data
  let dataAds = data.dataAds
  let text = ['Compare']

  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
  })
    
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
  <title>{text[0]}</title>
</svelte:head>
<Layout>
  <!-- <div class="w-full h-52 lg:h-80 bg-cover bg_gradient">
    <div class="w-full lg:w-[90%] font-monst h-full pt-24 px-3 lg:px-0 lg:pt-40 mx-auto">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">{text[0]}</h1>
    </div>
  </div> -->
<div class="w-full flex justify-center pt-12 lg:pt-0">
  {#if dataAds != []}
    {#each dataAds as ads}
      {#if ads.content_position == 'left'}
      <div class="w-[10%] h-screen hidden lg:flex justify-center items-center mt-24">
        <div class="w-full h-[80%] flex justify-center items-center">
          {@html ads.content}
        </div>
      </div>
      {/if}
    {/each}
  {/if}
  <div class="wrapper min-h-screen px-2 mx-auto py-5 space-y-4">
    <div class="w-full h-full flex justify-end gap-4">
      <div class="w-[25%] hidden lg:flex h-full">
        <div class="w-full h-[600px] space-y-2 p-4 bg-sekunder-50 rounded-lg border border-sekunder-300 sticky top-4">
          <p class="font-semibold">Filter</p>
          <FilterBar/>
        </div>
      </div>
      <div class="w-full lg:w-[75%]">
        <CompareList data={dataCompare}/>
      </div>
    </div>
    {#if currentPage < totalPages}
       <LoadMore/>
    {/if}
  </div>
  {#if dataAds != []}
    {#each dataAds as ads}
      {#if ads.content_position == 'right'}
      <div class="w-[10%] h-screen hidden lg:flex justify-center items-center mt-24">
        <div class="w-full h-[80%] flex justify-center items-center">
          {@html ads.content}
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