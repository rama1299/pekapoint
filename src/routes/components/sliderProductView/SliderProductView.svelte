<script>
    import { afterUpdate, onMount } from "svelte";
	import { goto } from '$app/navigation';
    import { formatCurrency } from "../../../helpers/currency";

    export let data
    export let title

    onMount(() => {
        containerScroll.scrollTo({
            left: containerScroll.scrollLeft + 0
        })
    })

    let container
    let widthContainerScroll
    $: col = 4
    $: widthCol = widthContainerScroll / col
    let containerScroll
    $: currentCol = col

    afterUpdate(() => {
        if (container < 640) {
            col = 1;
        } else if (container >= 640 && container < 768) {
            col = 2;
        } else if (container >= 768 && container < 1024) {
            col = 3;
        } else {
            col = 4;
        }
    })

    function next() {
    if (currentCol < data.length - 1) {
        containerScroll.scrollTo({
        left: containerScroll.scrollLeft + widthCol,
        behavior: 'smooth'
        
    })
    currentCol += 1
    }
    
}

    function prev() {
        if (currentCol > col) {
            containerScroll.scrollTo({
                left: containerScroll.scrollLeft - widthCol,
                behavior: 'smooth'
                
            })
            currentCol -= 1
        }
    }

</script>

<svelte:window bind:innerWidth={container}/>

<div class="w-full h-full space-y-5 ">
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1 relative">
        <p class="font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{title}</p>
        <div class="flex justify-center items-center text-2xl">
            <i class='bx bx-chevron-left' on:click={prev}></i>
            <i class='bx bx-chevron-right' on:click={next}></i>
        </div>
    </div>
    <div class="w-full h-60">
        <div id="containerScroll" class="h-full w-full grid grid-flow-col overflow-x-auto snap-x snap-mandatory divide-x divide-sekunder-200" bind:this={containerScroll} bind:offsetWidth={widthContainerScroll}>
            {#each data as item}
                <div on:click={() => {goto(item.url)}}>
                    {#each item.product as product}
                         <div class="w-full h-60 flex flex-col justify-center items-center snap-start space-y-2 p-3 duration-100 hover:scale-105" style="width: {widthCol}px;">
                            <div class="w-full h-36 flex justify-center items-center">
                                {#if product.feature_image.includes('https')}
                                    <img src={product.feature_image} alt="" class="h-full">
                                {:else}
                                    <img src={`/${product.feature_image}`} alt="" class="h-full">
                                {/if}
                            </div>
                            <div class="w-full h-24 flex flex-col justify-center items-center">
                                    <p class="text-sm h-8 w-full text-center text-accent-sekunder-950 leading-4 overflow-hidden">{product.title}</p>
                                {#each product.affiliate as affiliate}
                                    <p class="w-full h-8 flex justify-center items-center text-sm font-medium text-accent-red-600">{formatCurrency(parseFloat(affiliate.price))}</p>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    ::-webkit-scrollbar{
 display: none;
}
    .tag {
        clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
    }
</style>

<!-- <script>
    import Card from './template/Card.svelte'
    import { goto } from '$app/navigation';
    import {afterUpdate, onMount} from 'svelte'
    export let data
    import { Translate } from '../../../helpers/translate';

    let text = ['Most Viewed Products', "This product captures customer attention. Don't miss the chance to own this highly coveted item!", 'Slide', 'See All']

    onMount(async() => {
    const textTranslate = await Translate.client(text)
    text = textTranslate

    containerScroll.scrollTo({
        left: 0,
        behavior: 'smooth'
    })
})

let widthContainerScroll
$: col = 4
$: widthCol = widthContainerScroll / col
let containerScroll
$: currentCol = col

function handleNext() {
    if (currentCol < data.length - 1) {
        containerScroll.scrollTo({
        left: containerScroll.scrollLeft + widthCol,
        behavior: 'smooth'
        
    })
    currentCol += 1
    }
    
}

function handlePrev() {
    if (currentCol > col) {
        containerScroll.scrollTo({
            left: containerScroll.scrollLeft - widthCol,
            behavior: 'smooth'
            
        })
        currentCol -= 1
    }
}

afterUpdate(() => {
    
    if (widthContainerScroll > 872) {
        col = 4;
    } else if (widthContainerScroll > 638) {
        col = 3;
    } else {
        col = 1;
    }

})

</script>

<div class="space-y-10 w-full px-2">
<div class="w-full flex justify-center">
    <div class="w-full text-center space-y-3">
        <p class="text-2xl font-bold">{text[0]}</p>
        <p>{text[1]}</p>
    </div>
</div>
<div class="w-full hidden lg:flex justify-end">
    <div class="hidden lg:flex gap-2">
        <div class="{currentCol > col ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handlePrev}>
            <i class='bx bx-chevron-left text-4xl'></i>
        </div>
        <div class="{currentCol < data.length - 1 ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handleNext}>
            <i class='bx bx-chevron-right text-4xl'></i>
        </div>
    </div>
</div>
<div class="space-y-2">
    <div bind:this={containerScroll} bind:offsetWidth={widthContainerScroll} class="hidden-scroll w-full grid grid-flow-col overflow-scroll lg:overflow-hidden snap-x snap-mandatory">
        {#each data as item}
            <div style="width: {widthCol}px;" class="snap-start px-2 col-span-1 cursor-pointer">
                <Card data={item}/>
            </div>
        {/each}
    </div>
    <div class="w-full lg:hidden flex justify-center gap-2 text-sky-500 items-center">
        <i class='bx bx-chevrons-left'></i>
        <p>{text[2]}</p>
        <i class='bx bx-chevrons-right'></i>
    </div>
</div>
<div class="pt-4 md:pt-0 w-full flex justify-center">
    <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer" on:click={() => {goto(`/product`)}}>
        <p class="text-lg font-medium">{text[3]}</p>
    </div>
</div>
</div>

<style>
.hidden-scroll::-webkit-scrollbar{
    width: 0;
    display: none;
}

.hidden-scroll::-webkit-scrollbar-thumb{
    width: 0;
}
</style> -->