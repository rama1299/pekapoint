<script>
  import { enableDataToCompare } from './../../../stores.js';
	import CompareSummary from './components/compareSummary/CompareSummary.svelte';
	import CompareImage from './components/compareImage/CompareImage.svelte';
  import Layout from '../../../lib/components/layout/Layout.svelte';
  import CompareDetailList from './components/compareDetail/CompareDetailList.svelte';

    export let data
    let dataProduct = data.dataProduct
    let dataSpec = data.dataSpec
    // let colorBorder = ['border-blue-500', 'border-pink-500', 'border-orange-500', 'border-teal-500']
    // let colorRadar = ['rgb(52, 152, 219, 0.4)', 'rgb(233, 30, 99, 0.4)', 'rgb(255, 152, 0, 0.4)', 'rgb(0, 150, 136, 0.4)']
    // let colorBackground = ['bg-blue-100', 'bg-pink-100', 'bg-orange-100', 'bg-teal-100']



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

    // $: enableDataProduct = dataProduct.filter(item => {
    //     const matchingEnable = $enableDataToCompare.find(enabledItem => enabledItem.id === item.id && enabledItem.enable);
    //     return matchingEnable !== undefined;
    // });

    // $: enableDataSpec = dataSpecWithAdd.filter(item => {
    //     const matchingEnable = $enableDataToCompare.find(enabledItem => enabledItem.id === item.product_id && enabledItem.enable);
    //     return matchingEnable !== undefined;
    // });
    // setTimeout(() => {
    //   console.log(enableDataSpec)
    // }, 1000 );
</script>

<Layout isDetailProductPage={true} >
    <main class="w-auto h-auto mx-auto pt-14 lg:pt-20 bg-gray-50">
        <div class="container lg:w-wrap bg-white mx-auto px-5 lg:p-10 space-y-10">
            <CompareImage data={dataProduct}/>
            <CompareSummary data={dataSpecWithAdd}/>
            <CompareDetailList data={dataSpecWithAdd}/>
        </div>
    </main>
  </Layout>