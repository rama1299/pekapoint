<script>
  import { onMount } from "svelte";
    import Layout from "../../lib/components/layout/Layout.svelte";
  import { Translate } from "../../helpers/translate";

  let text = ['About Us']
    onMount(async() => {
      let translate = await Translate.client(text)
      text = translate
    })
</script>

<svelte:head>
  <title>{text[0]}</title>
</svelte:head>
<Layout>
  <!-- <div class="w-full h-52 lg:h-80 bg-cover bg_gradient">
    <div class="w-full lg:w-[90%] font-monst h-full pt-24 px-3 lg:px-0 lg:pt-40 mx-auto">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">{text[0]}</h1>
    </div>
</div> -->

  <main class="w-auto min-h-screen mx-auto">
    <div class="wrapper pt-20">
      <p class="text-2xl text-sekunder-950 font-semibold">Page Contact</p>
    </div>
  </main>
</Layout>

<style>
  .bg_gradient {
      background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
  }
</style>