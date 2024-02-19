<script>
	import { page } from '$app/stores';
    import FormCompare from "./template/FormCompare.svelte";
    import SearchEngine from "./template/SearchEngine.svelte";
    import { Translate } from '../../../helpers/translate';
  import { onMount } from 'svelte';
    export let data

    const brand = import.meta.env.VITE_BRAND

    let text = ['Welcome to', 'Discover the best mobile phones with the optimal balance of price and quality!']

    onMount(async () => {
        const translateText = await Translate.client(text)
        text = translateText
    })

    $: category = 'smartphone'
    $: findDataCategory = data.find((item) => {
        let findData = item.category === category
        return findData
    })
    $: titleData = findDataCategory.title
</script>

<div class="w-full h-[600px] lg:h-[750px] flex justify-center items-start pt-36 relative">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
		<defs>
			<linearGradient id="bg">
				<stop offset="0%" style="stop-color:rgba(130, 158, 249, 0.06)"></stop>
				<stop offset="50%" style="stop-color:rgba(76, 190, 255, 0.6)"></stop>
				<stop offset="100%" style="stop-color:rgba(115, 209, 72)"></stop>
			</linearGradient>
			<path id="wave" fill="#0a1831" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z" />
		</defs>
		<g>
			<use xlink:href='#wave' opacity=".3">
				<animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="10s"
          calcMode="spline"
          values="270 230; -334 180; 270 230"
          keyTimes="0; .5; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
			</use>
			<use xlink:href='#wave' opacity=".6">
				<animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="8s"
          calcMode="spline"
          values="-270 230;243 220;-270 230"
          keyTimes="0; .6; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
			</use>
			<use xlink:href='#wave' opacty=".9">
				<animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="6s"
          calcMode="spline"
          values="0 230;-140 200;0 230"
          keyTimes="0; .4; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
			</use>
		</g>
	</svg>
    <div class="container flex flex-col justify-center items-center gap-5 lg:gap-7 z-10">
        <div class="text-center px-5">
            <p class="text-2xl lg:text-4xl font-bold text-white">{text[0] +' '+ brand}</p>
            <p class="leading-5 lg:text-xl font-medium text-white">{text[1]}</p>
        </div>
        <!-- <FormCompare data={titleData}/> -->
        <SearchEngine data={titleData}/>
    </div>
</div>

<style>
        /* .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    } */

    svg {
		position: absolute;
		top: 0;
		left: 0;
    width: 100%;
    height: 100%;
		box-sizing: border-box;
		display: block;
		background-color: #0e4166;
    background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
	}
</style>