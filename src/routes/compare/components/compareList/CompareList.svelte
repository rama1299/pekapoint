<script>
	import { goto } from '$app/navigation';
    import Card from './template/Card.svelte'
    export let data
</script>

<div class="w-full h-auto mx-auto">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each data as item}
            <div class="w-full col-span-1 rounded-lg overflow-hidden cursor-pointer" on:click={() => {goto(`${item.url}`)}}>
                <Card data={item}/>
            </div>
        {/each}
    </div>
</div>