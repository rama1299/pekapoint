<script>
    import SideBar from "./template/SideBar.svelte";
</script>

<main class="w-full h-screen bg-sky-950 p-3">
    <div class="w-full h-full flex gap-3">
        <div class="w-14 lg:w-72 h-full">
            <SideBar/>
        </div>
        <div class="w-full f-full bg-white rounded-2xl overflow-hidden">
            <slot/>
        </div>
    </div>
</main>