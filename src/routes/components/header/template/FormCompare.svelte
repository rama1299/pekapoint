<script>
	import { goto } from '$app/navigation';
    import { afterUpdate, onMount } from "svelte";
    export let data

    onMount(() => {
        document.addEventListener('click', handleOutSide);
    
        return () => {
        document.removeEventListener('click', handleOutSide);
        };
    })
    function addCompare() {
        if (compareLength < 4) {
            compareLength ++
        }
    }

    function removeCompare(i) {
        if (compareLength > 1) {
            value.splice(i, 1)
            valueSelect.splice(i, 1)
            optionData = null
            option = null
            compareLength --
        }
    }

    function handleOutSide(event) {
        let clicked = event.target
        let classList = clicked.classList

        if (classList[0] != 'option') {
            option = null
            optionData = null
        }
    
    }

    function handleInput(i) {
        valueSelect[i] = ''
        let titleInput = value[i];
        const filterData = data.filter((item) => new RegExp(titleInput, 'i').test(item.title));
        optionData = filterData.length === 0 ? [{title: 'Data not found'}] : filterData 
        option = i
    }

    function handleSelect(title, i) {
        value[i] = title
        valueSelect[i] = title
        option = null
        optionData = null
    }

    function handleCompare() {
        let valueSelectFilter = valueSelect.filter(Boolean)
        let filterDuplicateValue = [...new Set(valueSelectFilter)];
        if (filterDuplicateValue != 0) {
            let link = filterDuplicateValue.map(item => item.toLowerCase().replace(/\s+/g, '-')).join('-vs-');
    
            if (filterDuplicateValue.length <= 1) {
                goto(`/product/${link}`)
            } else {
                goto(`/compare/${link}`)
            }
        }
    }

    let compareLength = 1
    $: optionData = null
    $: option = null

    let value = []
    let valueSelect = []

</script>

<div class="w-full">
    <div class="w-full space-y-5 px-3 lg:px-0">
        <div class="flex w-full lg:w-[650px] mx-auto justify-center flex-col items-center gap-1">
            {#each Array(compareLength) as _, i (i)}
                {#if i > 0}
                     <p class="text-white font-medium">VS</p>
                {/if}
                <div class="w-full relative">
                    <div class="w-full bg-white rounded-full h-10 flex overflow-hidden hover border hover:border-black">
                        <input class="w-full h-full border-none focus:border-none ring-0 focus:ring-0 rounded-full bg-transparent" bind:value={value[i]} type="text" on:input={()=> {handleInput(i)}} placeholder='Find smartphone...'>
                        {#if compareLength > 1}
                             <div class=" w-10 h-full flex justify-center items-center cursor pointer hover:bg-red-600 group cursor-pointer" on:click={() => {removeCompare(i)}}>
                                 <i class='bx bx-x text-2xl group-hover:text-white'></i>
                             </div>
                        {/if}
                    </div>
                    {#if option == i && value[i].length > 2}
                         <div class="w-full max-h-72 border absolute bg-white divide-y-2 z-10 overflow-x-auto">
                            {#each optionData as item, index (index)}
                                <div class="option h-10 flex justify-start items-center group hover:bg-gray-50 px-2 cursor-pointer" on:click={() => {handleSelect(item.title, i)}}>
                                    <p class="font-medium group-hover:text-sky-500">{item.title}</p>
                                </div>
                            {/each}
                         </div>
                    {/if}
                </div>
            {/each}
        </div>
        <div class=" w-full lg:w-[650px] flex justify-center items-center gap-3 mx-auto">
            <button class="h-10 {compareLength == 4 ? 'w-full' : 'w-5/6'} bg-sky-500 rounded-full text-white font-medium border border-white hover:bg-sky-600" on:click={handleCompare}>{compareLength <= 1 ? 'Search' : 'Compare'}</button>
            {#if compareLength != 4}
                <button class="h-10 w-1/6 rounded-full bg-sky-500 text-xl text-white font-medium border border-white hover:bg-sky-600" on:click={addCompare}><i class='bx bx-plus text-xl' ></i></button>
            {/if}
        </div>
    </div>
</div>