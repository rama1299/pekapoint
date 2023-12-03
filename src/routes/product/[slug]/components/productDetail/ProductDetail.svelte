<script>
	import Affiliate from './template/Affiliate.svelte';
  import Description from "./template/Description.svelte";
  import Image from "./template/Image.svelte";
  import SpecSummary from "./template/SpecSummary.svelte";

  export let data
  export let spec
  
</script>

<section class="w-full">
    <div class="container lg:w-wrap bg-white mx-auto space-y-5 py-10">
        <div class=" flex-wrap lg:flex-nowrap lg:flex mx-auto justify-center items-start lg:px-10 gap-5 ">
            <div class="w-full lg:w-1/2 lg:sticky top-[120px] static space-y-5">
                <Image  image={data.feature_image}/>
            </div>
            <div class="w-full lg:w-1/2 px-5">
                <Description data={data}/>
            </div>
        </div>
        <div class=" w-full mx-auto lg:px-10 px-5">
            <SpecSummary data={spec} />
        </div>
        <div class="w-full mx-auto lg:px-10 px-5">
            <Affiliate/>
        </div>
    </div>

</section>