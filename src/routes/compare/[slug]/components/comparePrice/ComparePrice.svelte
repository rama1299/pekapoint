<script>
    import { afterUpdate, onMount } from 'svelte';
	import { enableDataToCompare } from './../../../../../stores.js';
    import CardPrice from "./template/CardPrice.svelte";
  import { Translate } from '../../../../../helpers/translate.js';
    export let data

    let text = ['Price']
    onMount(async () => {
        let translate = await Translate.client(text, true)
        text = translate
        if (widthScreen < 1024) {
            widthCol = widthContainer
        } else if (widthScreen >= 1024) {
            widthCol = widthContainer / device.length
        }
    })

    $: enableData = $enableDataToCompare.map(({ id, enable }) => {
        const matchingItem = data.find(item => item.product_id === id && enable);
        return matchingItem;
    }).filter(Boolean);

    $:backgroundColor = $enableDataToCompare.map((data) => {
        return data.enable ? data.backgroundColor : ''
    }).filter(Boolean)

    $: device = enableData.map((data, i) => {
        return {
            title: data.title,
            backgroundColor: backgroundColor[i]
        }
    })

    let widthScreen
    let scrollContainer
    let widthContainer
    $: widthCol = widthContainer

    afterUpdate(() => {
        if (widthScreen < 1024) {
            widthCol = widthContainer
        } else if (widthScreen >= 1024) {
            widthCol = widthContainer / device.length
        }
    })
</script>

<svelte:window bind:innerWidth={widthScreen}/>
<div class="w-full">
    <div class="w-full h-full space-y-3">
        <div class="w-full">
            <p class="text-2xl font-semibold">{text[0]}</p>
        </div>
        <div bind:this={scrollContainer} bind:offsetWidth={widthContainer} class="w-full grid grid-flow-col overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
                {#each device as item, i (i)}
                    <div style="width: {widthCol}px;" class="snap-center grid grid-flow-row gap-2 p-1">
                        <div class={`bg-${item.backgroundColor}-100 rounded-t-lg p-2`}>
                            <div class="w-full flex justify-center items-center py-2">
                                <p class="text-lg overflow-hidden h-12 flex items-center font-semibold text-center leading-6">{item.title}</p>
                            </div>
                            <div class="space-y-2">
                                {#each Array(2) as _, i (i)}
                                     <CardPrice/>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
        </div>
    </div>
</div>

<style>
    .scrollbar-hidden::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge add Firefox */
    .scrollbar-hidden {
      -ms-overflow-style: none;
      scrollbar-width: none; /* Firefox */
    }
</style>