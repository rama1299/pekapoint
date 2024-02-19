<script>
	import TopProduct from './components/topProduct/TopProduct.svelte';
	import SliderCompareNew from './components/silderCompareNew/SliderCompareNew.svelte';
	import SlideCompareView from './components/sliderCompareView/SlideCompareView.svelte';
	import SliderProductView from './components/sliderProductView/SliderProductView.svelte';
	import Layout from "../lib/components/layout/Layout.svelte";
  	import Header from "./components/header/Header.svelte";
	export let data
	import {onMount, afterUpdate} from 'svelte'
	import { Translate } from './../helpers/translate.js';

	const brand = import.meta.env.VITE_BRAND

	let text = ['Easy Price and Quality Comparison!', 'Compare Now!']
	onMount(async () => {
		const textTranslate = await Translate.client(text)
		text = textTranslate
	})

	let width
	let dataAds = data.dataAds || []
</script>

<svelte:head>
  <title>{brand}</title>
</svelte:head>
<svelte:window bind:innerWidth={width}/>
<Layout>
	<main class="w-full bg-white">
			<Header data={data.dataTitleProduct}></Header>
			<!-- {#each dataAds as ads} -->
				<!-- {#if ads.content_position == 'top' && ads.page == '/'} -->
					 <div class="lg:w-wrap container mx-auto my-7 flex justify-center items-center bg-cover h-24">
						<p>[IKLAN]</p>
					 </div>
				<!-- {/if} -->
			<!-- {/each} -->
			<div class="w-full flex bg-white gap-2">
				{#if width > 990}
					<!-- {#each dataAds as ads} -->
						<!-- {#if ads.content_position == 'left' && ads.page == '/'} -->
							<div class="w-[15%] min-h-[1400px] flex justify-center items-center">
								<div class=" w-full h-[750px] flex justify-center items-center">
									<p>[IKLAN]</p>
								</div>
							</div>
						<!-- {/if} -->
					<!-- {/each} -->
				{/if}
				{#if data.dataTopProduct.length > 0}
					<div class="bg-white w-full lg:w-[70%]">
						<div class="w-full mx-auto">
							<TopProduct data={data.dataTopProduct}/>
						</div>
					</div>
				{/if}
				{#if width > 990}
					<!-- {#each dataAds as ads} -->
						<!-- {#if ads.content_position == 'right' && ads.page == '/'} -->
							<div class="w-[15%] min-h-[1400px] flex justify-center items-center">
								<div class=" w-full h-[750px] flex justify-center items-center">
									<p>[IKLAN]</p>
								</div>
							</div>
						<!-- {/if} -->
					<!-- {/each} -->
				{/if}
			</div>
				{#if data.dataProductMostView.length > 0}
					<div class="flex justify-center items-center w-full lg:w-[70%] mx-auto bg-white h-[900px]">
						<div class="w-full mx-auto">
							<SliderProductView data={data.dataProductMostView}/>
						</div>
					</div>
				{/if}
			<div class="flex justify-center items-center w-full py-10 bg-sky-500 h-[400px] lg:h-[550px]">
				<div class="container flex px-5 justify-center flex-col items-center gap-10">
					<di class="text-center font-bold text-2xl lg:text-4xl text-white ">
						<p>{brand},</p>
						<p>{text[0]}</p>
					</di>
					<div>
						<button class="w-52 h-12 border-2 border-white flex justify-center items-center rounded-lg group hover:bg-white duration-100" on:click={()=> {
							scrollTo({
								top: 0,
								behavior: 'smooth'
							})
						}}>
							<p class="text-white font-semibold group-hover:text-sky-500">{text[1]}</p>
						</button>
					</div>
				</div>
			</div>
			{#if data.dataComapreMostView.length > 0}
				 <div class="flex justify-center items-center w-full h-[900px] bg-gray-100">
					 <div class="w-full lg:w-[70%] mx-auto">
						 <SlideCompareView data={data.dataComapreMostView}/>
					 </div>
				 </div>
			{/if}
			{#if data.dataCompareNew.length > 0}
				 <div class="flex justify-center items-center bg-white w-full h-[900px]">
					 <div class="w-full lg:w-[70%] mx-auto">
						 <SliderCompareNew data={data.dataCompareNew}/>
					 </div>
				 </div>
			{/if}
	</main>
</Layout>
<style>

</style>

