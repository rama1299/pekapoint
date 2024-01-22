<script>
	import SliderCompareNew from './components/silderCompareNew/SliderCompareNew.svelte';
	import SlideCompareView from './components/sliderCompareView/SlideCompareView.svelte';
	import SliderProductView from './components/sliderProductView/SliderProductView.svelte';
	import Layout from "../lib/components/layout/Layout.svelte";
  	import Header from "./components/header/Header.svelte";
	export let data
</script>

<svelte:head>
  <title>Specwar</title>
</svelte:head>
<Layout>
	<main class="w-full">
			<Header data={data.dataTitleProduct}></Header>
			<div class="flex justify-center items-center w-full h-[600px]">
				<div class="container mx-auto">
					<SliderProductView data={data.dataProductMostView}/>
				</div>
			</div>
			<div class="flex justify-center items-center bg-white w-full h-[600px]">
				<div class="container mx-auto">
					<SlideCompareView data={data.dataComapreMostView}/>
				</div>
			</div>
			<div class="flex justify-center items-center w-full h-[600px]">
				<div class="container mx-auto">
					<SliderCompareNew data={data.dataCompareNew}/>
				</div>
			</div>
	</main>
</Layout>
<style>

</style>

