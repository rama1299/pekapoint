<script>
	import { Translate } from './../../../../helpers/translate.js';
	import Card from './template/Card.svelte';
	import Tabs from './template/Tabs.svelte';
	import Afiliate from './template/Afiliate.svelte';
	import TagCompare from './template/TagCompare.svelte';
  import ChartDonut from './template/ChartDonut.svelte';
  import {onMount} from 'svelte'

  export let item
  let spec = item.summary

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

<div class="w-full h-fit cursor-default bg-white rounded-lg overflow-hidden border border-sekunder-300">
  <div>
    <Card data={item} tabControl={tabControl} specs={spec}/>
    <Afiliate data={item.affiliate} slug={item.slug}/>
    <Tabs data={spec} geekbench_score={item.geekbench_score} antutu_score={item.antutu_score} on:message={handleMessage}/>
    </div>
    <!-- <TagCompare/> -->
</div>


<style>

</style>