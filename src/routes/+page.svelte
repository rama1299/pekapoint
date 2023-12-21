<script>
	import Layout from "../lib/components/layout/Layout.svelte";
  	import Header from "./components/header/Header.svelte";
	export let data
</script>

<Layout>
	<main class="w-full">
			<Header data={data.data}></Header>
	</main>
</Layout>

<style>

</style>

