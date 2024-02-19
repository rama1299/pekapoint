<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie'
    
    onMount(()=> {
        const currentRoute = $page.url.pathname

        data = data.map((item) => { return {...item, active : item.route == currentRoute}})
    })

    let data = [
        {
            title: 'adsense',
            route: '/admin/adsense',
            active: false
        }
    ]

    function handleLogout() {
        Cookies.remove('token')

        goto(`/admin`)
    }
</script>
<div class="w-full h-full flex flex-col justify-between px-0 lg:px-2 gap-5">
    <div class="w-full flex justify-start h-16 items-center px-2">
        <p class="text-3xl font-bold italic text-white hidden lg:flex">Pekapoint.</p>
        <img src="/favicon-512x512-white.png" alt="" class="w-full lg:hidden">
    </div>
    <div class="w-full h-[43.75rem] space-y-2">
        {#each data as item}
        <div class="flex text-white justify-center lg:justify-start items-center gap-2 h-14 rounded-lg px-3 {item.active ? 'bg-white/20' : ''} cursor-pointer">
            <i class='bx bx-dollar-circle text-2xl'></i>
            <p class="text-xl hidden lg:flex">{item.title}</p>
        </div>
        {/each}
    </div>
    <div>
        <div class="flex text-white justify-center lg:justify-start items-center gap-2 h-14 rounded-lg px-3 border-2 hover:bg-white/20 cursor-pointer group" on:click={handleLogout}>
            <i class='bx bx-log-out text-2xl group-hover:text-red-500'></i>
            <p class="text-xl hidden lg:flex">Logout</p>
        </div>
    </div>
</div>