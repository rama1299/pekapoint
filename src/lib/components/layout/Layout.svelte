<script>
	import { page } from '$app/stores';
  import Footer from "./template/Footer.svelte";
  import Header from "./template/Header.svelte";
  import { onMount } from "svelte";
  import {checkIpInfo} from '../../../helpers/checkIpInfo.js'
  import product from '../../../helpers/product.json'
  import TagCompare from "./template/TagCompare.svelte";

  onMount(async() => {
    await checkIpInfo()
  })

  export let isProductPage = false
  export let isDetailProductPage = false

  $: category = 'smartphone'
  $: findDataCategory = product.find((item) => {
        let findData = item.category === category
        return findData
  })
  $: titleData = findDataCategory.title
</script>

<Header {isProductPage} {isDetailProductPage} {titleData}></Header>
<slot/>
<!-- {#if $page.url.pathname == '/compare' || $page.url.pathname == '/product'}
  <TagCompare/>
{/if} -->
<Footer></Footer>