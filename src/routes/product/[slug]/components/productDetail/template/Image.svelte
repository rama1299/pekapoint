<script>
    import Carousel from 'svelte-carousel'
    import {onMount} from 'svelte'
    export let image

    onMount(async() => {
        containerScroll.scrollTo({
            left: 0
        })

        try {
            if (image.length > 0) {
                images = JSON.parse(image)
            } else {
                images = ['images/placeholder.png', 'images/placeholder.png', 'images/placeholder.png', 'images/placeholder.png',]
            }
        } catch (error) {
            images = ['images/placeholder.png', 'images/placeholder.png', 'images/placeholder.png', 'images/placeholder.png',]
        }

    })

    let images = []

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

    let widthContainerImage
    let containerScroll
    $: widthColImage = widthContainerImage / 4

function nextSlide() {
    containerScroll.scrollTo({
        left: containerScroll.scrollLeft + widthColImage,
        behavior: 'smooth'
    });
}

function prevSlide() {
    containerScroll.scrollTo({
        left: containerScroll.scrollLeft - widthColImage,
        behavior: 'smooth'
    });
}

</script>

<div class=" w-full flex gap-5 justify-start">
    <div class="w-full space-y-4">
        <div class="w-full aspect-square relative">
            <i class='bx bx-chevron-left z-10 lg:hidden absolute inset-y-0 left-0 text-5xl text-gray-500  cursor-pointer flex items-center h-full' on:click={goToPrevPage}></i>
            <i class='bx bx-chevron-right z-10 lg:hidden absolute inset-y-0 right-0 text-5xl text-gray-500  cursor-pointer flex items-center h-full' on:click={goToNextPage}></i>
            <Carousel arrows={false} dots={false} swiping={true} bind:this={carousel}>
                {#each images as image, i (i)}
                    <div class="w-full aspect-square flex justify-center mx-auto py-5 lg:py-10 md:px-10 lg:px-0 relative bg-white overflow-hidden">
                        <img src={`../${image}`} alt="" class="h-full w-auto">
                    </div>
                {/each}
            </Carousel>          
        </div>
        <div class="hidden lg:flex w-full" style="height: {widthColImage}px;">
            <div class="py-2">
                <div on:click={prevSlide} class="w-7 h-full cursor-pointer group flex justify-start items-center"><i class='bx bx-chevron-left group-hover:text-black text-gray-500 active:text-sky-500 text-4xl'></i></div>
            </div>
            <div class=" hidden w-full lg:grid grid-flow-col overflow-x-auto snap-mandatory snap-x hidden-scroll" bind:offsetWidth={widthContainerImage} bind:this={containerScroll}>
                {#each images as image, i (i)}
                    <div key={i} style="width: {widthColImage}px;" class=" col-span-1 w-full aspect-square snap-start rounded-lg p-2 flex justify-center images-center" on:click={() => { goToStartPage(i)}}>
                        <div class="border bg-gray-100 border-2 border-gray-200 hover:border-sky-500 w-full h-full rounded-xl flex justify-center items-center overflow-hidden">
                            <img src={`../${image}`} alt="" class="h-full w-auto ">
                        </div>
                    </div>
                {/each}
            </div>
            <div class="py-2">
                <div on:click={nextSlide} class="w-7 h-full cursor-pointer group flex justify-start items-center"><i class='bx bx-chevron-right group-hover:text-black text-gray-500 active:text-sky-500 text-4xl'></i></div>
            </div>
        </div>
    </div>
</div>

<style>
    .hidden-scroll::-webkit-scrollbar {
        width: 0;
    }

    .hidden-scroll::-webkit-scrollbar {
        display: none;
    }
</style>