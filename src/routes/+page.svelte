<script>
	import TopProduct from './components/topProduct/TopProduct.svelte';
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
			<div class="bg-white w-full">
				<div class="container mx-auto">
					<TopProduct/>
				</div>
			</div>
			<div class="flex justify-center items-center w-full bg-white h-[900px]">
				<div class="container mx-auto">
					<SliderProductView data={data.dataProductMostView}/>
				</div>
			</div>
			<div class="flex justify-center items-center w-full py-10 bg-sky-500 h-[550px]">
				<div class="container flex justify-center flex-col items-center gap-5">
					<di class="text-center font-bold text-5xl text-white ">
						<p>Specwar,</p>
						<p>Easy Price and Quality Comparison!</p>
					</di>
					<div>
						<button class="w-52 h-12 border-2 border-white flex justify-center items-center rounded-lg group hover:bg-white duration-100" on:click={()=> {
							scrollTo({
								top: 0,
								behavior: 'smooth'
							})
						}}>
							<p class="text-white font-semibold group-hover:text-sky-500">Compare Now!</p>
						</button>
					</div>
				</div>
			</div>
			<div class="flex justify-center items-center w-full h-[900px]">
				<div class="container mx-auto">
					<SlideCompareView data={data.dataComapreMostView}/>
				</div>
			</div>
			<div class="flex justify-center items-center bg-white w-full h-[900px]">
				<div class="container mx-auto">
					<SliderCompareNew data={data.dataCompareNew}/>
				</div>
			</div>
	</main>
</Layout>
<style>

</style>

