<script>
	import Card from './productList/Card.svelte';
	import Tabs from './productList/Tabs.svelte';
	import Afiliate from './productList/Afiliate.svelte';
	import TagCompare from './productList/TagCompare.svelte';
  import ChartDonut from './productList/ChartDonut.svelte';
  export let item

  let tabControl = {
        isDisplay: true,
        isPerformance: false,
        isCamera: false,
        isBattery: false,
        isAudio: false
    }

  function handleMessage(event) {
    tabControl= event.detail.object
  }
</script>

<div class="w-full cursor-default bg-white rounded-lg overflow-hidden shadow-lg">
  <div>
    <Card data={item} tabControl={tabControl}>
      <ChartDonut score={item.rank}></ChartDonut>
  </Card>
  <Afiliate/>
  <Tabs data={item.Specs} on:message={handleMessage}/>
  </div>
  <TagCompare/>
</div>

<style>

</style>