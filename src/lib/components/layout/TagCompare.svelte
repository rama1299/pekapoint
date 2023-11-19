<script>
    import { saveToSessionStorage } from '../../storageHelper';
	import { compareDataStore } from '../../stores';

    let isToggleBtn = false
    let isToggleSearch = false

    function handleToggelBtn() {
        isToggleBtn = !isToggleBtn
    }

    function removeItemById(id) {
        const data = $compareDataStore
        const indexToRemove = data.findIndex(item => item.id === id);

        if (indexToRemove !== -1) {
            data.splice(indexToRemove, 1);
            compareDataStore.set(data)
            saveToSessionStorage('compareDataSession', $compareDataStore)
        }

        if (data.length === 0) {
            handleToggelBtn()
        }

    }

    function handleCompare() {
        const titles = $compareDataStore.map(item => item.title.replace(/\s+/g, "-"))
        const link = titles.join('-vs-')
        console.log(link)
        compareDataStore.set([])
        saveToSessionStorage('compareDataSession', $compareDataStore)
    }

    function handleSearch() {
        isToggleSearch = !isToggleSearch
    }

</script>

{#if $compareDataStore.length > 0 && !isToggleSearch}
<div class=" position z-40 _shadow rounded-t-lg">
    <div class="bg-gradient-to-r from-sky-600 to-indigo-800 flex justify-between {isToggleBtn ? 'w-60' :'w-auto'} md:w-64 h-10 items-center px-3 py-1 text-white rounded-t-lg cursor-pointer" on:click={handleToggelBtn}>
        <div class="flex items-center gap-1">
            <p class="{isToggleBtn ? 'hidden' : ''} md:hidden">Compare</p>
            <i class='bx bx-git-compare {isToggleBtn ? '' : 'hidden md:block'}'></i>
            <p class="md:hidden {isToggleBtn ? 'hidden' : ''}">({$compareDataStore.length})</p>
            <div class="{isToggleBtn ? 'flex' : 'hidden'} md:flex">
                <p>|</p>
                <p class="ml-2">{$compareDataStore.length} item selected</p>
            </div>
        </div>
        <i class='bx bx-chevron-{isToggleBtn ? 'down block' : 'up hidden'} text-xl md:block'></i>
    </div>
    <div class="{isToggleBtn ? '' : 'hidden'} w-60 md:w-64">
        {#each $compareDataStore as item (item.id)}
        <div class="h-12 bg-white border flex justify-between w-full pr-1">
            <div class="h-full w-1/6 p-2 flex justify-center">
                <img src={item.image_url} alt="" class="h-full w-auto">
            </div>
            <div class="h-full w-4/6 text-sm flex items-center overflow-hidden">
                <p class="text-start font-medium leading-4">{item.title}</p>
            </div>
            <div class="flex justify-start items-center cursor-pointer" on:click={()=> {removeItemById(item.id)}}>
                <i class='bx bx-x text-black hover:text-red-600 text-2xl w-1/6'></i>
            </div>
        </div>
        {/each}
        <div class="h-12 bg-white flex justify-center items-center w-full">
            <div class="{$compareDataStore.length === 3 ? 'w-full' : 'w-2/3'} h-full flex justify-center items-center">
                <button class="bg-sky-600 hover:bg-sky-500 rounded-full text-white h-8 w-32 text-sm font-medium" on:click={handleCompare}>Compare</button>
            </div>
            <div class="w-1/3 h-full flex justify-center items-center {$compareDataStore.length === 3 ? 'hidden' : ''}">
                <button class="bg-sky-600 hover:bg-sky-500 rounded-full w-8 h-8">
                    <i class='bx bx-plus text-white  text-lg items-center' on:click={handleSearch}></i>
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

{#if isToggleSearch}
<div class=" position z-40 _shadow rounded-t-lg">
    <div class="bg-gradient-to-r from-sky-600 to-indigo-800 flex justify-between w-64 md:w-64 h-10 items-center px-3 py-1 text-white rounded-t-lg cursor-pointer">
        <div class="flex items-center gap-1">
            <i class='bx bx-search'></i>
            <div class="flex">
                <p>|</p>
                <p class="ml-2">Search</p>
            </div>
        </div>
        <i class='bx bx-x hover:text-red-600 text-xl md:block' on:click={handleSearch}></i>
    </div>
    <div class="w-full md:w-64 max-h-48 overflow-auto">
        <div class="h-9 border bg-white flex justify-between w-full pr-1">
            <div class="w-full flex justify-between px-2 py-1 items-center">
                <div class="w-4/5 pl-2">
                    <p class="">Xiaomi</p>
                </div>
                <div class="w-1/5 flex items-center justify-end">
                        <i class='bx bx-plus text-sky-600 text-xl items-center'></i>
                </div>
            </div>
        </div>
        <div class="h-9 border bg-white flex justify-between w-full pr-1">
            <div class="w-full flex justify-between px-2 py-1 items-center">
                <div class="w-4/5 pl-2">
                    <p class="">Xiaomi</p>
                </div>
                <div class="w-1/5 flex items-center justify-end">
                        <i class='bx bx-plus text-sky-600 text-xl items-center'></i>
                </div>
            </div>
        </div>
        <div class="h-9 border bg-white flex justify-between w-full pr-1">
            <div class="w-full flex justify-between px-2 py-1 items-center">
                <div class="w-4/5 pl-2">
                    <p class="">Xiaomi</p>
                </div>
                <div class="w-1/5 flex items-center justify-end">
                        <i class='bx bx-plus text-sky-600 text-xl items-center'></i>
                </div>
            </div>
        </div>
        <div class="h-9 border bg-white flex justify-between w-full pr-1">
            <div class="w-full flex justify-between px-2 py-1 items-center">
                <div class="w-4/5 pl-2">
                    <p class="">Xiaomi</p>
                </div>
                <div class="w-1/5 flex items-center justify-end">
                        <i class='bx bx-plus text-sky-600 text-xl items-center'></i>
                </div>
            </div>
        </div>
        <div class="h-9 border bg-white flex justify-between w-full pr-1">
            <div class="w-full flex justify-between px-2 py-1 items-center">
                <div class="w-4/5 pl-2">
                    <p class="">Xiaomi</p>
                </div>
                <div class="w-1/5 flex items-center justify-end">
                        <i class='bx bx-plus text-sky-600 text-xl items-center'></i>
                </div>
            </div>
        </div>

    </div>
    <div class="h-12 bg-white flex justify-center items-center w-full">
        <div class="border rounded-lg bg-gray-100 h-8 w-60 flex items-center pr-2">
            <input type="text" class="bg-transparent border-none rounded-lg h-full w-full focus:ring-0 focus:border-0 text-sm" placeholder="Search item for select...">
            <i class='bx bx-search'></i>
        </div>
    </div>
</div>
{/if}



<style>
    .position {
        position: fixed;
        bottom: 0;
        right: 0;
    }

    ._shadow {
        -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        -moz-box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    }

    @media only screen and (min-width: 1400px){
        .position {
            right: 15%;
        }
    }
</style>