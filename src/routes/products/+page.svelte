<script>
    import ProductList from './components/ProductList.svelte';
	import FilterBar from './components/FilterBar.svelte';
    import Layout from '../../lib/components/layout/Layout.svelte';

    export let data
    $: data = data.data

</script>

<Layout isProductPage={true}>
    <div class="w-full h-96 bg-cover bg_gradient">
        <div class="container lg:w-wrap font-monst h-full pt-44 mx-auto">
            <h1 class="text-5xl font-bold text-white">Products</h1>
        </div>
    </div>
    <main class="container lg:w-wrap font-monst m-auto space-y-4 py-5">
        <div class="w-full px-2">
            <FilterBar/>
        </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row m-auto gap-4 px-1">
            {#each data as item (item.id)}
                <ProductList item={item}/>
            {/each}
        </div>
    </main>
</Layout>

<style>
    .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    }
</style>