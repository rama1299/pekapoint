<script>
  import { afterUpdate } from 'svelte';
	import Affiliate from './template/Affiliate.svelte';
  import Description from "./template/Description.svelte";
  import Image from "./template/Image.svelte";
  import SpecSummary from "./template/SpecSummary.svelte";

  export let data
  export let spec
  export let variant = []
  
  let dataVariant = variant.length != [] ? variant.data : []

  $: variantAffiliate = '6GB/64GB'
  let price 
  afterUpdate (() => {
    price = Math.floor(Math.random() * (20000000 - 7000000 + 1)) + 7000000;
  })

    function showMore() {

        window.scrollTo({
            top: window.scrollY + (sectionDescription - windowScroll),
            behavior: 'smooth'
        })

    }

    function handleMessageDesc(e) {
        variantAffiliate = e.detail.ram
    }

    let sectionDescription
    let windowScroll

    $: dataAffiliate =
        {
            title: data.title,
            variant: variantAffiliate,
            price,
            store: 'Arkana Store'
        }
</script>

<svelte:window bind:scrollY={windowScroll}/>
<section class="w-full">
    <div class="container lg:w-wrap bg-white mx-auto space-y-5 pb-5">
        <div class=" flex-wrap lg:flex-nowrap lg:flex mx-auto justify-center items-start lg:px-10 gap-5" bind:offsetHeight={sectionDescription}>
            <div class="w-full lg:w-1/2 lg:sticky top-[120px] static space-y-5">
                <Image  image={data.feature_image}/>
            </div>
            <div class="w-full lg:w-1/2 px-5">
                <Description data={data} variant={dataVariant} on:message={handleMessageDesc}>
                    <div class="flex justify-center items-center text-blue-500 hover:text-blue-600 gap-2 cursor-pointer lg:w-1/2 mx-auto" on:click={showMore}>
                        <p class="font-medium">Show more</p>
                        <i class='bx bx-down-arrow-alt text-2xl'></i>
                    </div>
                </Description>
            </div>
        </div>
        <div class=" w-full mx-auto lg:px-10 px-5">
            <Affiliate data={dataAffiliate}/>
        </div>
        <div class="w-full mx-auto lg:px-10 px-5">
            <SpecSummary data={spec} />
        </div>
    </div>

</section>