<script>
    import { afterUpdate, onMount } from 'svelte';
    import ImageCard from './template/ImageCard.svelte';
    import { enableDataToCompare } from '../../../../../stores';
    import Affiliate from './template/Affiliate.svelte';

    export let data
    $: datas = data.map((item) => {
        return {
            ...item,
            enable: true
        }
    })
    let currentIndex = 0;
    let scrollContainer;

    let colorBorder = ['border-blue-500', 'border-pink-500', 'border-orange-500', 'border-teal-500']
    let colorRadar = ['rgb(52, 152, 219, 0.4)', 'rgb(233, 30, 99, 0.4)', 'rgb(255, 152, 0, 0.4)', 'rgb(0, 150, 136, 0.4)']

    onMount(() => {
        if (width <= 942 && datas.length == 2) {
            hiddenButton = 'lg:hidden'
        } else if (width > 942 && datas.length <= 3) {
            hiddenButton = 'lg:hidden'
        } else {
            hiddenButton = ''
        }
    })

    let width
    afterUpdate(() => {
        if (width <= 942 || datas.length == 2) {
            widthCol = width / 2
        } else {
            widthCol = width / 3
        }
    })
    let widthCol
    $: widthCol = widthCol

    let hiddenButton
  
    const nextSlide = () => {
        if (width <= 942) {
            currentIndex = Math.min(currentIndex + 1, datas.length - 2); // Batas maksimum indeks
            updateScrollPosition();
        } else {
            currentIndex = Math.min(currentIndex + 1, datas.length - 3); // Batas maksimum indeks
            updateScrollPosition();
        }
    };
  
    const prevSlide = () => {
      currentIndex = Math.max(currentIndex - 1, 0); // Batas minimum indeks
      updateScrollPosition();
    };
  
    const updateScrollPosition = () => {
      const newScrollPosition = currentIndex * widthCol; // Lebar div
      scrollContainer.scrollLeft = newScrollPosition;
    };

  </script>
    
  <div class="space-y-3">
    <div bind:this={scrollContainer} bind:offsetWidth={width} class="w-full scrollbar-hidden divide-x-2 divide-gray-300 grid grid-flow-col snap-x snap-mandatory overflow-x-scroll scroll-smooth duration-100">
        {#each datas as item, i (i)}
            <div class=" snap-start space-y-5" style="width: {widthCol}px;">
                <ImageCard item={item} datasLength={datas.length} color={colorBorder[i]} radarColor={colorRadar[i]}/>
                <div class="w-full px-3 lg:px-5 space-y-3">
                    <Affiliate/>
                    <Affiliate/>
                </div>
            </div>
        {/each}
    </div>
    {#if datas.length > 2}
         <div class="w-full flex justify-end items-center gap-2 {hiddenButton}">
                  <div class="flex text-3xl lg:text-4xl cursor-pointer justify-center rounded-md font-medium items-center border-2 border-gray-200 bg-gray-100" on:click={prevSlide}>
                      <i class='bx bx-chevron-left'></i>
                  </div>
                  <div class="flex text-3xl lg:text-4xl cursor-pointer justify-center rounded-md font-medium items-center border-2 border-gray-200 bg-gray-100" on:click={nextSlide}>
                      <i class='bx bx-chevron-right'></i>
                  </div>
         </div>
    {/if}
  </div>
  
  <style>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
  </style>