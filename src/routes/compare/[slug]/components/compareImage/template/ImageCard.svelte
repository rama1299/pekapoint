<script>
  import { onMount } from "svelte";
  import DoughnutChart from "./DoughnutChart.svelte";

    export let item
    export let datasLength
    export let color
    export let radarColor

</script>

<div class="w-full text-md lg:text-2xl space-y-3">
    <div class="flex w-full overflow-hidden h-10 lg:h-14 justify-start items-center lg:items-center gap-2 px-3 lg:px-5">
        <div class=" h-full aspect-square relative">
            <DoughnutChart data={item.spec_score} color={radarColor}/>
            <div class="w-full h-full top-0 font-semibold absolute flex justify-center items-center z-10">
                <p>{item.spec_score}</p>
            </div>
        </div>
        <div class="w-full max-h-full">
            <p class="w-full h-full font-semibold leading-5 lg:leading-7 text-ellipsis overflow-hidden">{item.title}</p>
        </div>
    </div>
    <div class="w-full lg:h-72 h-44 flex justify-center relative overflow-hidden border-b-4 {color}">
        {#if item.feature_image.includes('https')}
            <img class="absolute w-full {datasLength == 2 ? 'lg:w-80' : 'lg:w-full'} px-3 lg:px-5" src={`${item.feature_image}`} alt="">
        {:else}
            <img class="absolute w-full {datasLength == 2 ? 'lg:w-80' : 'lg:w-full'} px-3 lg:px-5" src={`/${item.feature_image}`} alt="">
        {/if}
    </div>
</div>