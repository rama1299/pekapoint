<script>
  import { onMount } from "svelte";
    import Layout from "../../lib/components/layout/Layout.svelte";
  import { Translate } from "../../helpers/translate";
  import About from "./components/About.svelte";
  import OurServices from "./components/OurServices.svelte";

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
  <div class="w-full pt-12 lg:pt-0">
    <div class="w-full bg-sekunder-50">
      <div class="wrapper">
        <div class="w-full py-20 flex justify-center items-center">
          <About/>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="wrapper">
        <div class="w-full py-20 flex justify-center items-center">
          <OurServices/>
        </div>
      </div>
    </div>
  </div>
</Layout>