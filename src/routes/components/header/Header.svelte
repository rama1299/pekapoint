<script>
    import FormCompare from "./template/FormCompare.svelte";
    import SearchEngine from "./template/SearchEngine.svelte";
    export let data

    $: category = 'smartphone'
    $: findDataCategory = data.find((item) => {
        let findData = item.category === category
        return findData
    })
    $: titleData = findDataCategory.title
</script>

<div class="w-full h-[750px] lg:h-[980px] flex justify-center items-start pt-52 relative">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
		<defs>
			<linearGradient id="bg">
				<stop offset="0%" style="stop-color:rgba(130, 158, 249, 0.06)"></stop>
				<stop offset="50%" style="stop-color:rgba(76, 190, 255, 0.6)"></stop>
				<stop offset="100%" style="stop-color:rgba(115, 209, 72)"></stop>
			</linearGradient>
			<path id="wave" fill="white" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
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
    <div class="container flex flex-col justify-center items-center gap-8 lg:gap-16 z-10">
        <div class="text-center space-y-2">
            <p class="text-3xl lg:text-7xl font-bold text-white">Welcome to Specwar</p>
            <p class="text-xl lg:text-3xl font-medium text-white">Compare Item Specifications</p>
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