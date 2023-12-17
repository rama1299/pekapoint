<script>
	import CompareDetail from './CompareDetail.svelte';
    export let data

    $:datas = JSON.parse(data[0].datas)
    $: key = datas.filter(data => data.title !== 'Miscellaneous').map(data => data.title);

</script>

<div class="w-full space-y-10">
    {#each key as title}
        <CompareDetail key={title} data={data}/>
    {/each}
</div>