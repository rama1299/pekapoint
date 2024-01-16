<script>
    import Card from './template/Card.svelte'
    import { goto } from '$app/navigation';
    import {afterUpdate} from 'svelte'
    export let data

    let widthContainerScroll
    let col = 4
    $: widthCol = widthContainerScroll / col

    afterUpdate(() => {
        if (widthContainerScroll > 766) {
            col = 4
        } else if (widthContainerScroll <= 766 && widthContainerScroll > 638) {
            col = 3
        } else if (widthContainerScroll <= 638) {
            col = 2
        }
    })

</script>

<div class="md:space-y-4 w-full">
    <div class="w-full flex justify-between items-end px-2 pb-2 md:pb-0">
        <p class="text-2xl md:text-3xl font-semibold">Most Viewed Comparison</p>

        <div class="hidden md:flex gap-2">
            <div class="md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2 cursor-pointer hover:border-sky-500">
                <i class='bx bx-chevron-left text-4xl'></i>
            </div>
            <div class="md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2 cursor-pointer hover:border-sky-500">
                <i class='bx bx-chevron-right text-4xl'></i>
            </div>
        </div>
    </div>
    <div bind:offsetWidth={widthContainerScroll} class="hidden-scroll w-full grid grid-flow-col overflow-scroll snap-x snap-mandatory">
        {#each data as item}
            <div style="width: {widthCol}px;" class="snap-start px-2 col-span-1 cursor-pointer" on:click={() => {goto(`http://localhost:5173${item.url}`)}}>
                <Card data={item}/>
            </div>
        {/each}
    </div>
    <div class="pt-4 md:pt-0 w-full flex justify-center">
        <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer">
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