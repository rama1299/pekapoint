<script>
    export let data
    $: dataProduct = data.product
</script>

<div>
    <div class="w-full h-[300px] overflow-hidden bg-white p-5 space-y-2 border-2 rounded-lg">
        <div class="w-full h-full flex justify-center items-center gap-1 relative group">
            {#each dataProduct as product}
                <div class="w-1/2 h-full space-y-2">
                    <div class="w-full aspect-square overflow-hidden flex justify-center items-end group-hover:scale-105 duration-200">
                        <img src={product.feature_image} class="w-auto h-full" alt="">
                    </div>
                    <p class="max-w-full max-h-10 font-semibold flex justify-center text-center items-start overflow-hidden leading-5 group-hover:text-sky-500">{product.title}</p>
                    <p class="w-full flex text-xl font-semibold justify-center text-center">$ 243</p>
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