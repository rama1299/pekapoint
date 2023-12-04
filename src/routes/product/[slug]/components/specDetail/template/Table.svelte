<script>
  import { removeHtmlTags } from "../../../../../../helpers/removeHtmlTags";
  import ProgressBar from "./ProgressBar.svelte";
    export let data

</script>

<div class="w-full border-2 rounded-lg">
    <div class="w-full">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
            {#each data as item, i (i)}
                {#if item.spec}
                    <div class="col-1 p-5 border" key={i}>
                         <p class=" font-medium">{item.title}</p>
                         <div class="font-semibold">
                            {#if item.spec.toLowerCase() == 'yes'}
                                <i class='bx bx-check text-green-400 text-3xl'></i>
                            {:else if  item.spec.toLowerCase() == 'no'}
                                <i class='bx bx-x text-red-600 text-3xl'></i>
                            {:else}
                                <p>{removeHtmlTags(item.spec)}</p>
                                <ProgressBar score={item.score}/>
                            {/if}
                        </div>
                    </div>
                    {/if}
                {/each}
                 </div>
            </div>
        </div>