<script>
	import { goto } from '$app/navigation';
	import ComparePrice from './components/comparePrice/ComparePrice.svelte';
  import { enableDataToCompare } from './../../../stores.js';
	import CompareSummary from './components/compareSummary/CompareSummary.svelte';
	import CompareImage from './components/compareImage/CompareImage.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';
  import CompareDetailList from './components/compareDetail/CompareDetailList.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import Lagend from './components/compareDetail/template/Lagend.svelte';
  import { Translate } from '../../../helpers/translate';

  onMount(async () => {
    if (data.status == 'error') {
      goto(`/error`)
    }
    enableData = dataProduct.map((item, i) => {
            return {
                id : item.id,
                borderColor : colorBorder[i],
                backgroundColor : colorBackground[i],
                radarColor: colorRadar[i],
                enable : true
            }
        })

        enableDataToCompare.set(enableData)

        let translateSpec = await Translate.compareSpec(data.dataSpec)
        dataSpec = translateSpec
    })

    export let data
    let dataAds = data.dataAds

    let dataProduct = data.dataProduct
    let dataSpec = data.dataSpec
    let status = data.status
    let enableData
    let title = dataProduct.map(item => item.title).join(' vs ')
    
    let colorBorder = ['border-blue-500', 'border-pink-500', 'border-orange-500', 'border-teal-500']
    let colorRadar = ['rgb(52, 152, 219, 0.4)', 'rgb(233, 30, 99, 0.4)', 'rgb(255, 152, 0, 0.4)', 'rgb(0, 150, 136, 0.4)']
    let colorBackground = ['blue', 'pink', 'orange', 'teal']


    $: dataSpecWithAdd = dataSpec.map((item, i) => {
      const findProduct = dataProduct.find((product) => product.id === item.product_id)
      if (findProduct) {
        return {
          ...item,
          title: findProduct.title
        }
      } else {
        return {
          ...item,
          title: 'Default Title'
        }
      }
    })

    let widthContainerLagend
    $: widthContainerLagend
    let heightContainerLagend
    $: heightContainerLagend = heightContainerLagend - 80
    $: heightCol = heightContainerLagend / dataProduct.length

    let color = ['blue', 'pink', 'orange', 'teal']

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={`comparison ${title}`} />
</svelte:head>
{#if data.status != 'error'}
  <Layout isDetailProductPage={true} >
  {#if status === 'success'}
    <main class="w-full h-auto mx-auto bg-white pt-4 lg:pt-0">
      <div class="w-full lg:w-[80%] mx-auto px-5 py-10 space-y-10">
          <CompareImage data={dataProduct}/>
      </div>
      {#if dataAds != []}
        {#each dataAds as ads}
          {#if ads.content_position == 'top'}
          <div class="w-full lg:w-[80%] mx-auto my-7 flex justify-center items-center h-24">
            {@html ads}
          </div>
          {/if}
        {/each}
      {/if}
      <div class="w-full flex">
        {#if dataAds != []}
          {#each dataAds as ads}
            {#if ads.content_position == 'left'}
            <div class="w-full lg:w-[10%] h-screen mt-24 sticky top-0 pt-14 hidden lg:flex justify-center items-center">
              <div class="w-full h-[80%] flex justify-center items-center">
                {@html ads.content}
              </div>
            </div>
            {/if}
          {/each}
        {/if}
        <div class="w-full lg:w-[80%] pr-5 pl-2 lg:px-5 flex gap-2 lg:gap-5 mx-auto">
          <div class="w-1/12 h-screen sticky top-5 divide-y-2" bind:offsetHeight={heightContainerLagend} bind:offsetWidth={widthContainerLagend}>
              {#each dataProduct as data, i (i)}
                  <Lagend color={color[i]} heightCol={heightCol} widthContainerLagend={widthContainerLagend} title={data.title} lagendIndex={i}/>
              {/each}
          </div>
          <div class="w-11/12 space-y-10">
            <CompareSummary data={dataSpecWithAdd}/>
            <CompareDetailList data={dataSpecWithAdd}/>
          </div>
        </div>
        {#if dataAds != []}
          {#each dataAds as ads}
            {#if ads.content_position == 'left'}
            <div class="w-full lg:w-[10%] h-screen mt-24 sticky top-0 pt-14 hidden lg:flex justify-center items-center">
              <div class="w-full h-[80%] flex justify-center items-center">
                {@html ads.content}
              </div>
            </div>
            {/if}
          {/each}
        {/if}
      </div>
      <div class="w-full lg:w-[80%] mx-auto px-5 py-10 space-y-10">
          <ComparePrice data={dataSpecWithAdd}/>
      </div>
  </main> 
  {/if}

  </Layout>
{/if}