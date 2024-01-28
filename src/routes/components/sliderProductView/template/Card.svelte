<script>
    export let data
    $: dataProduct = data.product
</script>

<!-- <div>
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
</div> -->

<div class="w-full col-span-1 border-2 rounded-lg p-5 bg-white">
    <div class="w-full h-full flex md:flex-col justify-between gap-3 cursor-pointer group">
        <div class="w-full h-32 lg:h-52 flex justify-center">
            <img src={dataProduct[0].feature_image} alt="" class="h-full group-hover:scale-105 duration-200">
        </div>
        <div class="w-full space-y-3">
            <div>
                <p class="w-full text-start font-semibold leading-5 h-10 overflow-hidden group-hover:text-sky-500 duration-100">{dataProduct[0].title}</p>
            </div>
            <div class="w-full flex flex-col-reverse gap-1 md:flex-row md:justify-between items-start">
                <div class="space-y-1 w-full">
                    <div class="flex gap-2 items-center">
                        <i class='bx bxs-star text-sky-500'></i>
                        <p class="font-semibold">4.5</p>
                    </div>
                    <div class="flex w-full justify-between items-end">
                        <div class="leading-3">
                            <p class="font-medium text-sm">From</p>
                            <p class="font-semibold text-xl">$ 724</p>
                        </div>
                        <button class="w-7 md:w-9 rounded-md bg-sky-500 hover:bg-white aspect-square border border-sky-500 duration-100 text-white hover:text-sky-500 flex items-center justify-center">
                            <i class='bx bx-right-arrow-alt text-xl' ></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>