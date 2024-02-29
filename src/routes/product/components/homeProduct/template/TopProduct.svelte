<script>
	import { goto } from '$app/navigation';
    export let data
</script>

<div class="w-full space-y-5">
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
        <p class="font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">Top Product</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
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