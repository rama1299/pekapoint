<script>
    import { enableDataToCompare } from "../../../../../stores";
    import {removeHtmlTags} from "../../../../../helpers/removeHtmlTags.js"
    import ProgressBar from "./template/ProgressBar.svelte";
    import { afterUpdate, onMount } from "svelte";
  import { Translate } from "../../../../../helpers/translate";

    export let data
    export let key = 'Performance'
    let text = ['Hidden', 'See All']

    onMount(async () => {
        let translate = await Translate.client(text)
        text = translate

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

    $: color = $enableDataToCompare.map((data) => {
        return data.enable ? data.backgroundColor : ''
    }).filter(Boolean)

    $: titleAttributes = dataSpec.map(data => {
        return data.attributes.map(attributes => attributes.title)
    })
    $: titleAttributesUnique = new Set(titleAttributes.flat())
    $: arrayTitleUnique = Array.from(titleAttributesUnique)

    // $: dataTable = dataSpec.map((data) => {
    //     let spec = arrayTitleUnique.map((titleSpec) => {
    //         let findSpec = data.attributes.find((attr) => attr.title == titleSpec)
    //         return findSpec ? {spec: findSpec.spec, score: findSpec.score} : {spec: '', score: 0};
    //     })
    //     return {
    //         device: data.device,
    //         attributes: spec
    //     }
    // })

    $: dataTableSpec = arrayTitleUnique.map((titleSpec) => {
        let data = dataSpec.map((data) => {
            let findSpec = data.attributes.find((attr) => attr.title == titleSpec)
            return findSpec ? {score: findSpec.score, spec: findSpec.spec, device: data.device} : {score: 0, spec: '', device: data.device}
        })
        return {
            title: titleSpec,
            attributes: data
        }
    })

    $: data
    $: isExpand = false

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
        <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
            <p class="text-xl font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{key}</p>
        </div>
        <div class="{isExpand ? '' : 'max-h-[698px]'} duration-200 w-full font-medium overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {#each dataTableSpec as data}
                    <div class="w-full h-56 border border-sekunder-300 rounded-lg overflow-hidden p-3 space-y-2">
                        <div>
                            <p class="text-sm font-semibold">{data.title}</p>
                        </div>
                        <div class="font-medium text-sm w-full overflow-hidden space-y-1">
                        {#each data.attributes as attribute, i}
                                {#if attribute.spec.toLowerCase() == 'yes'}
                                <div class="flex items-center">
                                    <i class='bx bx-check text-green-400 text-3xl leading-7'></i>
                                    <p>{attribute.device}</p>

                                </div>
                                {:else if  attribute.spec.toLowerCase() == 'no'}
                                <div class="flex items-center">
                                    <i class='bx bx-x text-red-600 text-3xl leading-7'></i>
                                    <p>{attribute.device}</p>
                                </div>
                                {:else}
                                    <div class="">
                                        <p class=" leading-tight">{attribute.spec ? removeHtmlTags(attribute.spec) : '-'}</p>
                                        <ProgressBar score={attribute.score} color={color[i]}/>
                                    </div>
                                {/if}
                                {/each}
                            </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="font-medium text-sekunder-950 cursor-pointer" on:click={handleExpand}>{isExpand ? text[0] : text[1]}</p>
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