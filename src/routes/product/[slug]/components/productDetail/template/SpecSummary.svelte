<script>
	import RadarChart from './RadarChart.svelte';
  import { onMount } from "svelte";
  import ChartDonut from "./ChartDonut.svelte";
  import Radar from "./Radar.svelte";
  import { removeHtmlTags } from "../../../../../../helpers/removeHtmlTags";
  export let data

  onMount(() => {
    btnTabs = btnTabs.map((btn) => {
        return {
        ...btn,
        active: btn.name === datas[index].title,
        };
    });
  })
  let datas = JSON.parse(data.datas)

  function handleTabs(i, btnName) {
    index = i

    btnTabs = btnTabs.map((btn) => {
    return {
      ...btn,
      active: btn.name === btnName,
    };
  });
  }

$: index = 0
$: dataRadar = datas[index].attributes.map(data => {
    if (data.spec.toLocaleLowerCase() != 'no' && data.spec.toLocaleLowerCase() != 'yes' && data.spec != '')
    return {
        label: data.title,
        score: data.score
    }
}).filter(Boolean)

$: dataRadarLimit = dataRadar.slice(0, 8)
setTimeout(() => {
    console.log(dataRadarLimit)
    
}, 1000);

$: datas = datas.map(data => {
    if (data.title.toLocaleLowerCase() != 'miscellaneous') {
        return {
            ...data
        }
    }
    return undefined
}).filter(Boolean)

    $: btnTabs = [
        {
            name: 'Design',
            className: 'bx bx-mobile-alt',
            active: false
        },
        {
            name: 'Display',
            className: 'bx bx-fullscreen',
            active: false
        },
        {
            name: 'Performance',
            className: 'bx bx-microchip',
            active: false
        },
        {
            name: 'Cameras',
            className: 'bx bx-camera',
            active: false
        },
        {
            name: 'Operating System',
            className: 'bx bx-cog',
            active: false
        },
        {
            name: 'Battery',
            className: 'bx bx-battery',
            active: false
        },
        {
            name: 'Audio',
            className: 'bx bx-music',
            active: false
        },
        {
            name: 'Features',
            className: 'bx bx-plus',
            active: false
        },
    ]
</script>
<div class="w-full space-y-5 divide-y-2">
    <div class="w-full space-y-3">
        <p class="text-2xl font-semibold">Summary</p>
        <div class="w-full flex flex-row-reverse lg:block mx-auto gap-2 border-gray-100 border-2 rounded-lg pb-5">
            <div class="w-1/6 lg:w-full grid grid-rows-8 lg:grid-cols-8 divide-gray-200 lg:divide-y-0 divide-y-2 divide-x-0 lg:divide-x-2 border-gray-100 border-y-2 lg:border-y-0 border-l-0 lg:border-r-0  h-96 lg:h-auto lg:static sticky top-12">
                {#each datas as data, index (index, data.title)}
                    {#each btnTabs as btn, i (i,btn.name )}
                        {#if data.title.toLocaleLowerCase() == btn.name.toLocaleLowerCase()}
                        <div class="w-full col-span-1 lg:py-2 flex justify-center items-center {btn.active ? 'bg-gray-200' : 'bg-gray-100 group'} " on:click={() => {handleTabs(index, btn.name)}}>
                            <i class="{btn.className} {btn.active ? 'text-blue-600' : ''} text-2xl lg:group-hover:text-blue-600" ></i>
                        </div>
                        {/if}
                    {/each}
                {/each}
            </div>
            <div class="w-5/6 lg:w-full lg:p-5">
                <div class=" w-full flex justify-start gap-3 item-center py-3 px-5 ">
                    <div class="h-8 w-8 rounded-full relative">
                        <ChartDonut score={datas[index].score}/>
                        <p class="absolute w-full h-full inset-0 text-center items-center flex justify-center score text-sm font-semibold">{datas[index].score}</p>
                    </div>
                    <div class="flex items-center">
                        <p class=" text-xl font-semibold">{datas[index].title}</p>
                    </div>
                </div>
                <div class="w-full flex lg:flex-row flex-col-reverse lg:justify-start justify-center gap-5 lg:relative">
                    <div class="w-full lg:w-1/2 flex justify-center ">
                        <div class="w-full lg:w-4/6 aspect-square ">
                            <!-- <Radar data={dataRadar}/> -->
                            <RadarChart dataRadar={dataRadarLimit}/>
                        </div>
                        <!-- <RadarChart dataRadar={dataRadar}/> -->
                    </div>
                    <div class="w-full lg:w-1/2 rounded-lg  py-0 lg:py-5 px-5 space-y-2 lg:absolute -top-16 right-0 lg:overflow-auto lg:max-h-[425px]">
                        {#each datas[index].attributes as spec, i (i)}
                             {#if spec.spec.toLocaleLowerCase() != 'yes' && spec.spec.toLocaleLowerCase() != 'no' && spec.spec != ''}
                                 <div class="leading-tight w-full ">
                                     <div class="w-full">
                                         <div class="text-start font-medium">{spec.title}</div>
                                     </div>
                                     <div>
                                         <div class="italic">{removeHtmlTags(spec.spec)}</div>
                                     </div>
                                 </div>
                             {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div></div>
</div>
