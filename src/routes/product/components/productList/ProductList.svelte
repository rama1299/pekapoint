<script>
	import Card from './template/Card.svelte';
	import Tabs from './template/Tabs.svelte';
	import Afiliate from './template/Afiliate.svelte';
	import TagCompare from './template/TagCompare.svelte';
  import ChartDonut from './template/ChartDonut.svelte';

  export let item
  export let specs

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
    <Card data={item} tabControl={tabControl} specs={specs}>
      <ChartDonut score={item.spec_score}></ChartDonut>
  </Card>
  <Afiliate/>
  <Tabs data={specs} on:message={handleMessage}/>
  </div>
  <TagCompare/>
</div>

<style>

</style>