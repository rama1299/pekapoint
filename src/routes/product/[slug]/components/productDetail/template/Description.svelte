<script>
  import ChartDonut from "./ChartDonut.svelte";

    export let data
    
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
                {data.summary}
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
    </div>
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">Color</p>
            <div class="grid grid-cols-6 lg:grid-cols-3 gap-3 text-sm">
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-sky-500 rounded-full"></div>
                    <p class="hidden lg:static">Sky Blue</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-indigo-500 rounded-full"></div>
                    <p class="hidden lg:static">Galaxy Purple</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-gray-100 rounded-full"></div>
                    <p class="hidden lg:static">White Pearl</p>
                </div>
    
                <div class="flex justify-center items-center lg:border-2 w-full lg:h-24 flex-col">
                    <div class="w-6 h-6 lg:w-10 lg:h-10 bg-orange-500 rounded-full"></div>
                    <p class="hidden lg:static">Sunset</p>
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
