<script>
  import Footer from "./template/Footer.svelte";
  import Header from "./template/Header.svelte";

  export let isProductPage
  export let isDetailProductPage
</script>

<Header {isProductPage} {isDetailProductPage}></Header>
<slot/>
<Footer></Footer>