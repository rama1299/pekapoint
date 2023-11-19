<script>
	import Card from './Card.svelte';
	import Tabs from './Tabs.svelte';
	import Afiliate from './Afiliate.svelte';
	import TagCompare from './../layout/TagCompare.svelte';
	import Ranking from './../../../routes/products/components/Ranking.svelte';  

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
      <Ranking value={item.rank}/>
  </Card>
  <Afiliate/>
  <Tabs data={item.Specs} on:message={handleMessage}/>
  </div>
  <TagCompare/>
</div>

<style>

</style>