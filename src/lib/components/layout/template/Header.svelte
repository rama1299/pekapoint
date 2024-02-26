<script>
	import { page } from '$app/stores';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { isFilterProduct } from './../../../../stores.js';
    import { onMount } from 'svelte';
    import { checkIpInfo } from '../../../../helpers/checkIpInfo.js';
	import { Translate } from '../../../../helpers/translate.js';

	let text = ['home', 'products', 'compare', 'blog', 'about us']

    export let isProductPage
    export let isDetailProductPage
    export let titleData
    const brand = import.meta.env.VITE_BRAND
    let route = ''

    onMount(async () => {
        route = $page.route.id ??'/'
        const arrayRoute = route.split('/')
        const textTranslate = await Translate.client(text, arrayRoute.length < 3 ? false : true)
		text = textTranslate

        document.addEventListener('click', handleOutSideSearch);

        languageTitle = JSON.parse(Cookies.get('geoInfo')).language
    
        return () => {
        document.removeEventListener('click', handleOutSideSearch);
        };

    })

    function handleOutSideSearch(event) {
        let search = document.getElementById('search')

        if (search || !search.contains(event.target)) {
            resetValue()
        }
    }
 
    let toggleMenu = false
    let toggleDropdown = false
    let y

    let languageTitle = ''

    function handleMenu() {
        toggleMenu = !toggleMenu
    }

    function handleToggleFilterMobile() {
        isFilterProduct.set(true)
    }

    async function handleLanguage(name) {
        let geoInfo = await checkIpInfo()
        geoInfo = {
            ...geoInfo,
            language: name
        }

        toggleDropdown = false

        await Cookies.remove('geoInfo')
        await Cookies.set('geoInfo', JSON.stringify(geoInfo))

        window.location.reload()
    }


    $: data = titleData.filter(item => !selectedOptionCompare.includes(item.title));

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

    let toggleCategorySearch = false
    let toggleCategory = false

</script>

<svelte:window bind:scrollY={y} />

{#if $page.route.id == '/'}
     <nav class="w-full z-50 top-0 {isDetailProductPage ? 'bg-primary-500' : y > 1 ? 'bg-primary-500' : 'bg-transparent'} duration-200 ease-out hidden lg:flex fixed">
         <div class="wrapper mx-auto ">
             <div class="flex w-full justify-between items-center text-sekunder-950">
                 <div class="w-full lg:w-1/3 flex justify-between lg:justify-start items-center lg:gap-8 gap-3">
                     <div class="flex justify-start gap-1 items-center cursor-pointer">
                         <i class='bx bx-{toggleMenu ? 'x rotate-180 ' : 'menu -rotate-180'} duration-300 ease-in-out text-3xl lg:hidden ' on:click={handleMenu}></i>
                         <img src={ y > 1 ?"/pekapoint.png" : "/pekapoint-yellow.png"} alt="" class="w-52">
                         <!-- <h1 class=" text-2xl md:text-3xl font-bold italic" on:click={() => {goto(`/`)}}>{brand}</h1> -->
                     </div>
                     <div id="search" class="w-full flex justify-end lg:justify-start gap-1 items-center">
                         {#if isProductPage}
                         <div class="max-w-80 flex justify-between items-center h-8 lg:h-10 bg-white/20 text-sekunder-950 relative">
                             <div class="h-full aspect-square flex justify-center items-center rounded-l-lg">
                                 <i class='bx bx-search text-xl'></i>
                             </div>
                             <div class="h-full w-full">
                                 <input class="w-full h-full flex justify-start items-center font-medium p-0 border-none bg-transparent focus:border-none focus:ring-0 ring-0" placeholder="Search..." type="text" bind:value={valueInput} on:keydown={handleKeyInput}>
                             </div>
                             <div class="h-full w-8">
                                 {#if valueInput.length > 0}
                                      <div class="h-full flex justify-center items-center group cursor-pointer" on:click={resetValue}>
                                          <i class='bx bx-x text-2xl group-hover:text-red-500'></i>
                                      </div>
                                 {/if}
                             </div>
                             {#if valueInput.length > 0 && dataFilter.length > 0}
                                 <div class="w-full max-h-48 lg:max-h-80 bg-white overflow-auto lg:overflow-hidden snap-y snap-mandatory rounded-lg absolute top-11 lg:top-[60px] shadow-lg left-0"
                                 tabindex="0"
                                 bind:this={containerScroll}>
                                     {#each dataFilter as item, i}
                                         <div class="{selectedOptionIndex == i ? 'bg-gray-200' : ''} w-full h-8 lg:h-10 border hover:bg-gray-200 flex justify-between items-center px-3 snap-start"
                                         tabindex="0"
                                         on:click={() => {handleSelect(item.title)}}
                                         id="idOption{i}"
                                         >
                                             <p class="w-full h-full truncate flex items-center text-black">{item.title}</p>
                                         </div>
                                     {/each}
                                 </div>
                             {/if}
                         </div>
                         
                         <div class="w-auto" on:click={handleToggleFilterMobile}>
                             <i class='bx bx-filter-alt text-2xl lg:hidden' ></i>
                         </div>
                         {/if}
                     </div>
                 </div>
                 <div class="w-2/3 lg:flex justify-between font-semibold text-sekunder-950 items-center hidden text-md">
                     <div class="w-full flex justify-between items-center capitalize text">
                         <a href="/" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">{text[0]}</a>
                         <a href="/product" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">{text[1]}</a>
                         <a href="/compare" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">{text[2]}</a>
                         <a href="/blog" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">{text[3]}</a>
                         <a href="/about" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">{text[4]}</a>
                         <a href="/contact" class="text-sekunder-950 { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"}">Contact Us</a>
     
                         <div class="flex justify-center items-center relative" on:mouseleave={() => {toggleDropdown = false}} on:mouseenter={() => {toggleDropdown = true}}>
                             <button class="flex justify-center items-center { y > 1 ?"hover:text-accent-red-600" : "hover:text-primary-500"} h-14 uppercase">
                                 {languageTitle}
                                 <i class='bx bx-chevron-{toggleDropdown ? 'up' : 'down'} text-lg' ></i>
                             </button>
                                 <div class="absolute top-14 right-0 {toggleDropdown ? 'show' : 'dropdown_hidden'} ">
                                     <div class="w-auto h-auto overflow-hidden bg-white shadow-lg z-50 duration-300 ease-in transition">
                                         <div class="w-full h-10 hover:bg-sekunder-50 flex justify-end items-center px-2 group cursor-pointer" on:click={() => {handleLanguage('id')}}>
                                             <p class="text-sekunder-950">Indonesia</p>
                                         </div>
                                         <div class="w-full h-10 hover:bg-sekunder-50 flex justify-end items-center px-2 group cursor-pointer" on:click={() => {handleLanguage('en')}}>
                                             <a href="" class="text-sekunder-950">English</a>
                                         </div>
                                     </div>
                                 </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         <!-- <div class="w-full pb-5 h-auto absolute {toggleMenu ? 'show' : 'dropdown_hidden'}">
             <div class="container mx-auto px-3">
                 <div class="w-full h-auto max-h-96 overflow-auto rounded-lg bg-white border-t-4 border-[#0A1831] shadow-lg ">
                     <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 pt-5 px-5">
                         <a href="/" class="hover:text-sky-500">{text[0]}</a>
                         <a href="/product" class="hover:text-sky-500">{text[1]}</a>
                         <a href="/compare" class="hover:text-sky-500">{text[2]}</a>
                         <a href="/blog" class="hover:text-sky-500">{text[3]}</a>
                         <a href="/about" class="hover:text-sky-500">{text[4]}</a>
                     </div>
                     <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 p-5">
                         <button class="w-full h-full flex justify-between" on:click={() => { toggleDropdown = !toggleDropdown}}>
                             <p>Engish</p>
                             <i class='bx bx-chevron-{toggleDropdown ? 'up' : 'down'} text-lg' ></i>
                         </button>
                         <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 px-7 {toggleDropdown ? '' : 'hidden'}">
                             <div on:click={() => {handleLanguage('id')}}>
                                 <p class="hover:text-sky-500" >Indonesia</p>
                             </div>
                             <div on:click={() => {handleLanguage('en')}}>
                                 <p class="hover:text-sky-500">English</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div> -->
     </nav>
{/if}

{#if $page.route.id != '/'}
     <nav class="w-full bg-white hidden lg:flex">
         <div class="w-full">
             <div class="w-full">
                 <div class="wrapper mx-auto flex justify-end items-center text-sm gap-5 py-1">
                     <div class="w-full flex justify-between items-center relative">
                         <div>
                             <div class="flex justify-center items-center gap-1 cursor-pointer">
                                 <i class='bx bx-phone text-xl text-primary-500'></i>
                                 <div class="flex justify-center items-center gap-1">
                                     <p>Support</p>
                                     <p class="font-semibold">(+62)856 9529 4245</p>
                                 </div>
                             </div>
                         </div>
                         <div class="flex justify-center items-center gap-3 divide-x-2 divide-sekunder-200 font-medium">
                             <div>
                                 <div class="relative">
                                     <div class="flex justify-center items-center gap-1 cursor-pointer" on:click={() => {toggleDropdown = !toggleDropdown}}>
                                         <div class="w-5 h-2 bg-red-600"></div>
                                         <p>Indonesia</p>
                                         <i class='bx bx-chevron-down text-xl'></i>
                                     </div>
                                     <div class="absolute border top-8 right-0 {toggleDropdown ? 'show' : 'dropdown_hidden'}">
                                         <div class="bg-white shadow-lg">
                                             <p class="h-8 w-24 flex justify-center items-center hover:bg-sekunder-200 cursor-pointer" on:click={() => {handleLanguage('id')}}>Indonesia</p>
                                             <p class="h-8 w-24 flex justify-center items-center hover:bg-sekunder-200 cursor-pointer" on:click={() => {handleLanguage('en')}}>English</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div>
                                 <div class="relative">
                                     <div class="flex justify-center items-center gap-1 pl-3 cursor-pointer">
                                         <p class="">$ USD</p>
                                         <i class='bx bx-chevron-down text-xl'></i>
                                     </div>
                                 </div>
                                 <!-- <div class="absolute border top-8 right-0">
                                     <div class="bg-white shadow-lg">
                                         <p class="h-8 w-20 flex justify-center items-center">USD</p>
                                         <p class="h-8 w-20 flex justify-center items-center">EUR</p>
                                         <p class="h-8 w-20 flex justify-center items-center">IDR</p>
                                     </div>
                                 </div> -->
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="w-full border-t bg-white">
                 <div class="wrapper mx-auto">
                     <div class="w-full flex justify-between items-center py-7">
                         <div class="w-[25%] flex justify-start items-center">
                             <img src="/pekapoint-yellow.png" alt="" class="w-40">
                             <!-- <p class="text-4xl font-bold italic text-sekunder-950 cursor-pointer" on:click={() => {goto(`/`)}}>Pekapoint.</p> -->
                         </div>
                         <div class="w-[50%] relative">
                             <div class="w-full flex justify-center h-11 bg-white rounded-full overflow-hidden border-2 border-primary-500">
                                 <div id="search" class="w-[60%] h-full flex justify-center items-center font-medium text-sekunder-950">
                                     <input type="text" class="w-full h-full border-none bg-transparent focus:ring-0 pl-5 placeholder-text-sekunder-950" placeholder="Search for product..." bind:value={valueInput} on:keydown={handleKeyInput}>
                                 </div>
                                 <div class="w-[30%] h-full flex justify-center items-center gap-5 cursor-pointer" on:click={() => {toggleCategorySearch = !toggleCategorySearch}}>
                                     <p>All Brand</p>
                                     <i class='bx bxs-down-arrow text-xs'></i>
                                 </div>
                                 <div class="w-[10%] h-full flex justify-center items-center bg-primary-500 active:bg-primary-700 cursor-pointer duration-100" on:click={handleEnter}>
                                     <i class='bx bx-search text-white text-xl'></i>
                                 </div>
                             </div>
     
                             {#if valueInput.length > 0 && dataFilter.length > 0}
                                 <div class="w-[60%] z-10 border border-sekunder-300 divide-y divide-sekunder-300 max-h-48 lg:max-h-80 bg-white overflow-auto lg:overflow-hidden snap-y snap-mandatory rounded-lg absolute top-11 shadow-lg left-0"
                                 tabindex="0"
                                 bind:this={containerScroll}>
                                     {#each dataFilter as item, i}
                                         <div class="{selectedOptionIndex == i ? 'bg-sekunder-100' : ''} w-full h-8 lg:h-10 hover:bg-sekunder-100 flex justify-between items-center px-3 snap-start"
                                         tabindex="0"
                                         on:click={() => {handleSelect(item.title)}}
                                         id="idOption{i}"
                                         >
                                             <p class="w-full h-full truncate flex items-center text-sekunder-950">{item.title}</p>
                                         </div>
                                     {/each}
                                 </div>
                             {/if}
     
                             {#if toggleCategorySearch}
                                 <div class="w-[30%] absolute top-11 bg-white right-[10%] z-10 border rounded-lg border-sekunder-300 overflow-hidden">
                                     <div class="w-full h-10 flex justify-start items-center px-3 cursor-pointer hover:bg-sekunder-100" on:click={() => {toggleCategorySearch = false}}>
                                         <p>All Category</p>
                                     </div>
                                 </div>
                             {/if}
     
                         </div>
                         <div class="w-[25%] flex justify-end items-center gap-5 text-2xl">
                             <div class="flex justify-center items-center group cursor-pointer gap-2" on:click={() => {goto(`/compare`)}}>
                                 <i class='bx bx-git-compare text-sekunder-950 group-hover:text-accent-red-600 group-active:text-accent-red-700 duration-100'></i>
                                 <p class="text-sm group-hover:text-accent-red-600 group-active:text-accent-red-700 duration-100">Compare</p>
                             </div>
                             <div class="flex justify-center items-center group cursor-pointer  gap-2">
                                 <i class='bx bx-user text-sekunder-950 group-hover:text-accent-red-600 group-active:text-accent-red-700 duration-100'></i>
                                 <p class="text-sm group-hover:text-accent-red-600 group-active:text-accent-red-700 duration-100">My Account</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <!-- border-t-2 border-b-2 border-primary-500 -->
             <div class="w-full bg-primary-500">
                 <div class="wrapper mx-auto">
                     <div class="w-full flex justify-start gap-10 items-center h-11">
                         <div id="category" class="relative">
                             <div class="flex justify-center items-center cursor-pointer" on:click={() => {toggleCategory = !toggleCategory}}>
                                 <i class='bx bx-menu text-4xl text-sekunder-950'></i>
                             </div>
                             {#if toggleCategory}
                                  <div class="w-52 bg-white absolute top-[46px] left-0 border-r-2 border-l-2 rounded-b-lg overflow-hidden border-b-2 border-primary-500 z-10">
                                      <div class="w-full h-10 flex justify-start items-center px-3 cursor-pointer hover:bg-sekunder-100" on:click={() => {toggleCategory = false}}>
                                          <p>Smarphone</p>
                                      </div>
                                  </div>
                             {/if}
                         </div>
                         <div class="flex h-full justify-center items-center font-bold text-sekunder-950 text-sm">
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route == '/' ? 'bg-primary-700/50' : ''}" href="/">Home</a>
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route.includes('product') ? 'bg-primary-700/50' : ''}" href="/product">Product</a>
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route.includes('compare') ? 'bg-primary-700/50' : ''}" href="/compare">Compare</a>
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route.includes('blog') ? 'bg-primary-700/50' : ''}" href="/blog">Blog</a>
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route.includes('about') ? 'bg-primary-700/50' : ''}" href="/about">About Us</a>
                             <a class="h-full px-10 flex items-center cursor-pointer duration-100 hover:bg-primary-700/50 {route.includes('contact') ? 'bg-primary-700/50' : ''}" href="/contact">Contact Us</a>
                       </div>
                     </div>
                 </div>
             </div>
         </div>
     </nav>
{/if}

<nav class="w-full flex lg:hidden fixed top-0 z-10">
    <div class="wrapper h-12 bg-primary-500 text-white flex justify-between items-center">
        <div class="h-full flex justify-start items-center gap-5 text-xl">
            <div class="flex justify-center items-center">
                <i class='bx bx-menu text-4xl'></i>
            </div>
            <div class="h-full flex justify-center items-center">
                <img src="/pekapoint.png" alt="" class="h-8">
            </div>
        </div>
        <div class="flex h-full justify-center items-center text-2xl gap-5">
            <div class=" flex justify-center items-center group">
                <i class='bx bx-search active:text-primary-700 text-2xl'></i>
            </div>
            <div class=" flex justify-center items-center group">
                <i class='bx bx-user active:text-primary-700 text-2xl'></i>
            </div>
            <div class=" flex justify-center items-center group">
                <i class='bx bx-filter-alt active:text-primary-700 text-2xl'></i>
            </div>
        </div>
    </div>
    <!-- <div class="w-full bg-white p-5 absolute z-10 top-14 shadow-lg">
        <div class="w-full h-40 border">

        </div>
    </div> -->
</nav>


<style>
    
    /* input {
        background-color: rgba(255, 255, 255, 0);
        height: 0;
        border: none;
    } */

    .sidebar_hidden {
        -webkit-clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        transition: 0.3s ease;
    }

    .show {
        -webkit-clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
        clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
        transition: 0.3s ease;
    }

    .dropdown_hidden {
        -webkit-clip-path: polygon(100% 0, 0 0, 0 0, 100% 0);
        clip-path: polygon(100% 0, 0 0, 0 0, 100% 0);
        transition: 0.3s ease;
    }

    /* ::placeholder {
        color: white;
    } */

</style>