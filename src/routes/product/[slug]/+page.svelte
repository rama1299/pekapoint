<script>
	import PriceDetail from './components/priceDetail/PriceDetail.svelte';
	import SpecDetail from './components/specDetail/SpecDetail.svelte';
	import ProductDetail from './components/productDetail/ProductDetail.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';

  export let data
  let dataProduct = data.dataProduct
  let dataSpec = data.dataSpec
  let title = dataProduct.title

</script>


<svelte:head>
  <title>{title}</title>
  <meta name="description" content={`Detail from ${title}`} />
</svelte:head>
<Layout isDetailProductPage={true} >
  <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
      <ProductDetail data={dataProduct} spec={dataSpec}/>
      <SpecDetail data={dataSpec}/>
      <PriceDetail/>
  </main>
</Layout>