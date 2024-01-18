<script>
    import Card from './template/Card.svelte'
    import { goto } from '$app/navigation';
    import {afterUpdate, onMount} from 'svelte'
    export let data

    $: data = data.slice(0,10)

onMount(() => {
    containerScroll.scrollTo({
        left: 0,
        behavior: 'smooth'
    })
})

let widthContainerScroll
$: col = 4
$: widthCol = widthContainerScroll / col
let containerScroll
$: currentCol = col

function handleNext() {
    if (currentCol < data.length - 1) {
        containerScroll.scrollTo({
        left: containerScroll.scrollLeft + widthCol,
        behavior: 'smooth'
        
    })
    currentCol += 1
    }
    
}

function handlePrev() {
    if (currentCol > col) {
        containerScroll.scrollTo({
            left: containerScroll.scrollLeft - widthCol,
            behavior: 'smooth'
            
        })
        currentCol -= 1
    }
}

afterUpdate(() => {
    
    if (widthContainerScroll > 1023) {
        col = 4;
    } else if (widthContainerScroll > 638) {
        col = 3;
    } else {
        col = 2;
    }

})

</script>

<div class="space-y-10 w-full px-2">
<div class="w-full flex justify-between items-end px-2">
    <p class="text-2xl font-semibold">Product Most Viewed</p>

    <div class="hidden lg:flex gap-2">
             <div class="{currentCol > col ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handlePrev}>
                 <i class='bx bx-chevron-left text-4xl'></i>
             </div>
             <div class="{currentCol < data.length - 1 ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handleNext}>
                 <i class='bx bx-chevron-right text-4xl'></i>
             </div>
    </div>
</div>
<div bind:this={containerScroll} bind:offsetWidth={widthContainerScroll} class="hidden-scroll w-full grid grid-flow-col overflow-scroll lg:overflow-hidden snap-x snap-mandatory">
    {#each data as item}
        <div style="width: {widthCol}px;" class="snap-start px-2 col-span-1 cursor-pointer" on:click={() => {goto(`http://localhost:5173${item.url}`)}}>
            <Card data={item}/>
        </div>
    {/each}
</div>
<div class="pt-4 md:pt-0 w-full flex justify-center">
    <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer" on:click={() => {goto(`/product`)}}>
        <p class="text-lg font-medium">See More</p>
    </div>
</div>
</div>

<style>
.hidden-scroll::-webkit-scrollbar{
    width: 0;
    display: none;
}

.hidden-scroll::-webkit-scrollbar-thumb{
    width: 0;
}
</style>