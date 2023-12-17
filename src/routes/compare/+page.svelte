<script>
	import CompareList from './components/compareList/CompareList.svelte';
    import Layout from "../../lib/components/layout/Layout.svelte";
</script>

<Layout isDetailProductPage={true} >
  <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
    <CompareList/>
  </main>
</Layout>