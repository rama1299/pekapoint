<script>
    export let data
    $: dataProduct = data.product
</script>

<div>
    <div class="w-full overflow-hidden bg-white shadow-lg p-5 space-y-2 border-2 rounded-lg hover:border-sky-500 duration-100">
        <div class="w-full h-40 flex justify-center items-center gap-1 border-b-4 border-sky-500">
                <div class="w-3/4 h-full overflow-hidden">
                    <img src={dataProduct[0].feature_image} class="w-full h-auto" alt="">
                </div>
        </div>
        <div class="w-full flex flex-col justify-center items-center">
            <p class="max-w-full text-lg font font-semibold flex justifi start items-center truncate">{dataProduct[0].title}</p>
        </div>
    </div>
</div>