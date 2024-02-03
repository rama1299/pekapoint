<script>
import Cookies from "js-cookie";
  import {removeHtmlTags} from '../../../../../../helpers/removeHtmlTags'
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import DoughnutChart from './DoughnutChart.svelte';
  import { Translate } from "../../../../../../helpers/translate";

  let dispatch = createEventDispatcher()
    let text = ['Variant', 'Color']
  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
  })

    export let data
    export let variant = []

    const variantPrices = variant.map((data) => {
        let price = data.prices.map((item) => {
            return {
                ...item,
                variant: data.variant
            }
        })
        return price
    })

    $: styleButton = variant.map((data) => {
        return {
            active : false
        }
    })

    function handleVariantPrice(variantRam, index) {
        dispatch('message', {
            ram: variantRam
        })

        styleButton = styleButton.map((data, i)=> {
            return {
                ...data,
                active : i == index
            }
        })
    }

    let summaryJson = JSON.parse(data.summary)
    let summaryKey = Object.keys(summaryJson)[0]
    let dataDescription = summaryJson[summaryKey]

    let cleanedDesc = dataDescription.map(item => {
        return {
            title: item.title,
            score: item.score,
            spec: removeHtmlTags(item.spec)
        };
    });

    function exchangePrice(currency, price) {
        let exchange = Cookies.get('exchange')
        let geoInfo = Cookies.get('geoInfo')
        
        if (exchange && geoInfo) {

            exchange = JSON.parse(exchange)
            geoInfo = JSON.parse(geoInfo)

            let codeGeoInfo = geoInfo.currency

            if (codeGeoInfo.length > 3) {
                let arrayCode = codeGeoInfo.split(',')
                codeGeoInfo = arrayCode[0]
            }

            const rateEur = exchange.find((item) => item.code == 'EUR').rate
            const rateUser = exchange.find((item) => item.code == codeGeoInfo.toUpperCase()).rate

            const convert = Math.ceil((parseFloat(price) / rateEur) * rateUser)
            return `${codeGeoInfo.toUpperCase()} ${convert}`
        } else {
            return `${currency} ${price}`
        }
    }

    
</script>
<div class="w-full space-y-5 pt-5 lg:pt-10">
    <div class="divide-y-2 space-y-5">
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
            <div>
                {#if data.summary}
                    {#each cleanedDesc as desc}
                        <p class="text-start font-medium">{desc.title}</p>
                        <p class="italic">{desc.spec}</p>
                    {/each}
                {:else}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                        recusandae alias error harum maxime adipisci amet laborum.</p>
                {/if}
                
            </div>
            <div class="w-full">
                <slot/>
            </div>
        </div>
        <div></div>
    </div>

    {#if variant.length > 0}
         <div class="divide-y-2 space-y-5">
             <div class="space-y-3 pt-3">
                 <p class="text-2xl font-semibold">{text[0]}</p>
                 <div class="grid grid-cols-3 gap-3 font-medium">
                     {#each variantPrices as data, index}
                     <div class="text-sm lg:text-base flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col cursor-pointer hover:bg-sky-100 {styleButton[index].active === true ? 'border-sky-500' : ''}" on:click={()=> {handleVariantPrice(data[0].variant, index)}}>
                         <p>{data[0].variant}</p>
                         <!-- <p>From {exchangePrice(data[0].currency, data[0].price)}</p> -->
                     </div>
                     {/each}
                 </div>
             </div>
             <div></div>
         </div>
    {/if}

    <div class="divide-y-2 space-y-5">
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">{text[1]}</p>
            <div class="grid grid-cols-6 lg:grid-cols-3 gap-3 text-sm">
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-sky-500 rounded-full"></div>
                    <p class="hidden lg:block">Sky Blue</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-indigo-500 rounded-full"></div>
                    <p class="hidden lg:block">Galaxy Purple</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-gray-100 rounded-full"></div>
                    <p class="hidden lg:block">White Pearl</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-orange-500 rounded-full"></div>
                    <p class="hidden lg:block">Sunset</p>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</div>
