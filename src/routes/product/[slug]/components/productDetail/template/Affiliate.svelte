<script>
  import { afterUpdate, onMount } from "svelte";
    import Carousel from "svelte-carousel";
  import { Translate } from "../../../../../../helpers/translate";
    export let data

    let text = ['Price']
    onMount(async () => {
        let translate = await Translate.client(text)
        text = translate
    })

    $: arrayData = [...Array(4)].map(() => ({ ...data }));
    let carousel

    let particlesToShow

    let innerWidth
    afterUpdate(() => {
        if (innerWidth < 1024) {
            particlesToShow = 1
        } else if (innerWidth < 1280 && innerWidth > 1023) {
            particlesToShow = 2
        }else {
            particlesToShow = 3
        }
    })

    function goToPrevPage() {
    carousel.goToPrev({ animated: true })
    }

    function goToNextPage() {
        carousel.goToNext({ animated: true })
    }

</script>

<svelte:window bind:innerWidth={innerWidth}/>

<div class="w-full space-y-5">
    <div class="w-full space-y-3">
        <div class="w-full flex justify-between items-start">
            <p class="text-2xl font-semibold">{text[0]}</p>
            <div class="flex h-9 justify-center gap-3">
                <div class="aspect-square bg-gray-100 border-2 rounded-md flex justify-center items-center cursor-pointer hover:border-sky-500" on:click={goToPrevPage}>
                    <i class='bx bx-chevron-left text-3xl'></i>
                </div>
                <div  class="aspect-square bg-gray-100 border-2 rounded-md flex justify-center items-center cursor-pointer hover:border-sky-500" on:click={goToNextPage}>
                    <i class='bx bx-chevron-right text-3xl'></i>
                </div>
            </div>
        </div>
        <div class="w-full py-2 px-1 border-gray-100 rounded-lg border-2">
            <Carousel bind:this={carousel}
            {particlesToShow}
            arrows={false}
            dots={false}
            infinite={false}
            swiping={true}
            >
                {#each arrayData as data, index (index)}
                <div class=" flex justify-center cursor-pointer">
                <div class="w-[350px] lg:w-[390px] h-28 p-2 flex justify-between gap-2 border-2 border-gray-100 bg-gray-100 rounded-lg hover:border-sky-500">
                    <div class="h-full p-2 aspect-square rounded-md bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
                            <path fill="#f4511e" d="M36.683,43H11.317c-2.136,0-3.896-1.679-3.996-3.813l-1.272-27.14C6.022,11.477,6.477,11,7.048,11 h33.904c0.571,0,1.026,0.477,0.999,1.047l-1.272,27.14C40.579,41.321,38.819,43,36.683,43z"></path><path fill="#f4511e" d="M32.5,11.5h-2C30.5,7.364,27.584,4,24,4s-6.5,3.364-6.5,7.5h-2C15.5,6.262,19.313,2,24,2 S32.5,6.262,32.5,11.5z"></path><path fill="#fafafa" d="M24.248,25.688c-2.741-1.002-4.405-1.743-4.405-3.577c0-1.851,1.776-3.195,4.224-3.195 c1.685,0,3.159,0.66,3.888,1.052c0.124,0.067,0.474,0.277,0.672,0.41l0.13,0.087l0.958-1.558l-0.157-0.103 c-0.772-0.521-2.854-1.733-5.49-1.733c-3.459,0-6.067,2.166-6.067,5.039c0,3.257,2.983,4.347,5.615,5.309 c3.07,1.122,4.934,1.975,4.934,4.349c0,1.828-2.067,3.314-4.609,3.314c-2.864,0-5.326-2.105-5.349-2.125l-0.128-0.118l-1.046,1.542 l0.106,0.087c0.712,0.577,3.276,2.458,6.416,2.458c3.619,0,6.454-2.266,6.454-5.158C30.393,27.933,27.128,26.741,24.248,25.688z"></path>
                        </svg>
                    </div>
                    <div class="w-full h-full grid grid-cols-3 grid-rows-4 bg-white px-2 py-1 rounded-md font-medium">
                        <div class="col-span-1 row-span-1 h-full w-full">Product:</div>
                        <div class="col-span-2 row-span-1 h-full w-full"><p class="w-full truncate leading-5">{data.title}</p></div>
                        <div class="col-span-1 row-span-1 h-full w-full">RAM:</div>
                        <div class="col-span-2 row-span-1 h-full w-full"><p class="w-full truncate leading-5">{data.variant}</p></div>
                        <div class="col-span-1 row-span-1 h-full w-full">Price:</div>
                        <div class="col-span-2 row-span-1 h-full w-full">Rp. {data.price}</div>
                        <div class="col-span-1 row-span-1 h-full w-full">Store:</div>
                        <div class="col-span-2 row-span-1 h-full w-full">{data.store}</div>
                    </div>
                </div>
            </div>
                {/each}
            </Carousel>
        </div>
    </div>
</div>



<style>
    ::-webkit-scrollbar {
  width: 0px; /* Lebar scrollbar */
  height: 0px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: transparent; /* Warna thumb (pilihan Anda) */
}

</style>