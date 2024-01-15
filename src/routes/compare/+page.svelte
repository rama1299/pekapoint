<script>
	import CompareList from './components/compareList/CompareList.svelte';
    import Layout from "../../lib/components/layout/Layout.svelte";
    export let data
    
    $: dataCompare = data.data
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

  <main class="w-full mx-auto pt-14 lg:pt-20 bg-gray-100">
    <CompareList data={dataCompare}/>
  </main>
</Layout>

<style>
  .bg_gradient {
      background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
  }
</style>