<script>
	import { goto } from '$app/navigation';
    import Card from './template/Card.svelte'
    export let data
</script>

<div class="container h-auto pb-10 mx-auto">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {#each data as item}
            <div class="w-full col-span-1 border-2 rounded-lg overflow-hidden hover:border-sky-500 duration-100 cursor-pointer" on:click={() => {goto(`http://localhost:5173${item.url}`)}}>
                <Card data={item}/>
            </div>
        {/each}
    </div>
</div>