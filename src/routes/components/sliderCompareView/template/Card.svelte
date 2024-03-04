<script>
	import { goto } from '$app/navigation';
  import { formatCurrency } from '../../../../helpers/currency';
  import ProgressBar from "./ProgressBar.svelte";

    export let data
    $: dataProduct = data.product

</script>

<div>
    <div class="w-full overflow-hidden bg-white p-2 border space-y-2 border-sekunder-300 rounded-lg">
        <div class="w-full h-full flex flex-col justify-between items-center relative group divide-y divide-sekunder-300">
            {#each dataProduct as product, i}
                <div class="w-full h-full flex justify-start items-center">
                    <div class="h-24 aspect-square p-1 overflow-hidden flex justify-start items-center group-hover:scale-105 duration-200" on:click={() => {goto(`${data.url}`)}}>
                        {#if product.feature_image.includes('https')}
                            <img src={`${product.feature_image}`} alt="" class="h-full w-fit">
                        {:else}
                            <img src={`/${product.feature_image}`} alt="" class="h-full w-fit">
                        {/if}
                    </div>
                    <div class="w-full h-24 flex flex-col justify-center items-start py-2">
                        <a href={data.url} class="w-full max-h-10 font-semibold flex justify-start text-start items-end overflow-hidden text-sm leading-5">{product.title}</a>
                        <p class="w-full flex text-accent-red-600 font-medium justify-start text-start text-sm items-start">{formatCurrency(parseFloat(product.affiliate[0].price))}</p>
                        <div class="w-full h-2">
                            <ProgressBar score={product.spec_score}></ProgressBar>
                        </div>
                    </div>
                </div>
            {/each}
                <p class="w-6 h-6 flex justify-center items-center text-xs font-medium rounded-full border bg-white absolute top-[45%]">VS</p>
        </div>
    </div>
</div>
