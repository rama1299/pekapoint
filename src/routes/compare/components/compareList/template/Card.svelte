<script>
    export let data
    console.log(data)

    $: dataProduct = data.product
</script>

<div>
    <div class="w-full h-[268px] overflow-hidden bg-white shadow-lg p-2 space-y-2 group">
        <div class="w-full h-40 flex justify-center items-center gap-1 border-b-4 border-sky-500">
            {#each dataProduct as product}
                <div class="w-1/2 h-full overflow-hidden group-hover:scale-105 duration-100">
                    <img src={product.feature_image} class="w-full h-auto" alt="">
                </div>
            {/each}
        </div>
        <div class="w-full flex flex-col justify-center items-center">
            <p class="max-w-full text-lg font font-semibold flex justifi start items-center truncate">{dataProduct[0].title}</p>
            <p class="w-full text-lg font font-semibold flex justify-center items-center">VS</p>
            <p class="max-w-full text-lg font font-semibold flex justifi start items-center truncate">{dataProduct[1].title}</p>
        </div>
    </div>
</div>