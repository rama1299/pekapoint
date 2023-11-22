<script>
	import Affiliate from './productDetail/Affiliate.svelte';
  import Description from "./productDetail/Description.svelte";
  import Image from "./productDetail/Image.svelte";
  import SpecDetail from "./productDetail/SpecDetail.svelte";
</script>

<section class="w-full">
    <div class="container lg:w-wrap bg-white mx-auto space-y-5 pb-5">
        <div class=" flex-wrap lg:flex-nowrap lg:flex mx-auto justify-center items-start lg:py-10 lg:px-10 gap-5 ">
            <div class="w-full lg:w-1/2 lg:sticky top-24 static">
                <Image/>
            </div>
            <div class="w-full lg:w-1/2 px-5">
                <Description/>
            </div>
        </div>
        <div class=" w-full mx-auto lg:px-10 px-5">
            <SpecDetail/>
        </div>
        <div class="w-full mx-auto lg:px-10 px-5">
            <Affiliate/>
        </div>
    </div>

</section>