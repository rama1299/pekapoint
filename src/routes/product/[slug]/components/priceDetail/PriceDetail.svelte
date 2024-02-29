<script>
	import { Translate } from './../../../../../helpers/translate.js';
  import Card from "./template/Card.svelte";
  import { onMount } from "svelte";

  let text = ['Price Variant']

  onMount(async () => {
    let translate = await Translate.client(text)
    text = translate
  })
</script>



<section class="w-full">
    <div class="w-full mx-auto bg-white space-y-3">
        <div class="w-full space-y-3">
            <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
                <p class="text-xl font-semibold bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">{text[0]}</p>
            </div>
            <div class="w-full space-y-3">
                {#each Array(5) as _, i (i)}
                    <Card/>
                {/each}
            </div>
        </div>
    </div>
</section>


<style>
        .tag {
        clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
    }
</style>