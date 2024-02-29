<script>
	import RadarChart from './RadarChart.svelte';
  import { onMount } from "svelte";
  import { removeHtmlTags } from "../../../../../../helpers/removeHtmlTags";
  import { Translate } from '../../../../../../helpers/translate';
  export let data

  let text = ['Summary']

  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate

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

//   toTopContainer()
  }

  function toTopContainer() {
    const container = document.getElementById('containerSummary')

    if (container) {
        const rect = container.getBoundingClientRect();
            const scrollY = window.scrollY + rect.top - 300;

            window.scrollTo({
                top: scrollY,
                behavior: 'smooth'
            });
    }
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

$: datas = datas.map(data => {
    if (data.code.toLocaleLowerCase() !== 'miscellaneous' && data.code.toLocaleLowerCase() !== 'connectivity') {
        return {
            ...data
        };
    }
    return undefined;
}).filter(Boolean);


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
<div id=containerSummary class="w-full space-y-5">
    <div class="w-full space-y-3">
        <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
            <p class="text-xl font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{text[0]}</p>
        </div>
        <div class="w-full flex flex-row-reverse lg:block mx-auto gap-2 border-sekunder-100 border-2 rounded-lg pb-5">
            <div class="w-1/6 lg:w-full grid grid-rows-8 lg:grid-cols-8 divide-sekunder-100 lg:divide-y-0 divide-x-0 lg:divide-x-2 border-sekunder-100 border-y-2 lg:border-y-0 border-l-0 lg:border-r-0  h-96 lg:h-auto lg:static sticky top-12">
                {#each datas as data, index (index, data.title)}
                    {#each btnTabs as btn, i (i,btn.name )}
                        {#if data.code.toLocaleLowerCase() == btn.name.toLocaleLowerCase()}
                        <div class="w-full col-span-1 lg:py-2 flex justify-center items-center cursor-pointer {btn.active ? 'bg-sekunder-100' : 'bg-sekunder-50 group'} " on:click={() => {handleTabs(index, btn.name)}}>
                            <i class="{btn.className} {btn.active ? 'text-sekunder-950' : ''} text-2xl lg:group-hover:text-sekunder-950" ></i>
                        </div>
                        {/if}
                    {/each}
                {/each}
            </div>
            <div class="w-5/6 lg:w-full lg:p-5">
                <div class=" w-full flex justify-start gap-2 item-center py-3 px-5 ">
                    <div class="flex items-center">
                        <p class=" text-xl font-semibold">{datas[index].title}</p>
                    </div>
                </div>
                <div class="w-full flex lg:flex-row flex-col-reverse lg:justify-start justify-center gap-5 lg:relative">
                    <div class="w-full lg:w-1/2 flex justify-center ">
                        <div class="w-full lg:w-4/6 aspect-square ">
                            <RadarChart dataRadar={dataRadarLimit}/>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 rounded-lg  py-0 lg:py-5 px-5 space-y-2 lg:absolute -top-16 right-0 lg:overflow-auto lg:max-h-[425px]">
                        {#each datas[index].attributes as spec, i (i)}
                             {#if spec.spec.toLocaleLowerCase() != 'yes' && spec.spec.toLocaleLowerCase() != 'no' && spec.spec != ''}
                                 <div class="leading-tight w-full text-sekunder-950 ">
                                     <div class="w-full">
                                         <div class="text-start font-semibold">{spec.title}</div>
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
</div>
