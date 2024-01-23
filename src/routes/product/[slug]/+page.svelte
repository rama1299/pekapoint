<script>
	import TagCompare from './components/tagCompare/TagCompare.svelte';
	import PriceDetail from './components/priceDetail/PriceDetail.svelte';
	import SpecDetail from './components/specDetail/SpecDetail.svelte';
	import ProductDetail from './components/productDetail/ProductDetail.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';

  export let data
  let dataProduct = data.dataProduct
  let dataSpec = data.dataSpec
  let status = data.status
  let dataVariant = data.dataVariant.length == 0 ? [] : data.dataVariant[0]
  let title = dataProduct.title ?? status
  let dataTagCompare = dataProduct ? [{title: dataProduct.title, slug: dataProduct.slug, feature_image: dataProduct.feature_image}] : []
</script>


<svelte:head>
  <title>{title}</title>
  <meta name="description" content={`Detail from ${title}`} />
</svelte:head>
<Layout isDetailProductPage={true} >
  {#if status === 'success'}
    <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-100">
        <ProductDetail data={dataProduct} spec={dataSpec} variant={dataVariant}/>
        <SpecDetail data={dataSpec}/>
        <PriceDetail/>
        <TagCompare data={dataTagCompare}/>
    </main>
  {:else if  status === 'error'}
    <main class="w-full h-screen bg-gray-100 mx-auto pt-14 lg:pt-20">
      <p class="text-lg font-medium">Data Error...</p>
    </main>
  {/if}
</Layout>