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
</script>


<svelte:head>
  {#if title != ''}
     <title>{title}</title>
     <meta name="description" content={`Detail from ${title}`} />
  {/if}
</svelte:head>
{#if status === 'success'}
<Layout isDetailProductPage={true} >
    <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-100">
      {#if dataProduct != '' && dataSpec != ''}
         <ProductDetail data={dataProduct} spec={dataSpec} variant={dataVariant}/>
      {/if}
      {#if dataSpec != ''}
         <SpecDetail data={dataSpec}/>
      {/if}
        <PriceDetail/>
      {#if dataTagCompare != []}
         <TagCompare data={dataTagCompare}/>
      {/if}
    </main>
  </Layout>
  {/if}