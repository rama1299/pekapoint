<script>
	import SpecDetail from './components/specDetail/SpecDetail.svelte';
	import ProductDetail from './components/productDetail/ProductDetail.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';

  export let data
  let dataProduct = data.dataProduct
  let dataSpec = data.dataSpec

</script>

<Layout isDetailProductPage={true} >
  <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
      <ProductDetail data={dataProduct} spec={dataSpec}/>
      <SpecDetail data={dataSpec}/>
  </main>
</Layout>