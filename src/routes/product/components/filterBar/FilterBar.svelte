<script>
	import { FetchProduct } from './../../../../modules/fetchProduct.js';
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';
    import { afterUpdate, onMount } from "svelte";
    import { isFilterProduct } from "../../../../stores";
    import {readablestreamToJson} from "../../../../helpers/readablestreamToJson"
    import { createEventDispatcher } from 'svelte';
  import { Translate } from '../../../../helpers/translate.js';

    const dispatch = createEventDispatcher();
    let text = ['Brand', 'Filter', 'Reset', 'OK']
    
    onMount(async () => {
        let translate = await Translate.client(text)
        text = translate

        async function fetchBrand() {
            const response = await FetchProduct.getBrandProducts()
            if (response && response.status == 200) {

                let data = response.data


                data = data.map((item, i) => {
                    return {
                        id : i+1,
                        ...item,
                        selected: false
                    }
                })

                dataFilterObject = dataFilter.map((filter) => {
                    let [key, value] = filter.split('=')
                    let valueArray = value.split(',')
                    return {
                        title : key,
                        value : valueArray
                    }
                })

                if (dataFilterObject.length > 0) {
                    let checkSelectedBrand = data.map((dataBrand) => {
                        let findBrand = dataFilterObject.find(data => data.title == 'brand')
                        return {
                            ...dataBrand,
                            selected: findBrand.value.includes(dataBrand.brand)
                        }
                    })
                    
                    brand = checkSelectedBrand
                    let findDataBrand = dataFilterObject.find(data => data.title == 'brand')
                    if (findDataBrand) {
                        selectedBrand = findDataBrand.value
                    }
                    let findDataRam = dataFilterObject.find(data => data.title == 'ram')
                    if(findDataRam) {
                        selectedRam = findDataRam.value
                    }
                } else {
                    brand = data
                }
            } else {
                console.log('fetch brand failed')
            }
            
        }
        
        fetchBrand()
        
        document.addEventListener('click', handleOutSide);
        
        return () => {
            document.removeEventListener('click', handleOutSide);
        };
    });

    $: dataFilter = $page.url.searchParams.getAll('filter')
    
    let filterToggle = {
        isBrand: false,
        isPrice: false,
        isRam: false,
        isStorage: false
    }

    
    $: brand = []
    $: dataFilterObject = []
    $: selectedBrand = []
    
    let listRam = ['1', '1.5', '2', '3', '4', '6', '8', '10', '12', '16', '18', '24']
    $: selectedRam = []
    
    function handleOutSide(event) {
        const container = document.getElementById('containerFilter')
        if (container && !container.contains(event.target)) {
            close()
        }
    }

    function parsingQueryUrlFilter() {
        let queryFilter = $page.url.searchParams.getAll('filter')
        if (queryFilter.length > 0) {
            return queryFilter.map((filter) => {
                let [key, value] = filter.split('=')
                        if (value) {
                            let arrayValue = value.split(',')
                            return {
                                title: key,
                                value : arrayValue,}
                        } else {
                            return undefined
                        }
            }).filter(Boolean)
        } else {
            return []
        }
    }

    function handleSelectRam(ram) {
        let queryFilterObj = parsingQueryUrlFilter()
        let arrayFilterBrand = queryFilterObj.find((filter) => filter.title == 'brand')
        let queryFilterBrand

        if (arrayFilterBrand) {
            queryFilterBrand = `filter=brand%3D${arrayFilterBrand.value.join(',')}`
        } else {
            queryFilterBrand = ''
        }

        let arrayFilterRam = queryFilterObj.find((filter) => filter.title == 'ram')
        let queryFilterRam

        if (arrayFilterRam) {
            queryFilterRam = `filter=ram%3D${arrayFilterRam.value.join(',')}`
        } else {
            queryFilterRam = ''
        }

        if (!selectedRam.includes(ram)) {
            selectedRam = [...selectedRam, ram]
            if (queryFilterBrand) {
                    goto(`/product?${queryFilterBrand}&filter=ram%3D${selectedRam.join(',')}`)
                } else {
                    goto(`/product?filter=ram%3D${selectedRam.join(',')}`)
                }
        } else {
            selectedRam = selectedRam.filter((selectRam) => selectRam != ram )
            if (selectedRam.length > 0) {
                if (queryFilterBrand) {
                    goto(`/product?${queryFilterBrand}&filter=ram%3D${selectedRam.join(',')}`)
                } else {
                    goto(`/product?filter=ram%3D${selectedRam.join(',')}`)
                }
            } else {
                if (queryFilterBrand) {
                    goto(`/product?${queryFilterBrand}`)
                } else {
                    goto(`/product?search=`)
                }
            }
        }

        close()
    }

    function handleToggle(filterName) {

        if (filterToggle[filterName]) {
            filterToggle[filterName] = !filterToggle[filterName];
        } else {
            for (const key in filterToggle) {
                    filterToggle[key] = key === filterName;
                }
        }
    }

    function handleToggleMobile() {
        isFilterProduct.set(false)
    }

    // function handleSortToggle() {
    //     sortToggle = !sortToggle
    // }

    function eventDispatch() {
        let isFilter = selectedBrand.length > 0 ? true : false

        dispatch('eventFromFilter', {isFilter})
    }

    function handleSelect() {
        selectedBrand = brand.filter((item) => item.selected).map(item => item.brand)
        brand = brand.map((dataBrand) => {
            return {
                ...dataBrand,
                selected: selectedBrand.includes(dataBrand.brand)
            }
        })

        let queryFilterObj = parsingQueryUrlFilter()
        let arrayFilterBrand = queryFilterObj.find((filter) => filter.title == 'brand')
        let queryFilterBrand

        if (arrayFilterBrand) {
            queryFilterBrand = `filter=brand%3D${arrayFilterBrand.value.join(',')}`
        } else {
            queryFilterBrand = ''
        }

        let arrayFilterRam = queryFilterObj.find((filter) => filter.title == 'ram')
        let queryFilterRam

        if (arrayFilterRam) {
            queryFilterRam = `filter=ram%3D${arrayFilterRam.value.join(',')}`
        } else {
            queryFilterRam = ''
        }

        if (selectedBrand.length > 0) {
            if (queryFilterRam) {
                goto(`/product?filter=brand%3D${selectedBrand.join(',')}&${queryFilterRam}`)
            } else {
                goto(`/product?filter=brand%3D${selectedBrand.join(',')}`)
            }
        } else {
            if (queryFilterRam) {
                goto(`/product?${queryFilterRam}`)
            } else {
                goto(`/product?search=`)
            }
        }
    }

    function removeBrandTag(title) {
        selectedBrand = selectedBrand.filter((titleSelect) => titleSelect != title)
        brand = brand.map((dataBrand) => {
            return {
                ...dataBrand,
                selected: selectedBrand.includes(dataBrand.brand)
            }
        })
        handleSelect()
    }

    function clearAll() {
    brand = brand.map((item) => {
        return {
            ...item,
            selected: false
        }
    })
    selectedBrand = []
    selectedRam = []
    goto(`/product?search=`)
  }

  function close() {
    filterToggle = {
        isBrand: false,
        isPrice: false,
        isRam: false,
        isStorage: false
    }
  }

  afterUpdate(() => {
    eventDispatch()
  })
   
</script>
<!-- dekstop -->
<!-- <div class="space-y-2">
    <div id="containerFilter" class="w-full hidden lg:flex justify-between items-center h-12">
        <div class="flex items-center gap-5 h-full">
        <p class="font-semibold text-xl">Filter</p>
        <div class="flex justify-start gap-5 h-full items-center font-medium text-black relative ">
            <div class="h-full" on:keypress={() => {handleToggle('isBrand')}} on:click={() => {handleToggle('isBrand')}} >
                <button class="w-36 bg-white h-full border rounded-md flex justify-between items-center px-2">
                    <div>{text[0]}</div>
                    <div class="flex items-center">
                        {#if selectedBrand.length > 0}
                             <p class="text-gray-600">{`(${selectedBrand.length})`}</p>
                        {/if}
                        <i class='bx bx-chevron-{filterToggle.isBrand ? 'up' : 'down'} text-lg'></i>
                    </div>
                </button>
            </div> -->
    
            <!-- {#if filterToggle.isBrand}
                <div id="dropdownBrand" class="w-[500px] h-auto bg-white absolute top-12 left-0 rounded-md border z-10 p-6">
                    <div class="grid grid-cols-3 gap-x-6 gap-y-1 max-h-[310px] overflow-auto">
                        {#each brand as data (data.id)}
                             <div class="w-full h-auto flex justify-start">
                                 <div class="flex justify-center gap-x-3 items-center">
                                    <input class="w-5 h-5 ring-0 focus:ring-0 cursor-pointer hover:bg-gray-300 rounded-md bg-gray-100" type="checkbox" bind:checked={data.selected} id={"checkbox" + data.id} on:change={handleSelect}>
                                    <label for={"checkbox" + data.id}>{data.brand}</label>
                                 </div>
                             </div>
                        {/each}
                    </div> -->
                    <!-- <div class="w-auto flex justify-center gap-4 mt-6">
                        <button class="w-28 h-8 border rounded-lg bg-gray-200 hover:bg-gray-300" on:click={clearAll}>{text[2]}</button>
                        <button class="w-28 h-8 border rounded-lg bg-sky-500 hover:bg-sky-600 text-white" on:click={close}>{text[3]}</button>
                    </div> -->
                <!-- </div>
            {/if}
        </div> -->
    
        <!-- <div class="flex justify-start gap-5 h-full items-center font-medium text-black relative">
            <div class="h-full" on:keypress={() => {handleToggle('isRam')}} on:click={() => {handleToggle('isRam')}} >
                <button class="w-36 bg-white h-full border rounded-md flex justify-between items-center px-2">
                    <div>RAM</div>
                    <div class="flex items-center">
                        {#if selectedRam.length > 0}
                             <p class="text-gray-600">{`(${selectedRam.length})`}</p>
                        {/if}
                        <i class='bx bx-chevron-{filterToggle.isRam ? 'up' : 'down'} text-lg'></i>
                    </div>
                </button>
            </div>
    
            {#if filterToggle.isRam}
                <div id="dropdownBrand" class="w-36 h-auto bg-white absolute top-12 left-0 rounded-md border z-10">
                    <div class="grid grid-flow-row overflow-auto h-[250px]">
                        {#each listRam as data}
                            <div class="w-full flex justify-end items-center h-9 px-3 {selectedRam.includes(data) ? 'text-sky-500' : ''} hover:bg-gray-100 cursor-pointer" on:click={() => {handleSelectRam(data)}}>
                                <p>{data + ' GB'}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
        </div>
        
        <div class="flex justify-start h-full items-center font-medium">
            <div class="h-full" on:click={clearAll}>
                <button class="w-36 bg-white h-full border rounded-md flex justify-center items-center px-2 ">
                    <p class="text-lg ">Reset</p>
                </button>
            </div>
        </div>
    </div>
     -->
    <!-- {#if selectedBrand.length > 0 || selectedRam.length > 0}
        <div class="w-full flex flex-wrap gap-3">
            {#each selectedBrand as brand}
                <div class="justify-between flex items-center px-3 h-8 lg:h-10 bg-sky-500/50 border-2 gap-5 border-sky-500 font medium text-white rounded-md" on:click={() => {removeBrandTag(brand)}}>
                    <p class="captalize">{brand}</p>
                    <i class='bx bx-x text-2xl hover:text-red-500 cursor-pointer'></i>
                </div>
            {/each}
            {#each selectedRam as ram}
                <div class="justify-between flex items-center px-3 h-8 lg:h-10 bg-pink-500/50 border-2 gap-5 border-pink-500 font medium text-white rounded-md" on:click={() => {handleSelectRam(ram)}}>
                    <p class="captalize">{ram} GB</p>
                    <i class='bx bx-x text-2xl hover:text-red-500 cursor-pointer'></i>
                </div>
            {/each}
        </div>
    {/if}
</div> -->


<div class="w-full h-full text-sekunder-950 hidden lg:flex">
    <div class="bg-sekunder-50 w-full h-full rounded-lg p-4 space-y-2">
        <div class="w-full flex justify-between items-center">
            <p class="font-semibold">Filter</p>
            <p class="font-semibold hover:text-sekunder-950 cursor-pointer border bg-sekunder-950 text-white hover:bg-primary-500 border-sekunder-950 px-1 rounded-md" on:click={clearAll}>{text[2]}</p>
        </div>
    <div class="h-5/6 overflow-y-auto scroll w-full space-y-4">
        <div>
            <div class="w-full space-y-3">
                <div class="w-full h-auto bg-white rounded-lg p-2 border border-sekunder-300">
                    <p class="font-semibold">{text[0]}</p>
                    <div class="max-h-48 w-full overflow-auto scroll space-y-1">
                        {#each brand as data (data.id)}
                            <div class="w-full h-auto flex justify-start px-2 text-sm">
                                <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md hover:bg-sekunder-50" type="checkbox" bind:checked={data.selected} id={"checkbox" + data.id} on:change={handleSelect}>
                                <label for={"checkbox" + data.id}>{data.brand}</label>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="w-full h-auto bg-white rounded-lg p-2 border border-sekunder-300">
                    <p class="font-semibold">RAM</p>
                    <div class="max-h-48 w-full overflow-auto scroll">
                        {#each listRam as data}
                            <div class="w-full text-sm h-8 border-b flex justify-start items-center px-2 cursor-pointer hover:bg-sekunder-50 {selectedRam.includes(data) ? 'text-sky-500' : ''}" on:click={() => {handleSelectRam(data)}}>
                                <p>{data + ' GB'}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<!-- mobile -->
{#if $isFilterProduct}
<div class="w-full h-screen bg-sekunder-950/50 absolute lg:hidden">
    <div class="absolute top-2 right-2 w-8 aspect-square flex justify-center items-center rounded-full bg-white" on:click={handleToggleMobile}>
        <i class='bx bx-x text-2xl text-accent-red-600'></i>
    </div>
    <div class="w-[60%] md:w-[40%] lg:w-full h-screen text-sekunder-950">
        <div class="bg-sekunder-50 w-full h-full rounded-lg p-4 space-y-2">
            <div class="w-full flex justify-between items-center">
                <p class="font-semibold">Filter</p>
                <p class="font-semibold hover:text-sekunder-950 cursor-pointer border bg-sekunder-950 text-white hover:bg-primary-500 border-sekunder-950 px-1 rounded-md" on:click={clearAll}>{text[2]}</p>
            </div>
        <div class="h-5/6 overflow-y-auto scroll w-full space-y-4">
            <div>
                <div class="w-full space-y-3">
                    <div class="w-full h-auto bg-white rounded-lg p-2 border border-sekunder-300">
                        <p class="font-semibold">{text[0]}</p>
                        <div class="max-h-48 w-full overflow-auto scroll space-y-1">
                            {#each brand as data (data.id)}
                                <div class="w-full h-auto flex justify-start px-2 text-sm">
                                    <div class="flex justify-center gap-x-2 items-center">
                                    <input class="ring-0 focus:ring-0 rounded-md hover:bg-sekunder-50" type="checkbox" bind:checked={data.selected} id={"checkbox" + data.id} on:change={handleSelect}>
                                    <label for={"checkbox" + data.id}>{data.brand}</label>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="w-full h-auto bg-white rounded-lg p-2 border border-sekunder-300">
                        <p class="font-semibold">RAM</p>
                        <div class="max-h-48 w-full overflow-auto scroll">
                            {#each listRam as data}
                                <div class="w-full text-sm h-8 border-b flex justify-start items-center px-2 cursor-pointer hover:bg-sekunder-50 {selectedRam.includes(data) ? 'text-sky-500' : ''}" on:click={() => {handleSelectRam(data)}}>
                                    <p>{data + ' GB'}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
{/if}



<style>

    .scroll::-webkit-scrollbar {
    width: 10px;
    }

    .scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
    }

    .scroll::-webkit-scrollbar-thumb {
    background: #b6b6b6;
    border-radius: 5px;
    }

    .scroll::-webkit-scrollbar-thumb:hover {
    background: #b6b6b6;
    }

</style>