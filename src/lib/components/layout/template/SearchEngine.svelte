<script>
	import { goto } from '$app/navigation';
  import { afterUpdate } from "svelte";

    export let data

    $: data = data.filter(item => !selectedOptionCompare.includes(item.title));

    $: dataFilter = data.filter(item => new RegExp(valueInput, 'i').test(item.title))

    let dropDownType = false
    let valueInput = ''

    let selectedOptionIndex = null
    let currentColIndex = null
    let containerScroll
    $: selectedOptionCompare = []
    $: typeSearch = selectedOptionCompare.length > 0 ? 'compare' : 'product'

    function handleKeyInput(event) {
        let key = event.key

        if (key == 'ArrowDown' || key == 'ArrowUp' || key == 'ArrowRight' || key == 'ArrowLeft') {
            navOption(key)
        } else if (key == 'Enter') {
            handleEnter()
        } else {
            selectedOptionIndex = null
            currentColIndex = null
        }
        
    }

    function navOption(key) {
        if (key == 'ArrowDown' && valueInput.length > 0) {
            if (selectedOptionIndex == null) {
                selectedOptionIndex = 0
                currentColIndex = 0
            } else {
                if (selectedOptionIndex < dataFilter.length -1) {
                    selectedOptionIndex ++
                    if (currentColIndex < 7) {
                        currentColIndex ++
                    } else {
                        containerScroll.scrollTo({
                            top: containerScroll.scrollTop += 40,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        } else if (key == 'ArrowUp' && valueInput.length > 0) {
            if (selectedOptionIndex != null && selectedOptionIndex > 0) {
                selectedOptionIndex --
                if (currentColIndex > 0) {
                    currentColIndex --
                } else {
                    containerScroll.scrollTo({
                        top: containerScroll.scrollTop -= 40,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }

    function handleSelect(title) {
        if (typeSearch == 'product') {
            handleProductSearch(title)
        } else if (typeSearch == 'compare') {
            selectedOptionCompare = [...selectedOptionCompare, title]
            resetValue()
        }
    }

    function handleEnter() {
        if (selectedOptionIndex == null && currentColIndex == null) {
            handleProductUnoptionSearch(valueInput)
        } else {
            if (typeSearch == 'product') {
                let title = dataFilter[selectedOptionIndex].title
                handleProductSearch(title)
            } else if (typeSearch == 'compare') {
                selectedOptionCompare = [...selectedOptionCompare, dataFilter[selectedOptionIndex].title]
            }
        }
    }

    function addCompare(title) {
        selectedOptionCompare = [...selectedOptionCompare, title]
        resetValue()

    }

    function removeCompareSelected(titleRemove) {
        let filterArray = selectedOptionCompare.filter((title) => title != titleRemove)
        selectedOptionCompare = filterArray
    }

    function resetValue() {
        valueInput = ''
        selectedOptionIndex = null
        currentColIndex = null
    }


    function handleCompare() {
        let link = selectedOptionCompare.map(item => item.toLowerCase().replace(/\s+/g, '-')).join('-vs-')
        
        if (selectedOptionCompare.length > 1) {
            goto(`/compare/${link}`)
        } else {
            goto(`/product/${link}`)
        }
    }

    function handleProductUnoptionSearch(type) {
        if (type) {
            const slug = type.replace(/\s+/g, '-').toLowerCase()
            goto(`/product?search=${slug}`)
            resetValue()
        }
    }

    function handleProductSearch(title) {
        let slug = title.toLowerCase().replace(/\s+/g, '-')
        goto(`/product/${slug}`)
        resetValue()
    }

    afterUpdate(() => {
    })
</script>

<div class="w-full h-40">
    <div class="mx-auto flex justify-center items-center">
        <div class="w-5/6 lg:w-1/2 h-9 lg:h-12 bg-white rounded-lg relative">
            <div class="w-full h-full flex justify-between items-center">
                <div class="h-full aspect-square flex justify-center items-center rounded-l-lg">
                    <i class='bx bx-search text-xl'></i>
                </div>
                <div class="h-full w-full">
                    <input class="w-full h-full flex justify-start items-center font-medium pl-0 pr-3 border-none bg-transparent focus:border-none focus:ring-0 ring-0" placeholder="Search..." type="text" bind:value={valueInput} on:keydown={handleKeyInput}>
                </div>
                {#if valueInput.length > 0}
                     <div class="h-full aspect-square flex justify-center items-center group cursor-pointer" on:click={resetValue}>
                         <i class='bx bx-x text-2xl text-black group-hover:text-red-500'></i>
                     </div>
                {/if}
            </div>
            {#if valueInput.length > 0 && dataFilter.length > 0}
                 <div class="w-full max-h-60 lg:max-h-80 bg-white overflow-auto lg:overflow-hidden snap-y snap-mandatory rounded-lg absolute top-11 lg:top-14 left-0"
                 tabindex="0"
                 bind:this={containerScroll}>
                     {#each dataFilter as item, i}
                         <div class="{selectedOptionIndex == i ? 'bg-gray-200' : ''} w-full h-10 border hover:bg-gray-200 flex justify-between items-center px-3 snap-start"
                         tabindex="0"
                         on:click={() => {handleSelect(item.title)}}
                         id="idOption{i}"
                         >
                             <p class="w-full h-full truncate flex items-center">{item.title}</p>
                             <div class="h-full aspect-square group cursor-pointer flex justify-end items-center" on:click={addCompare(item.title)}>
                                <div class="h-6 aspect-square flex justify-center items-center rounded-md border-2 border-sky-500 group-hover:bg-sky-500">
                                    <i class='bx bx-plus text-xl text-sky-500 group-hover:text-white' ></i>
                                </div>
                             </div>
                         </div>
                     {/each}
                 </div>
            {/if}
            {#if typeSearch == 'compare'}
                <div class="w-full mt-2 space-y-2">
                    <div class="w-full flex justify-start items-center gap-2 flex-wrap">
                        {#each selectedOptionCompare as title, i}
                            <div class="max-w-[208px] border h-8 flex justify-between gap-2 pr-1 pl-2 items-center rounded-md bg-white/20">
                                <p class="w-full truncate text-white align-middle text-sm">{title}</p>
                                <div on:click={() => {removeCompareSelected(title)}}>
                                    <i class='bx bx-x text-xl text-white hover:text-red-500 cursor-pointer'></i>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <div class="h-9 w-36 bg-sky-500 rounded-lg flex justify-center items-center gap-2 text-white font-medium border-2 border-sky-500 hover:bg-white hover:text-sky-500 cursor-pointer duration-100"
                        on:click={handleCompare}>
                            <p>Compare</p>
                            <p>{`(${selectedOptionCompare.length}/4)`}</p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>