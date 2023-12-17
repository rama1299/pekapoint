<script>
    import { enableDataToCompare } from "../../../../../stores";
    import {removeHtmlTags} from "../../../../../helpers/removeHtmlTags.js"
    import ProgressBar from "./template/ProgressBar.svelte";
    import { afterUpdate, onMount } from "svelte";

    export let data
    export let key = 'Performance'

    onMount(() => {
        if (widthScreen < 1024) {
            widthTableCol = widthContainer
        } else if (widthScreen >= 1024 && enableData.length === 2 && enableData.length < 3) {
            widthTableCol = widthContainer / 2
        } else if (widthScreen >= 1024 && enableData.length <= 3 && enableData.length < 5) {
            widthTableCol = widthContainer / 3
        } else if (enableData.length == 1) {
            widthTableCol = widthContainer
        }
    })

    $: enableData = $enableDataToCompare.map(({ id, enable }) => {
        const matchingItem = data.find(item => item.product_id === id && enable);
        return matchingItem;
    }).filter(Boolean);
    $: dataSpec = enableData.map((data) => {
        const datas = JSON.parse(data.datas)
        const findSpec = datas.find((spec) => spec.title === key)
        return {
            ...findSpec,
            device : data.title
        }
    })

    $:backgroundColor = $enableDataToCompare.map((data) => {
        return data.enable ? data.backgroundColor : ''
    }).filter(Boolean)

    $: titleAttributes = dataSpec.map(data => {
        return data.attributes.map(attributes => attributes.title)
    })
    $: titleAttributesUnique = new Set(titleAttributes.flat())
    $: arrayTitleUnique = Array.from(titleAttributesUnique)

    $: dataTable = dataSpec.map((data) => {
        let spec = arrayTitleUnique .map((titleSpec) => {
            let findSpec = data.attributes.find((attr) => attr.title == titleSpec)
            return findSpec ? {spec: findSpec.spec, score: findSpec.score} : {spec: '', score: 0};
        })
        return {
            device: data.device,
            attributes: spec
        }
    })

    $: isExpand = false

    let scrollContainer
    let widthContainer

    $: widthTableCol = widthContainer
    let widthScreen

    function handleExpand() {
        isExpand = !isExpand
    }

    afterUpdate(() => {
        if (widthScreen < 1024) {
            widthTableCol = widthContainer
        } else if (widthScreen >= 1024 && enableData.length === 2 && enableData.length < 3) {
            widthTableCol = widthContainer / 2
        } else if (widthScreen >= 1024 && enableData.length <= 3 && enableData.length < 5) {
            widthTableCol = widthContainer / 3
        } else if (enableData.length == 1) {
            widthTableCol = widthContainer
        }
    })
    
</script>

<svelte:window bind:innerWidth={widthScreen}/>
<div class="w-full divide-y-2">
    <div class="space-y-3 pb-3">
        <div>
            <p class="text-2xl font-semibold">{key}</p>
        </div>
        <div class="{isExpand ? '' : 'max-h-[673px]'} duration-200 overflow-hidden grid grid-cols-2 lg:grid-cols-4 w-full font-medium">
            <div class="col-span-1 w-full grid grid-flow-row bg-gray-100 divide-y-2 divide-gray-300 rounded-t-xl border-2 border-white">
                <div class="w-full h-24 px-3 flex justify-center items-center text-center">
                    <p class="font-semibold text-xl">Attribute</p>
                 </div>
                {#each arrayTitleUnique as title}
                     <div class="w-full h-24 px-3 flex justify-center items-center text-center">
                        <p>{title}</p>
                     </div>
                {/each}
            </div>
            <div bind:this={scrollContainer} bind:offsetWidth={widthContainer} class="col-span-1 lg:col-span-3 grid grid-flow-col snap-x overflow-x-auto snap-mandatory scrollbar-hidden">
                {#each dataTable as data, i (i)}
                    <div style="width: {widthTableCol}px;" class="col-1 snap-start grid grid-flow-row {backgroundColor[i]} divide-y-2 divide-gray-300 rounded-t-xl border-2 border-white">
                        <div class="w-full h-24 flex justify-center items-center p-3">
                            <p class="font-semibold text-center text-xl">{data.device}</p>
                        </div>
                        {#each data.attributes as item}
                            <div class="w-full h-24 flex justify-center items-center p-3">
                                {#if item.spec.toLowerCase() == 'yes'}
                                    <i class='bx bx-check text-green-400 text-3xl'></i>
                                {:else if  item.spec.toLowerCase() == 'no'}
                                    <i class='bx bx-x text-red-600 text-3xl'></i>
    
                                {:else}
                                    <p class="text-center leading-5">{item.spec == '' ? '-' : removeHtmlTags(item.spec)}</p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="font-medium text-sky-500 cursor-pointer" on:click={handleExpand}>{isExpand ? 'Hidden' :'Show all'}</p>
        </div>
    </div>
    <div></div>
</div>


<style>
    .scrollbar-hidden::-webkit-scrollbar {
    display: none;
    }

    .scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
    }
</style>