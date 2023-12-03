<script>
  import ChartDonut from "./ChartDonut.svelte";
  import {removeHtmlTags} from '../../../../../../helpers/removeHtmlTags'
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher()

    export let data
    let dataDescription = JSON.parse(data.summary).Performance

    let cleanedDesc = dataDescription.map(item => {
        return {
            title: item.title,
            score: item.score,
            spec: removeHtmlTags(item.spec)
        };
    });
    
</script>
<div class="w-full space-y-5  divide-y-2">
    <div class="w-full space-y-3"> 
        <div class=" w-full flex justify-between">
            <div class="flex items-center w-5/6">
                <p class=" text-3xl font-semibold">{data.title}</p>
            </div>
            <div class="h-11 w-11 rounded-full relative flex justify-center items-center">
                <ChartDonut score={data.spec_score}/>
                <p class="absolute w-full h-full top-[10px] text-center flex justify-center score font-semibold">90</p>
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
            <div class="flex justify-center items-center text-blue-500 hover:text-blue-600 gap-2 cursor-pointer lg:w-1/2 mx-auto">
                <p class="font-medium">Show more</p>
                <i class='bx bx-down-arrow-alt text-2xl'></i>
            </div>
        </div>
    </div>
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">Color</p>
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
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">Capacity</p>
            <div class="grid grid-cols-3 gap-3 font-medium">
                <div class="flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                    <p>4/64 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                    <p>6/64 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                    <p>4/128 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                    <p>6/128 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full py-2 lg:py-0 lg:h-24 flex-col">
                    <p>8/128 GB</p>
                </div>
            </div>
        </div>
        <div></div>
</div>
