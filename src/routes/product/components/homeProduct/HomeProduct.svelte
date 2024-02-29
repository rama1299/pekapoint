<script>
    import FeatureProduct from "./template/FeatureProduct.svelte";
    import { onMount } from "svelte";
    import { FetchProduct } from "../../../../modules/fetchProduct";
    import TopProduct from "./template/TopProduct.svelte";

    let data = []

    onMount( async () => {
        try {
            const fetchData = await FetchProduct.getHomeProducts()
            if (fetchData.status == 200) {
                data = fetchData.data
            }
        } catch (error) {
            console.error('fetch data failed')
        }
    })
</script>

<div class="w-full">
    <div class="w-full h-64 md:h-[550px] bg-[url('/gradient1.png')] flex justify-center items-center relative lg:pb-10">
        <div class="wrapper h-full flex items-center">
            <div class="w-1/2 flex flex-col justify-center items-center">
                <div class="w-40 md:w-80 md:text-4xl flex flex-col gap-5 leading-5 md:leading-none">
                    <div>
                        <p class="font-semibold">THE BEST</p>
                        <p class="font-semibold">SMARTPHONE</p>
                        <p class="text-sm md:text-xl font-medium">For you money</p>
                    </div>
                    <div>
                        <button class="h-7 w-24 md:h-10 md:w-40 rounded-lg bg-primary-500 text-sm md:text-xl">Get it Now!</button>
                    </div>
                </div>
            </div>
            <div class="w-1/2 flex h-full justify-center items-center">
                <img src="/banner.png" alt="" class="h-44 md:h-96">
            </div>
        </div>
    </div>
    <div class="w-full">
        <div class="wrapper h-full flex flex-col gap-4 py-10">
            <!-- <div class="w-full md:w-1/4 h-full border">
                
            </div> -->
            <div class="w-full h-full space-y-10">
                <div class="w-full">
                    <img src="http://blueskytechco.net/complex/media/wysiwyg/home3/banner21.jpg" alt="" class="w-full">
                </div>
                {#if data[3]}
                    <div class="w-full">
                        <TopProduct data={data[3]}></TopProduct>
                    </div>
                {:else}
                        <div class="w-full h-72"></div>
                {/if}

                {#if data[0]}
                     <div class="w-full">
                         <FeatureProduct title={'Most View Products'} data={data[0]}></FeatureProduct>
                     </div>
                {:else}
                    <div class="w-full h-72"></div>
                {/if}
            </div>
        </div>
    </div>
</div>