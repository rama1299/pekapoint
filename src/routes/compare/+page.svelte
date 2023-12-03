<script>
	import CompareSpec from './component/compare/CompareSpec.svelte';
    import Layout from "../../lib/components/layout/Layout.svelte";
</script>

<Layout isDetailProductPage={true} >
  <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
    <CompareSpec></CompareSpec>
  </main>
</Layout>