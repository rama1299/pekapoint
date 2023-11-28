<script>
    import { onMount } from "svelte";
    import { isFilterProduct } from "../../../../stores";
        
    let filterToggle = {
        isBrand: false,
        isPrice: false,
        isRam: false,
        isStorage: false
    }
    
    let sortToggle = false
    let ram = 8
    let storage = 64
    
    onMount(() => {
        document.addEventListener('click', handleOutSide);
    
        return () => {
        document.removeEventListener('click', handleOutSide);
        };
    });
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

    function handleSortToggle() {
        sortToggle = !sortToggle
    }

    function handleOutSide(event) {
        const btn = document.getElementById('btn')
        const dropdownFilter = document.getElementById('dropdownFilter')
        
        if(!dropdownFilter.contains(event.target) && !btn.contains(event.target)) {
            filterToggle = {
                isBrand: false,
                isPrice: false,
                isRam: false,
                isStorage: false
            }
            sortToggle = false
        }
    }


</script>

<div id="btn" class="w-full hidden lg:flex justify-between">
    <div class="flex justify-start gap-5 w-2/3 items-center font-medium text-black relative">
        <p class="font-semibold">Filter</p>
        <div class="" on:keypress={() => {handleToggle('isBrand')}} on:click={() => {handleToggle('isBrand')}} >
            <button class="w-32 bg-white h-8 border rounded-md flex justify-between items-center px-2">Brand
                <i class='bx bx-chevron-down text-lg'></i>
            </button>
        </div>
        <div class="" on:keypress={() => {handleToggle('isPrice')}} on:click={() => {handleToggle('isPrice')}}>
            <button class="w-32 bg-white h-8 border rounded-md flex justify-between items-center px-2">Price
                <i class='bx bx-chevron-down text-lg'></i>
            </button>
        </div>
        <div class="" on:keypress={() => {handleToggle('isRam')}} on:click={() => {handleToggle('isRam')}}>
            <button  class="w-32 bg-white h-8 border rounded-md flex justify-between items-center px-2">RAM
                <i class='bx bx-chevron-down text-lg'></i>
            </button>
        </div>
        <div class="" on:keypress={() => {handleToggle('isStorage')}} on:click={() => {handleToggle('isStorage')}}>
            <button class="w-32 bg-white h-8 border rounded-md flex justify-between items-center px-2">Storage
                <i class='bx bx-chevron-down text-lg'></i>
            </button>
        </div>
        
        {#if filterToggle.isBrand}
            <div id="dropdownFilter" class="w-auto h-auto bg-white absolute top-9 left-16 rounded-md border z-10 p-6">
                <div class="grid grid-cols-3 gap-x-6 gap-y-1">
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Xioami</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Samsung</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Apple</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Oppo</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Vivo</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Microsoft</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Asus</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Sony</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Huawei</label>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-start">
                        <div class="flex justify-center gap-x-2 items-center">
                            <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                            <label for="">Infinix</label>
                        </div>
                    </div>
                </div>
            <div class="w-auto flex justify-center gap-4 mt-6">
                <button class="w-28 h-8 border rounded-lg bg-gray-200">Clear All</button>
                <button class="w-28 h-8 border rounded-lg bg-sky-600 text-white">Apply</button>
            </div>
            </div>
        {/if}
        
        {#if filterToggle.isPrice}
            <div id="dropdownFilter" class="w-auto h-auto bg-white absolute top-9 left-[13.125rem] rounded-md border z-10  p-6">
                <div class="w-full h-auto">
                    <div class="space-y-2">
                        <div class="w-full h-9 border rounded-lg flex overflow-hidden">
                            <div class="h-9 w-9 bg-gray-200 flex justify-center items-center">
                                <p class="text-md font-semibold text-gray-500">$</p>
                            </div>
                            <div class="w-full h-full border">
                                <input class="bg-transparent focus:ring-0 ring-0 border-none focus:border-none w-full h-full" placeholder="Min Price" type="number">
                            </div>
                        </div>
                        <div class="w-full h-9 border rounded-lg flex overflow-hidden">
                            <div class="h-9 w-9 bg-gray-200 flex justify-center items-center">
                                <p class="text-md font-semibold text-gray-500">$</p>
                            </div>
                            <div class="w-full h-full border">
                                <input class="bg-transparent focus:ring-0 ring-0 border-none focus:border-none w-full h-full" placeholder="Max Price" type="number">
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-end relative">
                            <button class=" flex items-center justify-between gap-1 pl-1 h-7 bg-gray-200 rounded-lg">
                                <p>$ US</p>
                                <i class='bx bx-chevron-down text-lg'></i>
                            </button>
                            <div class="absolute w-20 h-20 bg-white border rounded-lg top-9 right-0 shadow-lg py-1 px-2 hidden">
                                    <p class="border-b">$ SGP</p>
                                    <p>y JPY</p>
                                    <p>e EUR</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-9 flex justify-center gap-2 mt-6">
                        <button class="px-2 border rounded-lg bg-gray-200">Clear All</button>
                        <button class="px-2 border rounded-lg bg-sky-600 text-white">Apply</button>
                    </div>
                </div>
            </div>
        {/if}
        
        {#if filterToggle.isRam}
            <div id="dropdownFilter" class="w-auto h-auto bg-white absolute top-9 left-[22.5rem] rounded-md border z-10 p-6 ">
                <div class="space-y-1">
                    <div class="w-full">
                        <input type="range" name="" id="" min="1" max="20" bind:value={ram} class="w-full">
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">1</p>
                        </div>
                        <div>
                            <p class="font-semibold">{ram}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">20</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-9 flex justify-center gap-2 mt-6">
                    <button class="px-2 border rounded-lg bg-gray-200">Clear All</button>
                    <button class="px-2 border rounded-lg bg-sky-600 text-white">Apply</button>
                </div>
            </div>
        {/if}
        
        {#if filterToggle.isStorage}
            <div id="dropdownFilter" class="w-auto h-auto bg-white absolute top-9 left-[31.688rem] rounded-md border z-10  p-6">
                <div class="space-y-1">
                    <div class="w-full">
                        <input type="range" name="" id="" min="16" max="256" bind:value={storage} class="w-full">
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">16</p>
                        </div>
                        <div>
                            <p class="font-semibold">{storage}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">20</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-9 flex justify-center gap-2 mt-6">
                    <button class="px-2 border rounded-lg bg-gray-200">Clear All</button>
                    <button class="px-2 border rounded-lg bg-sky-600 text-white">Apply</button>
                </div>
            </div>
        {/if}
    </div>
    <div class="flex justify-end gap-5 w-1/3 items-center font-medium text-black">
        <p class="font-semibold">Sort</p>
        <div class="relative w-32">
            <button class="w-32 bg-white h-8 border rounded-md flex justify-between items-center px-2" on:click={handleSortToggle}>Score
                <i class='bx bx-chevron-down text-lg'></i>
            </button>
            {#if sortToggle}
                 <div id="dropdownSort" class="absolute z-50 w-auto top-9 right-0 bg-white border rounded-lg shadow-lg">
                     <div class=" border-t flex items-center w-full h-8 px-2 justify-end cursor-pointer hover:bg-gray-100">
                         <p class>Score</p>
                     </div>
                     <div class=" border-t flex items-center w-full h-8 px-2 justify-end cursor-pointer hover:bg-gray-100">
                         <p class>Price</p>
                     </div>
                     <div class=" border-t flex items-center w-full h-8 px-2 justify-end cursor-pointer hover:bg-gray-100">
                         <p class>A - Z</p>
                     </div>
                     <div class=" border-t flex items-center w-full h-8 px-2 justify-end cursor-pointer hover:bg-gray-100">
                         <p class>Z - A</p>
                     </div>
                 </div>
            {/if}
        </div>
    </div>
</div>
{#if $isFilterProduct}
    <div class="w-full bg-black bg-opacity-70 h-screen fixed z-50 top-0 left-0 lg:hidden">
        <button class="fixed top-3 right-3 flex justify-center items-center w-8 h-8" on:click={handleToggleMobile}>
            <i class='bx bx-x font-semibold text-white text-4xl'></i>
        </button>
        <div class="w-80 h-full bg-gray-100 z-50">
            <div class="h-5/6 overflow-y-auto scroll w-full p-4 space-y-4">
                <div class="relative">
                    <div class="">
                        <p class="font-semibold">Sort by</p>
                    </div>
                    <div>
                        <button class="w-full bg-white h-10 border rounded-lg flex justify-between items-center px-2 font-semibold" on:click={handleSortToggle}>Score
                            <i class='bx bx-chevron-down text-lg'></i>
                        </button>
                    </div>
                    {#if sortToggle}
                        <div class=" w-11/12 bg-white border-pink-600 overflow-hidden absolute top-16 right-0 rounded-b-lg rounded-l-lg border-t-4 shadow-lg">
                            <div class=" border flex items-center w-full h-8 px-2">
                                <p>Score</p>
                            </div>
                            <div class=" border flex items-center w-full h-8 px-2">
                                <p>Price</p>
                            </div>
                            <div class=" border flex items-center w-full h-8 px-2">
                                <p>A - Z</p>
                            </div>
                            <div class=" border flex items-center w-full h-8 px-2">
                                <p>Z - A</p>
                            </div>
                        </div>
                    {/if}
                </div>
                <div>
                    <div class="">
                        <p class="font-semibold">Filter</p>
                    </div>
                    <div class="w-full h-auto bg-white rounded-lg p-2 border">
                        <p class="font-semibold">Brand</p>
                    <div class="h-36 w-full overflow-auto scroll space-y-1">
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Xiaomi</label>
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Samsung</label>
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Oppo</label>
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Vivo</label>
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Huawei</label>
                            </div>
                        </div>
                        <div class="w-full h-auto flex justify-start px-2">
                            <div class="flex justify-center gap-x-2 items-center">
                                <input class="ring-0 focus:ring-0 rounded-md bg-gray-100" type="checkbox" name="" id="">
                                <label for="">Microsoft</label>
                            </div>
                        </div>
                    </div>
                    </div>
        
                    <div class="w-full h-auto bg-white rounded-lg p-2 mt-4 border relative">
                        <p class="font-semibold">Price</p>
                        <div class="h-auto w-full overflow-auto scroll space-y-1">
                            <div class="w-full h-9 border rounded-lg flex overflow-hidden">
                                <div class="h-9 w-9 bg-gray-200 flex justify-center items-center">
                                    <p class="text-md font-semibold text-gray-500">$</p>
                                </div>
                                <div class="w-full h-full border">
                                    <input class="bg-transparent focus:ring-0 ring-0 border-none focus:border-none w-full h-full" placeholder="Min Price" type="number">
                                </div>
                            </div>
                            <div class="w-full h-9 border rounded-lg flex overflow-hidden">
                                <div class="h-9 w-9 bg-gray-200 flex justify-center items-center">
                                    <p class="text-md font-semibold text-gray-500">$</p>
                                </div>
                                <div class="w-full h-full border">
                                    <input class="bg-transparent focus:ring-0 ring-0 border-none focus:border-none w-full h-full" placeholder="Max Price" type="number">
                                </div>
                            </div>
                            <div class="w-full h-auto flex justify-end">
                                <button class=" flex items-center justify-between gap-1 pl-1 h-7 bg-gray-200 rounded-lg">
                                    <p>$ US</p>
                                    <i class='bx bx-chevron-down text-lg'></i>
                                </button>
                                <div class="absolute w-20 h-20 bg-white border rounded-lg -bottom-20 right-0 shadow-lg py-1 px-2 hidden">
                                        <p class="border-b">$ SGP</p>
                                        <p>y JPY</p>
                                        <p>e EUR</p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="w-full h-auto bg-white rounded-lg p-2 mt-4 border">
                        <p class="font-semibold">RAM</p>
                        <div class="h-auto w-full overflow-auto scroll space-y-1 px-2">
                            <div class="w-full">
                                <input type="range" name="" id="" min="0" max="20" bind:value={ram} class="w-full">
                            </div>
                            <div class="w-full flex justify-between items-center">
                                <div>
                                    <p class="text-gray-500">0</p>
                                </div>
                                <div>
                                    <p class="font-semibold">{ram}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500">20</p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="w-full h-auto bg-white rounded-lg p-2 mt-4 border">
                        <p class="font-semibold">Storage</p>
                        <div class="h-auto w-full overflow-auto scroll space-y-1 px-2">
                            <div class="w-full">
                                <input type="range" name="" id="" min="0" max="256" bind:value={storage} class="w-full slider">
                            </div>
                            <div class="w-full flex justify-between items-center">
                                <div>
                                    <p class="text-gray-500">0</p>
                                </div>
                                <div>
                                    <p class="font-semibold">{storage}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500">256</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-80 h-1/6 ">
                <div class="h-full w-full flex justify-center gap-2 items-center">
                    <button class="px-4 py-2 border rounded-lg bg-gray-300">Clear All</button>
                    <button class="px-4 py-2 border rounded-lg bg-sky-600 text-white">Apply</button>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- <div class=" _shadow h-10 w-20 fixed left-0 bottom-0 lg:hidden z-30" on:click={handleToggleMobile}>
    <div class="bg-gradient-to-r from-sky-600 to-indigo-800 flex justify-center gap-1 w-20 h-10 items-center px-1 py-1 text-white rounded-t-lg cursor-pointer _shadow">
        <p>Filter</p>
        <p>(1)</p>
    </div>
</div> -->



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