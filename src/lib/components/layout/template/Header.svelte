<script>
	import { isFilterProduct } from './../../../../stores.js';
    export let isProductPage
    export let isDetailProductPage

    let toggleMenu = false
    let toggleDropdown = false
    let y

    function handleMenu() {
        toggleMenu = !toggleMenu
    }

    function handleToggleFilterMobile() {
        isFilterProduct.set(true)
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
                <div class="flex justify-end gap-1 items-center">
                    <div class="flex justify-between items-center w-auto lg:w-80 md:h-9 lg:h-12 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm">
                        <div>
                            <input type="text" class="ring-0 focus:ring-0 border-none text-sm md:text-base focus:border-none w-32 md:w-64 md:font-medium search" placeholder="Search item...">
                        </div>
                        <div class="h-full lg:w-12 flex justify-center items-center hover:bg-[#F14D5D] duration-300 ease-in-out lg:px-0 px-1">
                            <i class='bx bx-search text-xl'></i>
                        </div>
                    </div>
                    {#if isProductPage}
                        <div on:click={handleToggleFilterMobile}>
                            <i class='bx bx-filter-alt text-2xl lg:hidden' ></i>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="w-1/2 lg:flex justify-between font-medium text-white items-center hidden">
                <div class="flex justify-center gap-12 capitalize text">
                    <a href="/" class="hover:text-[#F14D5D] duration-200 ease-in-out">home</a>
                    <a href="/products" class="hover:text-[#F14D5D] duration-200 ease-in-out">product</a>
                    <a href="" class="hover:text-[#F14D5D] duration-200 ease-in-out">articles</a>
                    <a href="" class="hover:text-[#F14D5D] duration-200 ease-in-out">about us</a>
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
                    <a href="/products" class="hover:text-[#F14D5D]">product</a>
                    <a href="" class="hover:text-[#F14D5D]">articles</a>
                    <a href="" class="hover:text-[#F14D5D]">about us</a>
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