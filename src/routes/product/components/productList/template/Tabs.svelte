<script>
    import ProgressBar from "./ProgressBar.svelte";
    import Radar from "./Radar.svelte";
    import { createEventDispatcher } from 'svelte';
    export let data;

	const dispatch = createEventDispatcher();

    let display = data[0];
    // let performance = data.find(item => item.title === 'Performance');
    // let camera = data.find(item => item.title === 'Camera');
    // let battery = data.find(item => item.title === 'Battery');
    // let audio = data.find(item => item.title === 'Audio');
    let labels = display.labels
    let scores = display.scores


    let dataBars = labels.map((label, index) => {
    return {
        label: label,
        score: scores[index]
    };
    });

    let tabControl = {
        isDisplay: true,
        isPerformance: false,
        isCamera: false,
        isBattery: false,
        isAudio: false
    }

        function setActiveTab(tabName) {
            for (const key in tabControl) {
                tabControl[key] = key === tabName;
            }

            dispatch('message', {
			object: tabControl
		});
        }

</script>
<!-- display -->
<div class="bg-white w-full relative px-4 h-40 m-auto {tabControl.isDisplay ? '' : 'hidden'}">
    <p class="text-center text-md font-medium absolute left-4 -top-5 text-gray-700">{display.title}</p>
    <div class="flex justify-center md:justify-between justify-items-center items-center gap-6 mt-3 pt-1 ">
        <div class="w-3/4 h-36 space-y-[6px]">
            <!-- <Radar labels={display.labels} scores={display.scores}/> -->
            {#each dataBars as dataBar, i}
                <ProgressBar title={dataBar.label} score={dataBar.score}/>
            {/each}
        </div>
        <div class="space-y-1 w-1/4 text-center">
            <div class="flex flex-col items-center">
                <div class="bg-[url('/antutu.png')] h-14 w-12 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-white text-md font-bold items-center mx-auto mt-4">{display.antutu_score}</p>
                </div>
                <p class="text-xs font-medium text-red-700">Antutu Score</p>
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-[url('/dxo.png')] h-14 w-14 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-black text-md font-bold items-center m-auto">{display.dxo_score}</p>
                </div>
                <p class="text-xs font-medium text-black">DXO Score</p>
            </div>
        </div>
    </div>
</div>

<!-- performance -->
<!-- <div class="bg-white w-full relative px-4 h-40 m-auto {tabControl.isPerformance ? '' : 'hidden'}">
    <p class="text-center text-md font-medium absolute left-5 -top-2 text-gray-700">{performance.title}</p>
    <div class="flex justify-center md:justify-between justify-items-center items-center gap-6 mt-3 ">
        <div class="2/3 mt-2">
            <Radar labels={performance.labels} scores={performance.scores}/>
        </div>
        <div class="space-y-1 w-1/3 text-center">
            <div class="flex flex-col items-center">
                <div class="bg-[url('/antutu.png')] h-14 w-12 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-white text-md font-bold items-center mx-auto mt-4">{performance.antutu_score}</p>
                </div>
                <p class="text-xs font-medium text-red-700">Antutu Score</p>
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-[url('/dxo.png')] h-14 w-14 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-black text-md font-bold items-center m-auto">{performance.dxo_score}</p>
                </div>
                <p class="text-xs font-medium text-black">DXO Score</p>
            </div>
        </div>
    </div>
</div> -->

<!-- camera -->
<!-- <div class="bg-white w-full relative px-4 h-40 m-auto {tabControl.isCamera ? '' : 'hidden'}">
    <p class="text-center text-md font-medium absolute left-5 -top-2 text-gray-700">{camera.title}</p>
    <div class="flex justify-center md:justify-between justify-items-center items-center gap-6 mt-3 ">
        <div class="2/3 mt-2">
            <Radar labels={camera.labels} scores={camera.scores}/>
        </div>
        <div class="space-y-1 w-1/3 text-center">
            <div class="flex flex-col items-center">
                <div class="bg-[url('/antutu.png')] h-14 w-12 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-white text-md font-bold items-center mx-auto mt-4">{camera.antutu_score}</p>
                </div>
                <p class="text-xs font-medium text-red-700">Antutu Score</p>
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-[url('/dxo.png')] h-14 w-14 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-black text-md font-bold items-center m-auto">{camera.dxo_score}</p>
                </div>
                <p class="text-xs font-medium text-black">DXO Score</p>
            </div>
        </div>
    </div>
</div> -->

<!-- battery -->
<!-- <div class="bg-white w-full relative px-4 h-40 m-auto {tabControl.isBattery ? '' : 'hidden'}">
    <p class="text-center text-md font-medium absolute left-5 -top-2 text-gray-700">{battery.title}</p>
    <div class="flex justify-center md:justify-between justify-items-center items-center gap-6 mt-3 ">
        <div class="2/3 mt-2">
            <Radar labels={battery.labels} scores={battery.scores}/>
        </div>
        <div class="space-y-1 w-1/3 text-center">
            <div class="flex flex-col items-center">
                <div class="bg-[url('/antutu.png')] h-14 w-12 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-white text-md font-bold items-center mx-auto mt-4">{battery.antutu_score}</p>
                </div>
                <p class="text-xs font-medium text-red-700">Antutu Score</p>
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-[url('/dxo.png')] h-14 w-14 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-black text-md font-bold items-center m-auto">{battery.dxo_score}</p>
                </div>
                <p class="text-xs font-medium text-black">DXO Score</p>
            </div>
        </div>
    </div>
</div> -->

<!-- audio -->
<!-- <div class="bg-white w-full relative px-4 h-40 m-auto {tabControl.isAudio ? '' : 'hidden'}">
    <p class="text-center text-md font-medium absolute left-5 -top-2 text-gray-700">{audio.title}</p>
    <div class="flex justify-center md:justify-between justify-items-center items-center gap-6 mt-3 ">
        <div class="2/3 mt-2">
            <Radar labels={audio.labels} scores={audio.scores}/>
        </div>
        <div class="space-y-1 w-1/3 text-center">
            <div class="flex flex-col items-center">
                <div class="bg-[url('/antutu.png')] h-14 w-12 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-white text-md font-bold items-center mx-auto mt-4">{audio.antutu_score}</p>
                </div>
                <p class="text-xs font-medium text-red-700">Antutu Score</p>
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-[url('/dxo.png')] h-14 w-14 bg-no-repeat p-1 bg-contain flex justify-center">
                    <p class="text-black text-md font-bold items-center m-auto">{audio.dxo_score}</p>
                </div>
                <p class="text-xs font-medium text-black">DXO Score</p>
            </div>
        </div>
    </div>
</div> -->

<div class="text-sm font-medium text-center text-gray-500 border-t divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400">
    <div class="w-full" on:keypress={()=> {setActiveTab('isDisplay')}} on:click={()=> {setActiveTab('isDisplay')}}>
        <div class="inline-block w-full p-3 focus:bg-gray-100 focus:text-black bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <i class='bx bx-mobile-alt text-xl'></i>
        </div>
    </div>
    <div class="w-full" on:keypress={()=> {setActiveTab('isPerformance')}} on:click={()=> {setActiveTab('isPerformance')}}>
        <div  class="inline-block w-full p-3 focus:bg-gray-100 focus:text-black bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <i class='bx bx-microchip text-xl'></i>
        </div>
    </div>
    <div class="w-full" on:keypress={()=> {setActiveTab('isCamera')}} on:click={()=> {setActiveTab('isCamera')}}>
        <div  class="inline-block w-full p-3 focus:bg-gray-100 focus:text-black bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <i class='bx bx-camera text-xl' ></i>
        </div>
    </div>
    <div class="w-full" on:keypress={()=> {setActiveTab('isBattery')}} on:click={()=> {setActiveTab('isBattery')}}>
        <div  class="inline-block w-full p-3 focus:bg-gray-100 focus:text-black bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <i class='bx bx-battery text-xl' ></i>
        </div>
    </div>
    <div class="w-full" on:keypress={()=> {setActiveTab('isAudio')}} on:click={()=> {setActiveTab('isAudio')}}>
        <div  class="inline-block w-full p-3 focus:bg-gray-100 focus:text-black bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <i class='bx bx-music text-xl' ></i>
        </div>
    </div>
</div>