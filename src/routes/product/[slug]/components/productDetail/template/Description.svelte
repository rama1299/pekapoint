<script>
import Cookies from "js-cookie";
  import {removeHtmlTags} from '../../../../../../helpers/removeHtmlTags'
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import DoughnutChart from './DoughnutChart.svelte';
  import { Translate } from "../../../../../../helpers/translate";

//   let dispatch = createEventDispatcher()
    let text = ['Variant', 'Color']
  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
    if (data.colors) {
        colors = JSON.parse(data.colors).map((color) => {
        return {
            name: color,
            class: color.toLowerCase() == 'black' || color.toLowerCase() == 'white' ? `bg-${color.toLowerCase()}` : `bg-${color.toLowerCase()}-500`
        }
    })
    }
  })


    export let data
    export let variant = []
    let colors = []

    // const variantPrices = variant.map((data) => {
    //     let price = data.prices.map((item) => {
    //         return {
    //             ...item,
    //             variant: data.variant
    //         }
    //     })
    //     return price
    // })

    // $: styleButton = variant.map((data) => {
    //     return {
    //         active : false
    //     }
    // })

    // function handleVariantPrice(variantRam, index) {
    //     dispatch('message', {
    //         ram: variantRam
    //     })

    //     styleButton = styleButton.map((data, i)=> {
    //         return {
    //             ...data,
    //             active : i == index
    //         }
    //     })
    // }

    let summaryJson = JSON.parse(data.summary)
    let summaryKey = Object.keys(summaryJson)[0]
    let dataDescription = summaryJson[summaryKey]

    let cleanedDesc = dataDescription.map(item => {
        return {
            title: item.title,
            score: item.score,
            spec: item.spec
        };
    });

    // function exchangePrice(currency, price) {
    //     let exchange = Cookies.get('exchange')
    //     let geoInfo = Cookies.get('geoInfo')
        
    //     if (exchange && geoInfo) {

    //         exchange = JSON.parse(exchange)
    //         geoInfo = JSON.parse(geoInfo)

    //         let codeGeoInfo = geoInfo.currency

    //         if (codeGeoInfo.length > 3) {
    //             let arrayCode = codeGeoInfo.split(',')
    //             codeGeoInfo = arrayCode[0]
    //         }

    //         const rateEur = exchange.find((item) => item.code == 'EUR').rate
    //         const rateUser = exchange.find((item) => item.code == codeGeoInfo.toUpperCase()).rate

    //         const convert = Math.ceil((parseFloat(price) / rateEur) * rateUser)
    //         return `${codeGeoInfo.toUpperCase()} ${convert}`
    //     } else {
    //         return `${currency} ${price}`
    //     }
    // }

</script>
<div class="w-full space-y-5 pt-5 lg:pt-10">
    <div class="space-y-5">
        <div class="w-full space-y-3"> 
            <div class=" w-full flex justify-between">
                <div class="flex items-center w-5/6">
                    <p class=" text-3xl font-semibold">{data.title}</p>
                </div>
                <div class="h-11 w-11 rounded-full relative flex justify-center items-center">
                    <DoughnutChart data={data.spec_score}/>
                    <p class="absolute w-full h-full top-[10px] text-center flex justify-center score font-semibold">{data.spec_score}</p>
                </div>
            </div>
            <div class="text-sekunder-950 space-y-2">
                {#each cleanedDesc as desc}
                    <div class="leading-5">
                        <p class="text-start font-semibold">{desc.title}</p>
                        <p class="italic">{@html desc.spec}</p>
                    </div>
                {/each}
            </div>
            <!-- <div class="w-full">
                <slot/>
            </div> -->
        </div>
        <div></div>
    </div>

    {#if variant.length > 0}
         <div class="space-y-5">
             <div class="space-y-3 pt-3">
                <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
                    <p class="text-xl font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{text[0]}</p>
                </div>
                 <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 font-medium">
                     {#each variant as data, index}
                        <!-- <div class="text-sm flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col cursor-pointer hover:bg-sky-100 {styleButton[index].active === true ? 'border-sky-500' : ''}" on:click={()=> {handleVariantPrice(data[0].variant, index)}}>
                        </div> -->
                        <div class="text-sm flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                        <p class="w-full flex justify-center items-center">{`${data.ram} GB / ${data.storage} GB`}</p>
                         <!-- <p>From {exchangePrice(data[0].currency, data[0].price)}</p> -->
                     </div>
                     {/each}
                 </div>
             </div>
             <div></div>
         </div>
    {/if}

    {#if colors.length > 0}
        <div class="space-y-5">
            <div class="space-y-3 pt-3">
                <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
                    <p class="text-xl font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{text[1]}</p>
                </div>
                <div class="grid grid-cols-6 lg:grid-cols-3 gap-3 text-sm">
                {#each colors as color}
                        <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                            <div class="w-6 h-6 lg:w-10 lg:h-10 {color.class} rounded-full border"></div>
                            <p class="hidden lg:block">{color.name}</p>
                        </div>
                {/each}
                </div>
            </div>
            <div></div>
        </div>
    {/if}
</div>
