<script>
	import { goto } from '$app/navigation';
	import { isFilterProduct } from './../../../../stores.js';
    import product from '../../../../helpers/product.json'
    import { onMount } from 'svelte';
    export let isProductPage
    export let isDetailProductPage

    onMount(() => {
        document.addEventListener('click', handleOutSideSearch);
    
        return () => {
        document.removeEventListener('click', handleOutSideSearch);
        };
    })

    function handleOutSideSearch() {
        let clicked = event.target
        let classList = clicked.classList

        if (classList[0] != 'search') {
            optionTitle = []
        }
    }

    let toggleMenu = false
    let toggleDropdown = false
    let y

    function handleMenu() {
        toggleMenu = !toggleMenu
    }

    function handleToggleFilterMobile() {
        isFilterProduct.set(true)
    }

    $: categoryProduct = 'smartphone'
    $: findDataCategory = product.find((item) => {
        let findData = item.category === categoryProduct
        return findData
    })
    $: titleData = findDataCategory.title
    let searchValue = ''
    $: optionTitle = []

    function handleChangeValue() {
        let titleInput = searchValue;
        const filterData = titleData.filter((item) => new RegExp(titleInput, 'i').test(item.title));
        optionTitle = filterData.length === 0 ? [{title: 'Data not found'}] : filterData 
    }

    function handleSelectTitle(title) {
        searchValue = title
        optionTitle = []
    }

    function handleSearch() {
        if (searchValue) {
            const slug = searchValue.replace(/\s+/g, '-').toLocaleLowerCase()
            const link = `http://localhost:5173/product/${slug}`
            goto(link)
        }
    }

</script>

<svelte:window bind:scrollY={y} />


<nav class="w-full z-50 top-0 {isDetailProductPage ? 'bg-[#0A1831]' : y > 1 ? 'bg-[#0A1831]' : 'bg-transparent'} duration-200 ease-out fixed">
    <div class="container lg:w-wrap mx-auto ">
        <div class="flex w-full justify-between items-center font-monst text-white">
            <div class="w-full lg:w-1/2 flex justify-between lg:justify-start items-center lg:gap-8 lg:px-0 lg:py-0 gap-3 py-2 px-2">
                <div class="flex justify-start gap-1 items-center">
                    <i class='bx bx-{toggleMenu ? 'x rotate-180 ' : 'menu -rotate-180'} duration-300 ease-in-out text-3xl lg:hidden ' on:click={handleMenu}></i>
                    <h1 class=" text-2xl md:text-4xl font-bold italic">Specwar.</h1>
                </div>
                {#if isProductPage}
                <div class="search flex justify-end gap-1 items-center relative">
                    <div class="flex justify-between items-center w-auto lg:w-80 md:h-9 lg:h-12 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm">
                        <div>
                            <input type="text" class="ring-0 focus:ring-0 border-none text-sm md:text-base focus:border-none w-32 md:w-64 md:font-medium search" placeholder="Search item..." bind:value={searchValue} on:keyup={handleChangeValue}>
                        </div>
                        <div class="h-full lg:w-12 flex justify-center items-center hover:bg-[#F14D5D] duration-300 ease-in-out lg:px-0 px-1" on:click={handleSearch}>
                            <i class='bx bx-search text-xl'></i>
                        </div>
                    </div>
                    <div on:click={handleToggleFilterMobile}>
                        <i class='bx bx-filter-alt text-2xl lg:hidden' ></i>
                    </div>
                    {#if searchValue.length >= 3 && optionTitle.length > 0}
                         <div class="search w-full max-h-80 bg-white absolute top-10 lg:top-16 shadow-lg border-t-4 border-[#F14D5D] rounded-tr-lg rounded-b-lg left-0 divide-y-2 overflow-auto">
                             {#each optionTitle as data, i (i)}
                                  <div class="w-full h-9 flex justify-start items-center px-2 cursor-pointer hover:bg-gray-100" on:click={() => {handleSelectTitle(data.title)}}>
                                     <p class="text-black font font-medium w-full truncate text-sm lg:text-base">{data.title}</p>
                                  </div>
                             {/each}
                         </div>
                    {/if}
                </div>
                {/if}
            </div>
            <div class="w-1/2 lg:flex justify-between font-medium text-white items-center hidden">
                <div class="flex justify-center gap-12 capitalize text">
                    <a href="/" class="hover:text-[#F14D5D] duration-200 ease-in-out">home</a>
                    <a href="/product" class="hover:text-[#F14D5D] duration-200 ease-in-out">product</a>
                    <a href="/compare" class="hover:text-[#F14D5D] duration-200 ease-in-out">compare</a>
                    <a href="/blog" class="hover:text-[#F14D5D] duration-200 ease-in-out">blog</a>
                    <a href="/about" class="hover:text-[#F14D5D] duration-200 ease-in-out">about us</a>
                </div>
                <div class="flex justify-center items-center relative" on:mouseleave={() => {toggleDropdown = false}} on:mouseenter={() => {toggleDropdown = true}}>
                    <button class="flex justify-center items-center hover:text-[#F14D5D] h-20 w-20">
                        EN
                        <i class='bx bx-chevron-{toggleDropdown ? 'up' : 'down'} text-lg' ></i>
                    </button>
                        <div class="asbolute absolute top-20 right-0 px-4 pb-4 {toggleDropdown ? 'show' : 'dropdown_hidden'} ">
                            <div class="w-auto h-auto rounded-b-lg rounded-l-lg overflow-hidden bg-white shadow-lg border-t-[#F14D5D] border-t-4 z-50 duration-300 ease-in transition">
                                <div class="w-full h-8 border-b flex justify-end items-center px-2 group">
                                    <a href="" class="text-black group-hover:text-[#F14D5D]">Indonesia</a>
                                </div>
                                <div class="w-full h-8 border-b flex justify-end items-center px-2 group">
                                    <a href="" class="text-black group-hover:text-[#F14D5D]">Arabic</a>
                                </div>
                                <div class="w-full h-8 border-b flex justify-end items-center px-2 group">
                                    <a href="" class="text-black group-hover:text-[#F14D5D]">Japanese</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pb-5 h-auto absolute {toggleMenu ? 'show' : 'dropdown_hidden'}">
        <div class="container lg:w-wrap mx-auto px-3">
            <div class="w-full h-auto max-h-96 overflow-auto rounded-lg bg-white border-t-4 border-[#F14D5D] shadow-lg ">
                <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 pt-5 px-5">
                    <a href="/" class="hover:text-[#F14D5D]">home</a>
                    <a href="/product" class="hover:text-[#F14D5D]">product</a>
                    <a href="/compare" class="hover:text-[#F14D5D]">compare</a>
                    <a href="/blog" class="hover:text-[#F14D5D]">blog</a>
                    <a href="/about" class="hover:text-[#F14D5D]">about us</a>
                </div>
                <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 p-5">
                    <button class="w-full h-full flex justify-between" on:click={() => { toggleDropdown = !toggleDropdown}}>
                        <p>Engish</p>
                        <i class='bx bx-chevron-{toggleDropdown ? 'up' : 'down'} text-lg' ></i>
                    </button>
                    <div class="flex flex-col w-full h-auto capitalize font-semibold gap-5 px-7 {toggleDropdown ? '' : 'hidden'}">
                        <a href="" class="hover:text-[#F14D5D]">Indonesia</a>
                        <a href="" class="hover:text-[#F14D5D]">Arabic</a>
                        <a href="" class="hover:text-[#F14D5D]">Japanese</a>
                        <a href="" class="hover:text-[#F14D5D]">German</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>



<style>
  input {
        background-color: rgba(255, 255, 255, 0); /* Format rgba dengan tingkat transparansi (alpha) 0.5 */
        height: 0;
        border: none;
    }

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

    .search::placeholder {
        color: white;
    }

</style>