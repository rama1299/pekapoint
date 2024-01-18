<script>
    import FormCompare from "./template/FormCompare.svelte";
    import SearchEngine from "./template/SearchEngine.svelte";
    export let data

    $: category = 'smartphone'
    $: findDataCategory = data.find((item) => {
        let findData = item.category === category
        return findData
    })
    $: titleData = findDataCategory.title
</script>

<div class="w-full h-[700px] lg:h-[870px] bg-cover bg_gradient flex justify-center items-center relative">
    <div class="container lg:w-wrap flex flex-col justify-center items-center gap-8 lg:gap-16">
        <div class="text-center space-y-2">
            <p class="text-3xl lg:text-7xl font-bold text-white">Welcome to Specwar</p>
            <p class="text-xl lg:text-3xl font-medium text-white">Compare Item Specifications</p>
        </div>
        <!-- <FormCompare data={titleData}/> -->
        <SearchEngine data={titleData}/>
    </div>
</div>

<style>
        .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    }
</style>