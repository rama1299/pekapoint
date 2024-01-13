<script>
  import Footer from "./template/Footer.svelte";
  import Header from "./template/Header.svelte";
  import { onMount } from "svelte";
  import {checkIpInfo} from '../../../helpers/checkIpInfo.js'

  onMount(async() => {
    await checkIpInfo()
  })

  export let isProductPage
  export let isDetailProductPage
</script>

<Header {isProductPage} {isDetailProductPage}></Header>
<slot/>
<Footer></Footer>