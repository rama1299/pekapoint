<script>
    import Table from "./template/Table.svelte";
    export let data
    
    let datas = JSON.parse(data.datas)
    //hapus data miscellaneous
    $: datas = datas.map(data => {
        if (data.title.toLocaleLowerCase() != 'miscellaneous') {
            return {
                ...data
            }
        }
        return undefined
    }).filter(Boolean)

    let showIndex = 0
    $: data = datas[showIndex]

    function handleShowIndex(i) {
        showIndex = i
    }
</script>

<section class="w-full bg-gray-50">
    <div class="container lg:w-wrap mx-auto py-10 flex justify-center items-start gap-3 lg:gap-5 bg-white px-5 lg:px-10 border">
            <div class="w-1/6 lg:w-1/4 space-y-2 py-1 sticky top-16 lg:top-24">
                {#each datas as item, i (i)}
                     <div class="bg-gray-200 w-full h-[75px] lg:h-20 rounded-md flex justify-center items-center text-md font-medium border-2 hover:border-blue-600" key={i} on:click={() => {handleShowIndex(i)}}>
                        <p>{item.title}</p>
                     </div>
                {/each}
            </div>
        <div class="w-5/6 lg:w-3/4 space-y-10">
            <div class=" w-full">
                <Table data={data.attributes}/>
            </div>
        </div>
    </div>
</section>