<script>
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Layout from "../lib/components/layout/Layout.svelte";
  import { Translate } from '../helpers/translate';

  let text = ['Go Back', 'Oops! The page you are looking for might be in another galaxy..']
  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
  })
</script>

<Layout isDetailProductPage={true}>
  <main class="w-full h-screen flex items-center justify-center flex-col bg-gray-50 space-y-4">
    <h1 class="text-4xl font-bold text-sky-500">404 - Not Found</h1>
    <p class="text-lg text-gray-600">{text[1]}</p>
    <button class="px-5 py-1 flex justify-center items-center bg-sky-500 text-white font-semibold rounded-md border-2 border-sky-500 hover:bg-white hover:text-sky-500" on:click={()=>{goto('/')}}>
      {text[0]}
    </button>
  </main>
</Layout>
