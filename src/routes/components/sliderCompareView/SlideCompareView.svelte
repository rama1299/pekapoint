<script>
    import Card from './template/Card.svelte'
    import { goto } from '$app/navigation';
    import {afterUpdate, onMount} from 'svelte'
    export let data
    import { Translate } from '../../../helpers/translate';

    let text = ['Most Viewed Comparison', 'Explore our most viewed comparison chart featuring top-rated products.', "Slide", 'See All']

    onMount(async() => {
    const textTranslate = await Translate.client(text)
    text = textTranslate

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
    
    if (widthContainerScroll > 872) {
        col = 3;
    } else if (widthContainerScroll > 638) {
        col = 2;
    } else {
        col = 1;
    }

})

</script>

<div class="space-y-10 w-full px-2">
    <div class="w-full flex justify-center">
        <div class="w-full text-center space-y-3">
            <p class="text-2xl font-bold">{text[0]}</p>
            <p>{text[1]}</p>
        </div>
    </div>
    <div class="w-full hidden lg:flex justify-end">
        <div class="hidden lg:flex gap-2">
            <div class="{currentCol > col ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handlePrev}>
                <i class='bx bx-chevron-left text-4xl'></i>
            </div>
            <div class="{currentCol < data.length - 1 ? 'hover:border-sky-500 cursor-pointer' : 'opacity-50'} md:w-10 lg:w-12 aspec-square bg-white rounded-md flex justify-center items-center border-2" on:click={handleNext}>
                <i class='bx bx-chevron-right text-4xl'></i>
            </div>
        </div>
    </div>
    <div class="space-y-2">
        <div bind:this={containerScroll} bind:offsetWidth={widthContainerScroll} class="hidden-scroll w-full grid grid-flow-col overflow-scroll lg:overflow-hidden snap-x snap-mandatory">
            {#each data as item}
                <div style="width: {widthCol}px;" class="snap-start px-2 col-span-1 cursor-pointer" on:click={() => {goto(`${item.url}`)}}>
                    <Card data={item}/>
                </div>
            {/each}
        </div>
        <div class="w-full lg:hidden flex justify-center gap-2 text-sky-500 items-center">
            <i class='bx bx-chevrons-left'></i>
            <p>{text[2]}</p>
            <i class='bx bx-chevrons-right'></i>
        </div>
    </div>
    <div class="pt-4 md:pt-0 w-full flex justify-center">
        <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer" on:click={() => {goto(`/product`)}}>
            <p class="text-lg font-medium">{text[3]}</p>
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