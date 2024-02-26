<script>
	import { goto } from '$app/navigation';
	import TagCompare from './components/tagCompare/TagCompare.svelte';
	import PriceDetail from './components/priceDetail/PriceDetail.svelte';
	import SpecDetail from './components/specDetail/SpecDetail.svelte';
	import ProductDetail from './components/productDetail/ProductDetail.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';
  import { onMount } from 'svelte';
  import { Translate } from '../../../helpers/translate';

  export let data
  
  onMount(async () => {
    if (data.status == 'error') {
      goto('/error')
    }
    let translate = await Translate.product(data.dataProduct, true)
    dataProduct = translate
    let translateSpec = await Translate.productSpec(data.dataSpec)
    dataSpec = translateSpec

    dataTagCompare = [{title: dataProduct.title, slug: dataProduct.slug, feature_image: dataProduct.feature_image}]
    title = dataProduct.title
    window.scrollTo({
      top: 0
    })
  })
  let dataProduct = ''
  let dataSpec = ''
  let status = data.status
  let dataVariant = data.dataVariant.length == 0 ? [] : data.dataVariant[0]
  let title = ''
  let dataTagCompare = []
  let dataAds = data.dataAds

</script>


<svelte:head>
  {#if title != ''}
     <title>{title}</title>
     <meta name="description" content={`Detail from ${title}`} />
  {/if}
</svelte:head>
{#if status === 'success'}
<Layout isDetailProductPage={true} >
    <div class="w-full h-auto bg-white">
      {#if dataProduct != '' && dataSpec != ''}
        <div class="w-full lg:w-[80%] mx-auto pb-20">
          <ProductDetail data={dataProduct} spec={dataSpec} variant={dataVariant} dataAds={dataAds}/>
        </div>
      {/if}
    </div>
    <div class="w-full h-auto bg-gray-100 flex justify-center">
      {#if dataAds != []}
        {#each dataAds as ads}
          {#if ads.content_position == 'left'}
             <div class="w-[10%] hidden lg:flex h-screen justify-center items-center sticky top-0">
              <div class="w-full h-[80%] flex justify-center items-center">
                {@html ads.content}
              </div>
             </div>
          {/if}
        {/each}
      {/if}
      {#if dataSpec != ''}
      <div class="w-full lg:w-[80%] mx-auto py-20">
        <SpecDetail data={dataSpec}/>
      </div>
      {/if}
      {#if dataAds != []}
        {#each dataAds as ads}
          {#if ads.content_position == 'right'}
             <div class="w-[10%] hidden lg:flex h-screen justify-center items-center sticky top-0">
              <div class="w-full h-[80%] flex justify-center items-center">
                {@html ads.content}
              </div>
             </div>
          {/if}
        {/each}
      {/if}
    </div>
    <div class="w-full h-auto bg-white">
      <div class="w-full lg:w-[80%] mx-auto py-20">
        <PriceDetail/>
      </div>
    </div>
      {#if dataTagCompare != []}
         <TagCompare data={dataTagCompare}/>
      {/if}
  </Layout>
  {/if}