<script>
	import Card from './template/Card.svelte';
	import Tabs from './template/Tabs.svelte';
	import Afiliate from './template/Afiliate.svelte';
	import TagCompare from './template/TagCompare.svelte';
  import ChartDonut from './template/ChartDonut.svelte';

  export let item

  let tabControl = {
        isDisplay: false,
        isPerformance: true,
        isCamera: false,
        isBattery: false,
        isAudio: false
    }

  function handleMessage(event) {
    tabControl= event.detail.object
  }


</script>

<div class="w-full h-fit cursor-default bg-white rounded-lg overflow-hidden shadow-lg">
  <div>
    <Card data={item} tabControl={tabControl} specs={item.summary}/>
    <Afiliate data={item.affiliate} slug={item.slug}/>
    <Tabs data={item.summary} geekbench_score={item.geekbench_score} antutu_score={item.antutu_score} on:message={handleMessage}/>
    </div>
    <TagCompare/>
</div>

<style>

</style>