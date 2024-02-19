<script>
	import { goto } from '$app/navigation';
    export let data
    $: dataProduct = data.product
</script>

<div>
    <div class="w-full h-[250px] overflow-hidden bg-white p-5 space-y-2 border-2 rounded-lg">
        <div class="w-full h-full flex justify-center items-center gap-1 relative group">
            {#each dataProduct as product, i}
                <div class="w-1/2 h-full space-y-5">
                    <div class="w-full aspect-auto h-44 md:h-auto md:aspect-square overflow-hidden flex justify-center items-end group-hover:scale-105 duration-200" on:click={() => {goto(`${data.url}`)}}>
                        <img src={product.feature_image} class="w-auto h-full" alt="">
                    </div>
                    <a href={data.url} class="max-w-full max-h-10 font-semibold flex justify-center text-center items-start overflow-hidden leading-5 group-hover:text-sky-500">{product.title}</a>
                    <!-- <p class="w-full flex font-semibold justify-center text-center">Rp. {product.affiliate[0].price}</p> -->
                </div>
            {/each}
            <div class="w-full flex justify-center absolute top-20">
                <p class="font-semibold group-hover:scale-110 duration-200 ease-in-out group-hover:text-sky-500">VS</p>
            </div>
        </div>
        <!-- <div class="w-full flex flex-col justify-center items-center">
            <p class="max-w-full font font-semibold flex justifi start items-center truncate">{dataProduct[0].title}</p>
            <p class="w-full font font-semibold flex justify-center items-center">VS</p>
            <p class="max-w-full font font-semibold flex justifi start items-center truncate">{dataProduct[1].title}</p>
        </div> -->
    </div>
</div>