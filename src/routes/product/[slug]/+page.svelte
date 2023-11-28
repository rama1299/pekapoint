<script>
	import ProductDetail from './components/productDetail/ProductDetail.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';

  export let data
  $: data = data.data

</script>

<Layout isDetailProductPage={true} >
  <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
      <ProductDetail data={data}/>
  </main>
</Layout>