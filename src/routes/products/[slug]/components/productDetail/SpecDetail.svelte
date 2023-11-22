<script>
  import ChartDonut from "./ChartDonut.svelte";
  import Radar from "./Radar.svelte";

    let btnTabs = [
        {
            name: 'Display',
            className: 'bx bx-fullscreen'
        },
        {
            name: 'Performance',
            className: 'bx bx-microchip'
        },
        {
            name: 'Camera',
            className: 'bx bx-camera'
        },
        {
            name: 'Operation System',
            className: 'bx bx-cog'
        },
        {
            name: 'Battery',
            className: 'bx bx-battery'
        },
        {
            name: 'Audio',
            className: 'bx bx-music'
        },
        {
            name: 'Fitur',
            className: 'bx bx-plus'
        },
    ]
</script>
<div class="w-full space-y-3">
    <p class="text-2xl font-semibold">Detail</p>
    <div class="w-full flex flex-row-reverse lg:block mx-auto gap-2 border-gray-100 border-2 rounded-lg pb-5">
        <div class="w-1/6 lg:w-full grid grid-rows-8 lg:grid-cols-8 divide-gray-200 lg:divide-y-0 divide-y-2 divide-x-0 lg:divide-x-2 border-gray-100 lg:border-l-0 border-l-2 lg:border-r-0  h-96 lg:h-auto lg:static sticky top-12">
            <div class="w-full col-span-1 lg:py-2 flex justify-center items-center bg-white rounded-tr-md lg:rounded-tl-md group">
                <i class="bx bx-mobile-alt text-2xl text-blue-500" ></i>
            </div>
            {#each btnTabs as btn, i}
                <div class="w-full col-span-1 lg:py-2 flex justify-center items-center bg-gray-100 group">
                    <i class="{btn.className} text-2xl group-hover:text-blue-500" ></i>
                </div>
            {/each}
        </div>
        <div class="w-5/6 lg:w-full lg:p-5 lg:space-y-5">
            <div class=" w-full flex justify-center gap-3 item-center py-3">
                <div class="flex items-center">
                    <p class=" text-xl font-semibold">Performance</p>
                </div>
                <div class="h-8 w-8 rounded-full relative">
                    <ChartDonut score={80}/>
                    <p class="absolute w-full h-full inset-0 text-center items-center flex justify-center score text-sm font-semibold">90</p>
                </div>
            </div>
            <div class="w-full flex lg:flex-row flex-col-reverse justify-center gap-5">
                <div class="w-full lg:w-1/2 h-auto">
                    <Radar/>
                </div>
                <div class="w-full lg:w-1/2 lg:border-2 rounded-lg lg:bg-gray-100 lg:border-gray-100 py-0 lg:py-5 px-5 space-y-1">
                    <div class="leading-tight w-full ">
                        <tr class="w-full">
                            <td class="text-start font-medium">Penyimpanan internal</td>
                        </tr>
                        <tr>
                            <td class="italic">1000GB</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">RAM</td>
                        </tr>
                        <tr>
                            <td class="italic">16GB</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">Skor perbandingan AnTuTu</td>
                        </tr>
                        <tr>
                            <td class="italic">3023200</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">Kecepatan CPU</td>
                        </tr>
                        <tr>
                            <td class="italic">1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">Penyimpanan internal</td>
                        </tr>
                        <tr>
                            <td class="italic">1000GB</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">RAM</td>
                        </tr>
                        <tr>
                            <td class="italic">16GB</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">Skor perbandingan AnTuTu</td>
                        </tr>
                        <tr>
                            <td class="italic">3023200</td>
                        </tr>
                    </div>
                    <div class="leading-tight w-full">
                        <tr class="w-full">
                            <td class="text-start font-medium">Kecepatan CPU</td>
                        </tr>
                        <tr>
                            <td class="italic">1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz</td>
                        </tr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>