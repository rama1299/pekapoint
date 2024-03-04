<script>
  import { onMount } from "svelte";
  import Layout from "../../lib/components/layout/Layout.svelte";
  import { Translate } from "../../helpers/translate";
  import ContactUs from "./components/ContactUs.svelte";

  let text = ['Contact Us']
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
  <div class="w-full py-10 border flex justify-center items-center">
    <div class="w-full min-h-[750px] wrapper flex justify-center items-center">
      <ContactUs></ContactUs>
    </div>
  </div>
</div>
</Layout>