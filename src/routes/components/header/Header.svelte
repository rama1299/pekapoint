<script>
	import { page } from '$app/stores';
    import FormCompare from "./template/FormCompare.svelte";
    import SearchEngine from "./template/SearchEngine.svelte";
    import { Translate } from '../../../helpers/translate';
  import { onMount } from 'svelte';
    export let data

    const brand = import.meta.env.VITE_BRAND

    let text = ['Welcome to', 'Discover the best mobile phones with the optimal balance of price and quality!']
    $: category = 'smartphone'
    $: titleData = []

    onMount(async () => {
        const translateText = await Translate.client(text)
        text = translateText

        let findDataCategory = data.find((item) => {
            let findData = item.category === category
            return findData
        })

        if (findDataCategory) {
            titleData = findDataCategory.title
        }
    })
</script>

<div class="w-full h-[600px] lg:h-[750px] flex justify-center items-start pt-52 relative bg-[url('/gradient1.png')]">
    <div class="container flex flex-col justify-center items-center gap-5 lg:gap-14 z-10">
        <div class="text-center px-5 space-y-2">
            <p class="text-2xl lg:text-4xl font-bold text-sekunder-950">{text[0] +' '+ brand}</p>
            <p class="leading-5 lg:text-xl font-medium text-sekunder-950">{text[1]}</p>
        </div>
        <SearchEngine data={titleData}/>
    </div>
</div>

<style>
</style>