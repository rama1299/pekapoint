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
            <div class="w-full">
                <p class="text-2xl font-semibold">{text[0]}</p>
            </div>
            <div class="w-full space-y-3">
                {#each Array(5) as _, i (i)}
                    <Card/>
                {/each}
            </div>
        </div>
    </div>
</section>
