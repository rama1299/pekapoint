<script>
  import ChartDonut from "./ChartDonut.svelte";

</script>
<div class="w-full space-y-5  divide-y-2">
    <div class="w-full space-y-3">
        <div class=" w-full flex justify-between item-center">
            <div class="flex items-center">
                <p class=" text-3xl font-semibold">Xioami 14 pro</p>
            </div>
            <div class="h-11 w-11 rounded-full relative">
                <ChartDonut score={73}/>
                <p class="absolute w-full h-full inset-0 text-center items-center flex justify-center score font-semibold">90</p>
            </div>
        </div>
        <div>
            <p>The smartphone comes in 6.73 inches size and the display is LTPO AMOLED which provides 1440 x 3200 pixels resolution. The phone is fueled by a non-removable Li-Po 4880 mAh battery + 120W wired, PD3.0, QC4, 100% in 18 min (advertised) + 50W wireless, 100% in 40 min (advertised) + 10W reverse wireless.<p/>
            <p>It runs on Android 14 + HyperOS operating system. The device is powered by the Qualcomm SM8650-AB Snapdragon 8 Gen 3 Octa-core processor while the GPU is Adreno 750. It is packed with 12 GB, 16 GB RAM and 256 GB, 512 GB, 1 TB internal storage.</p>
            <br>
            <p>The smartphone comes in 6.73 inches size and the display is LTPO AMOLED which provides 1440 x 3200 pixels resolution. The phone is fueled by a non-removable Li-Po 4880 mAh battery + 120W wired, PD3.0, QC4, 100% in 18 min (advertised) + 50W wireless, 100% in 40 min (advertised) + 10W reverse wireless.<p/>
            <p>It runs on Android 14 + HyperOS operating system. The device is powered by the Qualcomm SM8650-AB Snapdragon 8 Gen 3 Octa-core processor while the GPU is Adreno 750. It is packed with 12 GB, 16 GB RAM and 256 GB, 512 GB, 1 TB internal storage.</p>
        </div>
    </div>
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">Color</p>
            <div class="grid grid-cols-3 gap-3 text-sm">
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <div class="w-10 h-10 bg-sky-500 rounded-full"></div>
                    <p>Sky Blue</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <div class="w-10 h-10 bg-indigo-500 rounded-full"></div>
                    <p>Galaxy Purple</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <div class="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <p>White Pearl</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <div class="w-10 h-10 bg-orange-500 rounded-full"></div>
                    <p>Sunset</p>
                </div>
            </div>
        </div>
        <div class="space-y-3 pt-3">
            <p class="text-2xl font-semibold">Capacity</p>
            <div class="grid grid-cols-3 gap-3 font-medium">
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <p>4/64 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <p>6/64 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <p>4/128 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <p>6/128 GB</p>
                </div>
    
                <div class="flex justify-center items-center border-2 w-full h-24 flex-col">
                    <p>8/128 GB</p>
                </div>
            </div>
        </div>
        <div></div>
</div>
