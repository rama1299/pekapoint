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

	console.log(data.dataAds)
</script>

<svelte:head>
  <title>{brand}</title>
</svelte:head>
<svelte:window bind:innerWidth={width}/>
<Layout>
	<main class="w-full bg-white">
			<Header data={data.dataTitleProduct}></Header>
			{#each dataAds as ads}
				{#if ads.content_position == 'top' && ads.page == 'home'}
					 <div class="wrapper mx-auto my-7 flex justify-center items-center h-24">
						{@html ads.content}
					 </div>
				{/if}
			{/each}
			<div class="w-full flex bg-white gap-2 pt-7 justify-center">
					{#each dataAds as ads}
						{#if ads.content_position == 'left' && ads.page == 'home'}
							<div class="w-[15%] h-screen hidden lg:flex justify-center items-center mt-20">
								<div class=" w-full h-[80%] flex justify-center items-center">
									{@html ads.content}
								</div>
							</div>
						{/if}
					{/each}
				{#if data.dataTopProduct.length > 0}
					<div class="bg-white w-full py-10">
						<div class="wrapper mx-auto">
							<TopProduct data={data.dataTopProduct}/>
						</div>
					</div>
				{/if}
					{#each dataAds as ads}
						{#if ads.content_position == 'right' && ads.page == 'home'}
							<div class="w-[15%] h-screen hidden lg:flex justify-center items-center mt-20">
								<div class=" w-full h-[80%] flex justify-center items-center">
									{@html ads.content}
								</div>
							</div>
						{/if}
					{/each}
			</div>
				{#if data.dataProductMostView.length > 0}
					<div class="flex justify-center items-center w-full mx-auto py-10">
						<div class="wrapper mx-auto">
							<SliderProductView data={data.dataProductMostView} title={'Product Most View'}/>
						</div>
					</div>
				{/if}
			<!-- <div class="flex justify-center items-center w-full py-10 bg-sky-500 h-[400px] lg:h-[550px]">
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
			</div> -->
			{#if data.dataComapreMostView.length > 0}
				 <div class="flex justify-center items-center w-full py-10">
					 <div class="wrapper mx-auto">
						 <SlideCompareView data={data.dataComapreMostView} title={'Comparison Most View'}/>
					 </div>
				 </div>
			{/if}
			{#if data.dataCompareNew.length > 0}
				 <div class="flex justify-center items-center w-full py-10">
					 <div class="wrapper mx-auto">
						 <SliderCompareNew data={data.dataCompareNew} title={'Comparison Latest'}/>
					 </div>
				 </div>
			{/if}
	</main>
</Layout>
<style>

</style>

