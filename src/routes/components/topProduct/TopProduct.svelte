<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  import { Translate } from '../../../helpers/translate';
    export let data
    
    let text = ['Our Top Product', 'Products with the best quality and have been tested.', 'Start', 'See All']

    onMount(async () => {
        const textTranslate = await Translate.client(text)
        text = textTranslate
    })
</script>

<div class="w-full space-y-5">
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1 relative">
        <p class="font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">Top Product</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data as product}
            <div class="w-full lg:h-60 flex md:flex-row lg:flex-col justify-center items-center snap-start lg:space-y-2 p-3 duration-100 hover:scale-105 border rounded-md" on:click={() => {goto(`/product/${product.slug}`)}}>
                <div class="w-1/2 lg:w-full h-24 lg:h-36 flex justify-center items-center">
                    {#if product.feature_image.includes('https')}
                        <img src={product.feature_image} alt="" class="h-full">
                    {:else}
                        <img src={`/${product.feature_image}`} alt="" class="h-full">
                    {/if}
                </div>
                <div class="w-full h-24 flex flex-col justify-center items-center">
                        <p class="text-sm h-8 w-full text-center text-accent-sekunder-950 leading-4 overflow-hidden">{product.title}</p>
                    <!-- {#each product.affiliate as affiliate} -->
                        <p class="w-full h-8 flex justify-center items-center text-sm font-medium text-accent-red-600">Rp. 19700000</p>
                    <!-- {/each} -->
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .tag {
        clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
    }
</style>

<!-- <div class="w-full space-y-10 pb-10 px-5 lg:px-0">
    <div class="w-full text-center space-y-3">
        <p class="text-2xl font-bold">{text[0]}</p>
        <p>{text[1]}</p>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {#each data as item, i}
            <div class="w-full col-span-1 border-2 rounded-lg p-5">
                <div class="w-full h-full flex md:flex-col justify-between gap-3 cursor-pointer group">
                    <div class="w-full h-32 lg:h-52 flex justify-center" on:click={() => {goto(`/product/${item.slug}`)}}>
                        {#if item.feature_image.includes('https')}
                             <img src={`${item.feature_image}`} alt="" class="h-full group-hover:scale-105 duration-200">
                        {:else}
                            <img src={`/${item.feature_image}`} alt="" class="h-full group-hover:scale-105 duration-200">
                        {/if}
                    </div>
                    <div class="w-full space-y-3">
                        <div>
                            <a href={`/product/${item.slug}`} class="w-full text-start font-semibold leading-5 h-10 overflow-hidden group-hover:text-sky-500 duration-100">{item.title}</a>
                        </div>
                        <div class="w-full flex flex-col-reverse gap-1 md:flex-row md:justify-between items-start">
                            <div class="space-y-1 w-full">
                                <div class="flex gap-2 items-center">
                                    <i class='bx bxs-star text-sky-500'></i>
                                    <p class="font-semibold">{JSON.parse(item.affiliate)[0].rating}</p>
                                </div>
                                <div class="flex w-full justify-between items-end">
                                    <div class="leading-3">
                                        <p class="font-medium text-sm">{text[2]}</p>
                                        <p class="font-semibold lg:text-xl">Rp. {JSON.parse(item.affiliate)[0].price}</p>
                                    </div>
                                    <button class="w-7 md:w-9 rounded-md bg-sky-500 hover:bg-white aspect-square border border-sky-500 duration-100 text-white hover:text-sky-500 flex items-center justify-center" on:click={() => {goto(`/product/${item.slug}`)}}>
                                        <i class='bx bx-right-arrow-alt text-xl' ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="w-full flex justify-center">
        <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer" on:click={() => {goto(`/product`)}}>
            <p class="text-lg font-medium">{text[3]}</p>
        </div>
    </div>
</div> -->