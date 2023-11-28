<script>
    export let image
</script>

<div class=" w-full flex gap-5 justify-start">
    {#each Array(1) as _, i (i)}
        <div class="w-full space-y-4">
            <div class="w-full aspect-square flex justify-center mx-auto  py-5 lg:py-10 relative bg-white lg:bg-gray-100 rounded-lg">
                <i class='bx bx-chevron-left lg:hidden absolute inset-y-0 left-0 text-5xl text-gray-200 hover:text-blue-600 cursor-pointer flex items-center h-full'></i>
                <img src={image} alt="" class="h-full w-auto rounded-3xl">
                <i class='bx bx-chevron-right lg:hidden absolute inset-y-0 right-0 text-5xl text-gray-200 hover:text-blue-600 cursor-pointer flex items-center h-full'></i>
            </div>
            <div class=" hidden w-full lg:grid grid-cols-4 gap-4">
                {#each Array(4) as _, i (i)}
                    <div key={i} class=" col-span-1 w-full aspect-square  bg-gray-100 rounded-lg flex py-5 justify-center items-center border-2 border-gray-100 hover:border-blue-500">
                        <img src={image} alt="" class="h-full w-auto rounded-md">
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>