<script>
  import { onMount } from "svelte";
    import Table from "./template/Table.svelte";
  import DoughnutChart from "./template/DoughnutChart.svelte";
    export let data
    
    let datas = JSON.parse(data.datas)
    //hapus data miscellaneous
    $: datas = datas.map(data => {
        if (data.title.toLocaleLowerCase() != 'miscellaneous') {
            return {
                ...data
            }
        }
        return undefined
    }).filter(Boolean)

    let showIndex = 0
    $: data = datas[showIndex]
    console.log(datas)


    function handleShowIndex(i, btnName) {
        showIndex = i

        btnTabs = btnTabs.map((btn) => {
            return {
            ...btn,
            active: btn.name === btnName,
            };
        });
    }

    onMount(()=> {
        btnTabs = btnTabs.map((btn) => {
            return {
            ...btn,
            active: btn.name === datas[showIndex].title,
            };
        });
    })

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

<section class="w-full bg-gray-50">
    <div class="container pb-10 lg:w-wrap mx-auto bg-white px-5 lg:px-10 space-y-3">
        <div>
            <p class="text-2xl font-semibold">Detailed Specifications</p>
        </div>
        <div class="flex justify-center items-start gap-3 lg:gap-5   ">
            <div class="w-1/6 lg:w-1/4 space-y-3 py-1 sticky top-16 lg:top-24">
                {#each datas as data, index (data.title)}
                    {#each btnTabs as btn, i (btn.name)}
                        {#if data.title.toLocaleLowerCase() == btn.name.toLocaleLowerCase()}
                            <div class="bg-white lg:px-8 cursor-pointer hover:scale-105 w-full h-12 lg:h-[75px] lg:h-20 {btn.active ? 'border-sky-600 scale-105' : ''} rounded-md flex gap-2 justify-center lg:justify-between items-center text-md font-medium border-2 hover:border-sky-600" key={i} on:click={() => {handleShowIndex(index, btn.name)}}>
                                <div class="flex justify-start items-center gap-5">
                                    <i class="{btn.className} {btn.active ? 'text-sky-600' : ''} text-3xl lg:group-hover:text-sky-600" ></i>
                                    <p class="hidden lg:block {btn.active ? 'text-sky-600' : ''}">{data.title}</p>
                                </div>
                                <i class='bx bx-chevron-right text-3xl hidden lg:block {btn.active ? 'text-sky-600' : ''}' ></i>
                            </div>
                        {/if}
                    {/each}
                {/each}
            </div>
        <div class="w-5/6 lg:w-3/4 space-y-2 lg:space-y-5">
            <div class="w-full flex justify-between">
                <div class="flex justify-start items-center gap-2">
                    <div class="w-14 lg:w-20 aspect-square relative">
                        <DoughnutChart data={data.score}/>
                        <p class="w-full h-full absolute top-0 left-0 flex justify-center items-center font-semibold text-xl">{data.score}</p>
                    </div>
                    <p class="text-2xl font-semibold">{data.title}</p>
                </div>
            </div>
            <div class=" w-full">
                <Table data={data.attributes}/>
            </div>
        </div>
    </div>
    </div>
</section>