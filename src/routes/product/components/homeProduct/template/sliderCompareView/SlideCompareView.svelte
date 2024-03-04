<script>
    import Card from './template/Card.svelte'
    import { goto } from '$app/navigation';
    import {afterUpdate, onMount} from 'svelte'
    export let data
    import { Translate } from '../../.././../../../helpers/translate.js';

    export let title
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
        col = 4;
    } else if (widthContainerScroll > 638 && widthContainerScroll < 872) {
        col = 3;
    } else if (widthContainerScroll < 638) {
        col = 1;
    }

})

</script>

<div class="space-y-5 w-full">
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1 relative">
        <p class="font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{title}</p>
        <div class="flex justify-center items-center text-2xl">
            <i class='bx bx-chevron-left' on:click={handlePrev}></i>
            <i class='bx bx-chevron-right' on:click={handleNext}></i>
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

.tag {
        clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
    }
</style>