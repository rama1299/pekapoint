<script>
	import { FetchAds } from '../../../modules/fetchAdsManagement.js';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
    import { onMount, afterUpdate } from "svelte";
    import Dashboard from '../components/Dashboard.svelte';
    
    let data = []
    let totalData = 0
    let isAdmin = false

    onMount(async () => {
        try {
            const token = Cookies.get('token')
            
            if ( !token ) {
                return goto('/error')
            }

            const response = await FetchAds.getAllAds()
            
            if (response.status == 200) {
                data = response.data
                totalData = data.length
            }

            isAdmin = true
        } catch (error) {
            // return goto('/error')
            console.log(error)
        }
    })

</script>

{#if isAdmin}
<Dashboard>
    <div class="w-full h-full">
        <div class="w-full h-2/6 px-5 pt-5 flex flex-col justify-between">
            <div>
                <p class="text-2xl font-bold">Adsense Dashboard</p>
            </div>
            <div class="w-full flex justify-between">
                <div>
                    <div class=" w-72 h-40 border-2 hidden lg:flex items-center justify-center gap-5 rounded-lg">
                        <div class="w-20 aspect-square rounded-full bg-sky-950 flex justify-center items-center">
                            <i class='bx bx-file-blank text-3xl text-white'></i>
                        </div>
                        <div>
                            <p class="text-xl font-medium">Total Adsense</p>
                            <p class="text-2xl font-semibold">{totalData}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-center gap-3" on:click={() => {goto(`/admin/adsense/create`)}}>
                        <p class="lg:text-xl font-medium">Add Adsense</p>
                        <div class="w-7 lg:w-12 aspect-square flex justify-center items-center rounded-full border-2 border-sky-950 hover:bg-white bg-sky-950 cursor-pointer group duration-100">
                            <i class='bx bx-plus text-xl lg:text-3xl group-hover:text-sky-950 text-white'></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-start items-end">
                <div class="px-3 border-b-4 border-sky-950 font-medium cursor-pointer">
                    <p>Adsense List</p>
                </div>
            </div>
        </div>
        <div class="w-full h-4/6 bg-gray-100 p-5 overflow-scroll">
            <div class="w-96 lg:w-full h-full text-sm lg:text-base">
                <div class="w-full h-12 grid grid-cols-11 bg-sky-950 text-white font-medium items-center gap-3 px-2 sticky top-0">
                    <div class=" col-span-1 flex justify-center items-start">
                        <p>ID</p>
                    </div>
                    <div class=" col-span-3 flex justify-center items-start">
                        <p>Title</p>
                    </div>
                    <div class=" col-span-2 flex justify-center items-start">
                        <p>Page</p>
                    </div>
                    <div class=" col-span-2 flex justify-center items-start">
                        <p>Position</p>
                    </div>
                    <div class=" col-span-3 flex justify-center items-start">
                        <p>Content</p>
                    </div>
                </div>
                {#if data != []}
                    {#each data as item, i}
                        <div class="w-full h-12 grid grid-cols-11 {i % 2 == 0 ? 'bg-gray-200' : 'bg-gray-300'} items-center gap-3 px-2">
                            <div class=" col-span-1 flex justify-center items-start">
                                <p class="w-full truncate flex justify-center">{item.id}</p>
                            </div>
                            <div class=" col-span-3 flex justify-center items-start">
                                <p class="w-full truncate flex justify-center">{item.title}</p>
                            </div>
                            <div class=" col-span-2 flex justify-center items-start">
                                <p class="w-full truncate flex justify-center">{item.page}</p>
                            </div>
                            <div class=" col-span-2 flex justify-center items-start">
                                <p class="w-full truncate capitalize flex justify-center">{item.content_position}</p>
                            </div>
                            <div class=" col-span-3 flex justify-center items-start overflow-hidden">
                                <p class="w-full truncate justify-start">{item.content}</p>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</Dashboard>
{/if}