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

    onMount(async () => {
        let route = $page.route.id ??'/'
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

</script>

<svelte:window bind:scrollY={y} />


<nav class="w-full z-50 top-0 {isDetailProductPage ? 'bg-[#0A1831]' : y > 1 ? 'bg-[#0A1831]' : 'bg-transparent'} duration-200 ease-out fixed">
    <div class="container mx-auto ">
        <div class="flex w-full justify-between items-center font-monst text-white">
            <div class="w-full lg:w-1/2 flex justify-between lg:justify-start items-center lg:gap-8 lg:px-0 lg:py-0 gap-3 py-2 px-2">
                <div class="flex justify-start gap-1 items-center">
                    <i class='bx bx-{toggleMenu ? 'x rotate-180 ' : 'menu -rotate-180'} duration-300 ease-in-out text-3xl lg:hidden ' on:click={handleMenu}></i>
                    <h1 class=" text-2xl md:text-4xl font-bold italic">{brand}</h1>
                </div>
                <div id="search" class="w-full flex justify-end lg:justify-start gap-1 items-center">
                    {#if isProductPage}
                    <div class="max-w-80 flex justify-between items-center h-8 lg:h-10 bg-white/20 text-white rounded-lg relative">
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
            <div class="w-1/2 lg:flex justify-between font-medium text-white items-center hidden">
                <div class="flex justify-center items-center gap-12 capitalize text">
                    <a href="/" class="hover:text-sky-500 duration-200 ease-in-out">{text[0]}</a>
                    <a href="/product" class="hover:text-sky-500 duration-200 ease-in-out">{text[1]}</a>
                    <a href="/compare" class="hover:text-sky-500 duration-200 ease-in-out">{text[2]}</a>
                    <a href="/blog" class="hover:text-sky-500 duration-200 ease-in-out">{text[3]}</a>
                    <a href="/about" class="hover:text-sky-500 duration-200 ease-in-out">{text[4]}</a>
                </div>
                <div class="flex justify-center items-center relative" on:mouseleave={() => {toggleDropdown = false}} on:mouseenter={() => {toggleDropdown = true}}>
                    <button class="flex justify-center items-center hover:text-sky-500 h-20 w-20 uppercase">
                        {languageTitle}
                        <i class='bx bx-chevron-{toggleDropdown ? 'up' : 'down'} text-lg' ></i>
                    </button>
                        <div class="asbolute absolute top-20 right-0 px-4 pb-4 {toggleDropdown ? 'show' : 'dropdown_hidden'} ">
                            <div class="w-auto h-auto rounded-b-lg rounded-l-lg overflow-hidden bg-white shadow-lg border-t-sky-500 border-t-4 z-50 duration-300 ease-in transition">
                                <div class="w-full h-8 border-b flex justify-end items-center px-2 group cursor-pointer" on:click={() => {handleLanguage('id')}}>
                                    <p class="text-black group-hover:text-sky-500">Indonesia</p>
                                </div>
                                <div class="w-full h-8 border-b flex justify-end items-center px-2 group cursor-pointer" on:click={() => {handleLanguage('en')}}>
                                    <a href="" class="text-black group-hover:text-sky-500">English</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pb-5 h-auto absolute {toggleMenu ? 'show' : 'dropdown_hidden'}">
        <div class="container mx-auto px-3">
            <div class="w-full h-auto max-h-96 overflow-auto rounded-lg bg-white border-t-4 border-sky-500 shadow-lg ">
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
    </div>
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

    ::placeholder {
        color: white;
    }

</style>