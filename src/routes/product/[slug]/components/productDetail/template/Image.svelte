<script>
    import Carousel from 'svelte-carousel'
    export let image

    let images = [
        image,
        'https://images.versus.io/objects/xiaomi-12s-ultra.front.medium.1657118136892.jpg',
        'https://images.versus.io/objects/xiaomi-mi-11-ultra.front.medium.1617056012430.jpg',
        'https://images.versus.io/objects/xiaomi-13t-pro.front.medium.1695764048871.jpg',
    ];

    let carousel;
    function goToStartPage(index) {
        carousel.goTo(index, { animated: true })
    }

    function goToPrevPage() {
    carousel.goToPrev({ animated: true })
    }

    function goToNextPage() {
        carousel.goToNext({ animated: true })
    }
</script>

<div class=" w-full flex gap-5 justify-start">
    <div class="w-full space-y-4">
        <div class="w-full aspect-square relative">
            <i class='bx bx-chevron-left z-10 lg:hidden absolute inset-y-0 left-0 text-5xl text-gray-500  cursor-pointer flex items-center h-full' on:click={goToPrevPage}></i>
            <i class='bx bx-chevron-right z-10 lg:hidden absolute inset-y-0 right-0 text-5xl text-gray-500  cursor-pointer flex items-center h-full' on:click={goToNextPage}></i>
            <Carousel arrows={false} dots={false} swiping={true} bind:this={carousel}>
                {#each images as image, i (i)}
                <div class="w-full aspect-square flex justify-center mx-auto  py-5 lg:py-10 relative bg-white lg:bg-gray-100 rounded-lg">
                    <img src={image} alt="" class="h-full w-auto rounded-3xl">
                </div>
                {/each}
            </Carousel>          
        </div>  
            <div class=" hidden w-full lg:grid grid-cols-4 gap-4">
                {#each images as image, i (i)}
                    <div key={i} class=" col-span-1 w-full aspect-square  bg-gray-100 rounded-lg flex py-5 justify-center items-center border-2 border-gray-100 hover:border-blue-500" on:click={() => { goToStartPage(i)}}>
                        <img src={image} alt="" class="h-full w-auto rounded-md">
                    </div>
                {/each}
            </div>
        </div>
</div>