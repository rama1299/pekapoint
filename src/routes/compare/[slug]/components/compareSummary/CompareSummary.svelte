<script>
	import RadarChart from './template/RadarChart.svelte';
  import { onMount, afterUpdate } from "svelte";
  import { enableDataToCompare } from '../../../../../stores';
  import { removeHtmlTags } from '../../../../../helpers/removeHtmlTags';
  import DoughnutChart from './template/DoughnutChart.svelte';
  import { Translate } from '../../../../../helpers/translate';
  export let data

  $: data = data
  let text = ['Summary']

  let specTitle = JSON.parse(data[0].datas)

  function handleTabs(btnName) {
    key = btnName

    btnTabs = btnTabs.map((btn) => {
    return {
      ...btn,
      active: btn.name === btnName,
    };
  });
  }

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

    $: enableData = $enableDataToCompare.map(({ id, enable }) => {
        const matchingItem = data.find(item => item.product_id === id && enable);
        return matchingItem;
    }).filter(Boolean);
    $: dataSpec = enableData.map((data) => {
        const datas = JSON.parse(data.datas)
        const findSpec = datas.find((spec) => spec.code === key)
        return {
            ...findSpec,
            device : data.title,
            radarColor : data.radarColor
        }
    })


    $:radarColor = $enableDataToCompare.map((data) => {
        return data.enable ? data.radarColor : ''
    }).filter(Boolean)

    $:doughnutColor = $enableDataToCompare.map((data) => {
        return data.enable ? data.radarColor : ''
    }).filter(Boolean)

    $:backgroundColor = $enableDataToCompare.map((data) => {
        return data.enable ? `bg-${data.backgroundColor}-000` : ''
    }).filter(Boolean)

    $:borderColor = $enableDataToCompare.map((data) => {
        return data.enable ? `border-${data.backgroundColor}-500` : ''
    }).filter(Boolean)


    $: key = 'Performance'
    let widthContainerSpec
    let screenWidth
    afterUpdate (() => {
        if (screenWidth < 1024) {
            widthColSpec = widthContainerSpec
            styleWidthColSpec = `width: ${widthColSpec}px;`
        } else {
            widthColSpec = widthContainerSpec / 2
            styleWidthColSpec = `width: ${widthColSpec}px;`
        }
        
    })

    let styleWidthColSpec
    let widthColSpec

    let currentIndex = 0
    let scrollContainer

    const nextSlide = () => {
        if (screenWidth < 1024) {
            currentIndex = Math.min(currentIndex + 1, enableData.length - 1); // Batas maksimum indeks
            updateScrollPosition();
        } else {
            currentIndex = Math.min(currentIndex + 1, enableData.length - 2); // Batas maksimum indeks
            updateScrollPosition();
        }
    };
  
    const prevSlide = () => {
      currentIndex = Math.max(currentIndex - 1, 0); // Batas minimum indeks
      updateScrollPosition();
    };
  
    const updateScrollPosition = () => {
      const newScrollPosition = currentIndex * widthColSpec; // Lebar div
      scrollContainer.scrollLeft = newScrollPosition;
    };

    let selectedTitlesSpec = {
        Performance : ['RAM', 'Internal Storage', 'Android Version', 'CPU Speed', 'RAM Speed', 'GPU Clock Speed',],
        Design : ['Volume', 'Height', 'Thickness', 'Width', 'Weight',],
        Display : ['Screen Size', 'Display Type', 'Pixel Density', 'Resolution', 'Refresh Rate', 'Gorilla Glass Version'],
        Cameras : ['Megapixels (main camera)', 'Megapixels (front camera)', 'Video recording (main camera)', 'Wide aperture (main camera)',],
        'Operating System': [],
        Battery : ['Battery power', 'Charging speed',],
        Audio : ['Number of microphones'],
        Features : ['Wi-Fi version', 'Download speed', 'Upload speed', 'SIM cards', 'Bluetooth version']

    }

    $: dataAttributes = dataSpec.map((data) => {
        const dataAttributes = data.attributes
        const attributesFilter = selectedTitlesSpec[key].map((selectedTitle) => {
            const attribute = dataAttributes.find((attr) => attr.code === selectedTitle);

                if (attribute) {
                    return attribute;
                } else {
                    return { title: selectedTitle, score: 0, spec: '' };
                }
            });
    
            return attributesFilter.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            } else {
                return 0;
            }
        });
    })


    $: selectedTitle = selectedTitlesSpec[key]
    $: labelSpec = selectedTitle.sort((a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        })
    
    $: device = enableData.map(data => data.title)
    $: scores = dataAttributes.map((data) => {
            return data.map(item => item.score)
        })

    $: dataRadar = {
            device,
            labelSpec,
            scores
        }

    $: isLagend = enableData.map((data) => {return false})
    function handleLagend(i) {
        if (isLagend[i] == false) {
            radarColor = radarColor.map((color, index) => {
                if (i == index) {
                    return color.slice(0, -2) + "8" + color.slice(-1);
                } else {
                    return color.slice(0, -2) + "2" + color.slice(-1);
                }
            })
            backgroundColor = backgroundColor.map((color, index) => {
                if (i == index) {
                    return color.slice(0, -3) + "500"
                } else {
                    return color.slice(0, -3) + "000"
                }
            })
            isLagend = isLagend.map((item, index) => {return index == i})
        } else {
            radarColor = radarColor.map((color) => {
                return color.slice(0, -2) + "4" + color.slice(-1);
            })
            backgroundColor = backgroundColor.map((color) => {
                return color.slice(0, -3) + "100"
            })
            isLagend = isLagend.map((item) => {return false})
        }
    }

    onMount(async() => {
        let translate = await Translate.client(text, true)
        text = translate
        btnTabs = btnTabs.map((btn) => {
            return {
            ...btn,
            active: btn.name === key,
            };
        });
    })

</script>

<svelte:window bind:innerWidth={screenWidth}/>
<div class="w-full space-y-5 divide-y-2">
    <div class="w-full space-y-3">
        <p class="text-2xl font-semibold">{text[0]}</p>
        <div class="w-full flex flex-row-reverse lg:block mx-auto gap-2 border-gray-100 border-2 rounded-lg space-y-5 pb-3">
            <div class="w-1/6 lg:w-full grid grid-rows-8 lg:grid-cols-8 divide-gray-200 lg:divide-y-0 divide-y-2 divide-x-0 lg:divide-x-2 border-gray-100 border-y-2 lg:border-y-0 border-l-0 lg:border-r-0  h-96 lg:h-auto lg:static sticky top-12">
                {#each specTitle as item, index (index, item.code)}
                    {#each btnTabs as btn, i (i,btn.name )}
                        {#if item.code.toLocaleLowerCase() == btn.name.toLocaleLowerCase()}
                        <div class="w-full col-span-1 lg:py-2 flex justify-center items-center {btn.active ? 'bg-gray-200' : 'bg-gray-100 group'} " on:click={() => {handleTabs(btn.name)}}>
                            <i class="{btn.className} {btn.active ? 'text-sky-600' : ''} text-2xl lg:group-hover:text-sky-600" ></i>
                        </div>
                        {/if}
                    {/each}
                {/each}
            </div>
            <div class="hidden lg:flex w-full px-5 justify-between">
                <div>
                    <p class="text-xl font-semibold">{specTitle.find((data) => data.code == key).title}</p>
                </div>
                {#if enableData.length > 2}
                     <div class="flex justify-center gap-3 items-center">
                         <div class="border-2 rounded-md flex justify-center items-center text-3xl bg-gray-100 cursor-pointer" on:click={prevSlide}>
                             <i class='bx bx-chevron-left'></i>
                         </div>
                         <div class="border-2 rounded-md flex justify-center items-center text-3xl bg-gray-100 cursor-pointer" on:click={nextSlide}>
                             <i class='bx bx-chevron-right'></i>
                         </div>
                     </div>
                {/if}
            </div>
            <div class="w-5/6 lg:w-full flex justify-center pl-2 lg:pl-0 lg:px-5 flex-wrap lg:flex-nowrap">
                <div class="w-full lg:w-5/12 ">
                    <div class="w-full aspect-square ">
                        <RadarChart dataRadar={dataRadar} radarColor={radarColor}/>
                    </div>
                    <div class="w-full h-8 flex justify-center gap-2 items-center lg:items-start">
                        {#each enableData as _, i (i)}
                            <div class="h-5 w-10 rounded-sm cursor-pointer border-2 {borderColor[i]}" on:click={() => {handleLagend(i)}} >
                                <div class="w-full h-full {backgroundColor[i]}"></div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div bind:this={scrollContainer} bind:offsetWidth={widthContainerSpec} class="w-full lg:w-7/12 lg:h-[502px] grid grid-flow-col scrollbar-hidden scroll-smooth snap-x snap-mandatory overflow-auto lg:overflow-y-auto lg:overflow-x-hidden border-2 divide-x-2 rounded-lg">
                    {#each dataSpec as spec, i (i)}
                         <div style={styleWidthColSpec} class="w-full h-full snap-start space-y-3 pb-3">
                            <div class="w-full h-14 flex justify-center items-center py-1 gap-1 text-lg font-medium bg-gray-100 sticky top-0 px-2">
                                <p class="text-center">{spec.device}</p>
                                <div class="h-full aspect-square relative">
                                    <DoughnutChart score={spec.score} color={doughnutColor[i]}/>
                                    <div class="w-full h-full flex justify-center items-center top-0 absolute">
                                        <p>{spec.score}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-5 space-y-3">
                                {#each spec.attributes as attributes}
                                    {#if attributes.spec.toLocaleLowerCase() != 'yes' && attributes.spec.toLocaleLowerCase() != 'no' && attributes.spec != ''}
                                        <div class="leading-tight w-full">
                                            <div class="w-full">
                                                <div class="text-start font-medium">{attributes.title}</div>
                                            </div>
                                            <div>
                                                <div class="italic">{removeHtmlTags(attributes.spec)}</div>
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div></div>
</div>

<style>
    @media only screen and (max-width: 1023px){
        .scrollbar-hidden::-webkit-scrollbar {
        display: none;
        }

        .scrollbar-hidden {
        -ms-overflow-style: none;
        scrollbar-width: none;
        }
}
</style>