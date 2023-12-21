<script>
	import ComparePrice from './components/comparePrice/ComparePrice.svelte';
  import { enableDataToCompare } from './../../../stores.js';
	import CompareSummary from './components/compareSummary/CompareSummary.svelte';
	import CompareImage from './components/compareImage/CompareImage.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';
  import CompareDetailList from './components/compareDetail/CompareDetailList.svelte';
  import { onMount, afterUpdate } from 'svelte';

  onMount(() => {
        document.addEventListener('scroll', handleLagend);
    
        return () => {
        document.removeEventListener('scroll', handleLagend);
        };
    })

    export let data
    let dataProduct = data.dataProduct
    let dataSpec = data.dataSpec
    let isLagend = false

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

    function handleLagend() {

      const compareDetailList = document.getElementById('compareDetailList')
      const compareDetailListRect = compareDetailList.getBoundingClientRect()
      const negativeHeight = Math.abs(compareDetailListRect.height - 500) * -1

      if (compareDetailListRect.top < 200 && compareDetailListRect.top > negativeHeight) {
        isLagend = true
      } else {
        isLagend = false
      }
    }

</script>
<Layout isDetailProductPage={true} >
    <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
        <div id="container1" class="container lg:w-wrap bg-white mx-auto px-5 py-10 space-y-10">
            <CompareImage data={dataProduct}/>
            <CompareSummary data={dataSpecWithAdd}/>
            <div id="compareDetailList">
              <CompareDetailList data={dataSpecWithAdd}/>
            </div>
            <ComparePrice data={dataSpecWithAdd}/>
        </div>
        <!-- <div class="w-20 h-screen bg-black hidden lg:fixed top-20 {isLagend ? 'left-0' : '-left-20'} duration-300 ease-in-out">

        </div> -->
    </main>
  </Layout>