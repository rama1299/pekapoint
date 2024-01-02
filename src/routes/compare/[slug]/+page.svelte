<script>
	import ComparePrice from './components/comparePrice/ComparePrice.svelte';
  import { enableDataToCompare } from './../../../stores.js';
	import CompareSummary from './components/compareSummary/CompareSummary.svelte';
	import CompareImage from './components/compareImage/CompareImage.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';
  import CompareDetailList from './components/compareDetail/CompareDetailList.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import Lagend from './components/compareDetail/template/Lagend.svelte';

  onMount(() => {
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
    })

    export let data
    let dataProduct = data.dataProduct
    let dataSpec = data.dataSpec
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
<Layout isDetailProductPage={true} >
    <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
        <div class="container lg:w-wrap bg-white mx-auto px-5 py-10 space-y-10">
            <CompareImage data={dataProduct}/>
        </div>
            <div class="container lg:w-wrap bg-white pr-5 pl-2 lg:px-5 flex gap-2 lg:gap-5 mx-auto">
              <div class="w-2/12 lg:w-1/12 h-screen sticky top-16 lg:top-20 divide-y-2" bind:offsetHeight={heightContainerLagend} bind:offsetWidth={widthContainerLagend}>
                  {#each dataProduct as data, i (i)}
                      <Lagend color={color[i]} heightCol={heightCol} widthContainerLagend={widthContainerLagend} title={data.title} lagendIndex={i}/>
                  {/each}
              </div>
              <div class="w-10/12 lg:w-11/12">
                <CompareSummary data={dataSpecWithAdd}/>
                <CompareDetailList data={dataSpecWithAdd}/>
              </div>
            </div>
        <div class="container lg:w-wrap bg-white mx-auto px-5 py-10 space-y-10">
            <ComparePrice data={dataSpecWithAdd}/>
        </div>
    </main>
  </Layout>