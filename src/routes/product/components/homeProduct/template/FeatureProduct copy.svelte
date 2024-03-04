<script>
	import { goto } from '$app/navigation';
    import { afterUpdate, onMount } from "svelte";
    import { formatCurrency } from '../../../../../helpers/currency';

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
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
        <p class="font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{title}</p>
        <div class="flex justify-center items-center text-2xl">
            <i class='bx bx-chevron-left' on:click={prev}></i>
            <i class='bx bx-chevron-right' on:click={next}></i>
        </div>
    </div>
    <div class="w-full h-60">
        <div id="containerScroll" class="h-full w-full grid grid-flow-col overflow-x-auto snap-x snap-mandatory divide-x divide-sekunder-200" bind:this={containerScroll} bind:offsetWidth={widthContainerScroll}>
                 {#each data as item}
                 <div on:click={() => {goto(`${item.url}`)}}>
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