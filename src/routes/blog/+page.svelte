<script>
  import Layout from '../../lib/components/layout/Layout.svelte';
  import { goto } from '$app/navigation';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import { currentUser } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import { onMount } from 'svelte';
  import { Translate } from '../../helpers/translate';

  export let data;
  let showUserMenu;
  $: {
    $currentUser = data.currentUser;
  }

  let text = ['Blog']

  onMount(async() => {
    let translate = await Translate.client(text)
    text = translate
  })
</script>

<svelte:head>
  <title>{text[0]}</title>
</svelte:head>

<!-- <WebsiteHeader bind:showUserMenu>
  <div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
    <PrimaryButton type="button" on:click={() => goto('/blog/new')}>New blog post</PrimaryButton>
    <LoginMenu />
  </div>
</WebsiteHeader> -->

<Layout>
  <!-- <div class="w-full h-52 lg:h-80 bg-cover bg_gradient">
    <div class="w-full lg:w-[90%] font-monst h-full pt-24 px-3 lg:px-0 lg:pt-40 mx-auto">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">{text[0]}</h1>
    </div>
</div> -->
  <div class="p-10 min-h-screen">
    <div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
      <div class="font-bold text-sm">LATEST ARTICLES</div>
      {#if data.articles.length === 0}
        <div class="md:text-xl py-4">No blog posts have been published so far.</div>
      {/if}
    </div>
  
    {#each data.articles as article, i}
      <ArticleTeaser {article} firstEntry={i === 0} />
    {/each}
  </div>
</Layout>

<!-- <EditableWebsiteTeaser /> -->

<!-- <Footer counter="/blog" /> -->
<style>
  .bg_gradient {
      background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
  }
</style>
