<script>
	import { goto } from '$app/navigation';
    import { saveToSessionStorage } from '../../../../../helpers/sessionStorage';
	import { compareDataStore } from '../../../../../stores';
    import product from '../../../../../helpers/product.json'
  import { readablestreamToJson } from '../../../../../helpers/readablestreamToJson';
  import { onMount } from 'svelte';
  import { Translate } from '../../../../../helpers/translate';

  let text = ['item selected', 'Compare', 'Search']

  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
  })

    $: category = 'smartphone'
    $: findDataCategory = product.find((item) => {
        let findData = item.category === category
        return findData
    })
    $: titleData = findDataCategory.title

    let isToggleBtn = false
    let isToggleSearch = false

    function handleToggelBtn() {
        isToggleBtn = !isToggleBtn
    }

    function removeItemById(title) {
        const data = $compareDataStore
        const indexToRemove = data.findIndex(item => item.title === title);

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
        const slugs = $compareDataStore.map(item => item.slug)
        const link = slugs.join('-vs-')
        console.log(link)
        compareDataStore.set([])
        saveToSessionStorage('compareDataSession', $compareDataStore)
        if (slugs.length == 1) {
            goto(`/product/${link}`)
        } else {
            goto(`/compare/${link}`)

        }
    }

    function handleSearchToggle() {
        isToggleSearch = !isToggleSearch
    }

    let searchValue = ''
    $: optionTitle = []

    function handleSearch() {
        let titleInput = searchValue;
        const filterData = titleData.filter((item) => new RegExp(titleInput, 'i').test(item.title));
        optionTitle = filterData.length === 0 ? [{title: 'Data not found'}] : filterData 
    }

    async function fethcImage(slug) {
        try {
            const res = await fetch(`http://localhost:3000/api/product/image/${slug}`)
            if (res.ok) {
                const parseJson = await readablestreamToJson(res.body)
                const image = parseJson[0].feature_image
                return image
            } else {
                return 'https://images.versus.io/objects/xiaomi-mi-11-pro.front.medium.1646342908789.jpg'
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSelect(title) {
        try {
            const slug = title.replace(/\s+/g, '-').toLowerCase()
            const isDataExists = $compareDataStore.some(existingData => existingData.slug === slug);
            if (!isDataExists) {
                const feature_image = await fethcImage(slug)
                const data = {title, slug, feature_image}
                compareDataStore.update(existingData => [...existingData, data])
                saveToSessionStorage('compareDataSession', $compareDataStore)
                searchValue = ''
                optionTitle = []
                isToggleSearch = false
            } else {
                console.log('Data sudah ada tambahkan');
            }
        } catch (error) {
            console.log(error)
        }
    }

</script>

{#if $compareDataStore.length > 0 && !isToggleSearch}
<div class=" position z-40 border rounded-t-lg">
    <div class="bg-gradient-to-r from-sky-600 to-indigo-800 flex justify-between {isToggleBtn ? 'w-60' :'w-auto'} md:w-64 h-10 items-center px-3 py-1 text-white rounded-t-lg cursor-pointer" on:keypress={handleToggelBtn} on:click={handleToggelBtn}>
        <div class="flex items-center gap-1">
            <!-- <p class="{isToggleBtn ? 'hidden' : ''} md:hidden">Compare</p> -->
            <i class='bx bx-git-compare'></i>
            <p class="md:hidden {isToggleBtn ? 'hidden' : ''}">({$compareDataStore.length})</p>
            <div class="{isToggleBtn ? 'flex' : 'hidden'} md:flex">
                <p>|</p>
                <p class="ml-2 capitalize">{$compareDataStore.length} {text[0]}</p>
            </div>
        </div>
        <i class='bx bx-chevron-{isToggleBtn ? 'down block' : 'up hidden'} text-xl md:block'></i>
    </div>
    <div class="{isToggleBtn ? '' : 'hidden'} w-60 md:w-64">
        {#each $compareDataStore as item (item.title)}
        <div class="h-12 bg-white border flex justify-between w-full pr-1">
            <div class="h-full w-1/6 p-2 flex justify-center">
                <img src={item.feature_image} alt="" class="h-full w-auto">
            </div>
            <div class="h-full w-4/6 text-sm flex items-center overflow-hidden">
                <p class="text-start font-medium leading-4">{item.title}</p>
            </div>
            <div class="flex justify-start items-center cursor-pointer" on:keypress={()=> {removeItemById(item.title)}} on:click={()=> {removeItemById(item.title)}}>
                <i class='bx bx-x text-black hover:text-red-600 text-2xl w-1/6'></i>
            </div>
        </div>
        {/each}
        <div class="h-12 bg-white flex justify-center items-center w-full">
            <div class="{$compareDataStore.length === 3 ? 'w-full' : 'w-2/3'} h-full flex justify-center items-center">
                <button class="bg-sky-600 hover:bg-sky-500 rounded-full text-white h-8 px-2 text-sm font-medium" on:click={handleCompare}>{text[1]}</button>
            </div>
            <div class="w-1/3 h-full flex justify-center items-center {$compareDataStore.length === 4 ? 'hidden' : ''}">
                <button class="bg-sky-600 hover:bg-sky-500 rounded-full w-8 h-8">
                    <i class='bx bx-plus text-white  text-lg items-center' on:keypress={handleSearchToggle} on:click={handleSearchToggle}></i>
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

{#if isToggleSearch}
<div class="w-64 position z-40 _shadow rounded-t-lg">
    <div class="bg-gradient-to-r from-sky-600 to-indigo-800 flex justify-between w-64 md:w-64 h-10 items-center px-3 py-1 text-white rounded-t-lg cursor-pointer">
        <div class="flex items-center gap-1">
            <i class='bx bx-search'></i>
            <div class="flex">
                <p>|</p>
                <p class="ml-2">{text[2]}</p>
            </div>
        </div>
        <i class='bx bx-x hover:text-red-600 text-xl md:block' on:keypress={handleSearchToggle} on:click={handleSearchToggle}></i>
    </div>
    {#if searchValue.length >= 2}
         <div class="w-full md:w-64 max-h-48 overflow-auto">
             {#each optionTitle as data}
                  <div class="h-9 overflow-hidden border bg-white flex justify-between w-full pr-1">
                      <div class="w-full flex justify-between px-2 py-1 items-center">
                          <div class="w-5/6 pl-2">
                              <p class="w-full overflow-hidden truncate text-sm leading-6">{data.title}</p>
                          </div>
                          <div class="h-full rounded-full bg-sky-600 aspect-square flex items-center justify-end border cursor-pointer group hover:bg-white hover:border-sky-600" on:click={()=> {handleSelect(data.title)}}>
                                  <i class='bx bx-plus group-hover:text-sky-600 text-white w-full h-full flex justify-center text-xl items-center'></i>
                          </div>
                      </div>
                  </div>
             {/each}
         </div>
    {/if}
    <div class="h-12 bg-white flex justify-center items-center w-full">
        <div class="border rounded-lg bg-gray-100 h-8 w-60 flex items-center pr-2">
            <input type="text" class="bg-transparent border-none rounded-lg h-full w-full focus:ring-0 focus:border-0 text-sm" placeholder="Search item for select..." bind:value={searchValue} on:keyup={handleSearch}>
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