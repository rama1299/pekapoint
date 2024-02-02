<script>
    import { enableDataToCompare } from '../../../../../stores';
    import Lagend from './template/Lagend.svelte';
	import CompareDetail from './CompareDetail.svelte';
    export let data

    // $: enableData = $enableDataToCompare.map(({ id, enable }) => {
    //     const matchingItem = data.find(item => item.product_id === id && enable);
    //     return matchingItem;
    // }).filter(Boolean);

    // $: color = $enableDataToCompare.map((data) => {
    //     return data.enable ? data.backgroundColor : ''
    // }).filter(Boolean)

    $:datas = JSON.parse(data[0].datas)
    $: key = datas.filter(data => data.code !== 'Miscellaneous').map(data => data.title);

    // let widthContainerLagend
    // $: widthContainerLagend
    // let heightContainerLagend
    // $: heightContainerLagend = heightContainerLagend - 80
    // $: heightCol = heightContainerLagend / enableData.length

    // setTimeout(() => {
    //     console.log(enableData)
    // }, 1000);


</script>

<div class="w-full flex h-auto gap-5">
    <!-- <div class="w-1/12 h-screen sticky top-16 lg:top-20" bind:offsetHeight={heightContainerLagend} bind:offsetWidth={widthContainerLagend}>
        {#each enableData as data, i (i)}
            <Lagend color={color[i]} heightCol={heightCol} widthContainerLagend={widthContainerLagend} title={data.title}/>
        {/each}
    </div> -->
    <div class="w-full space-y-10">
        {#each key as title}
            <CompareDetail key={title} data={data}/>
        {/each}
    </div>
</div>