<script>
  import { removeHtmlTags } from "../../../../../../helpers/removeHtmlTags";
  import ProgressBar from "./ProgressBar.svelte";
    export let data

    let key = Object.keys(data)[0]
    let sortData = data[key].sort((a, b) => {
        const specA = a.spec ? a.spec.toLowerCase() : '';  // Ubah null menjadi string kosong
        const specB = b.spec ? b.spec.toLowerCase() : '';  // Ubah null menjadi string kosong

        if (specA !== 'yes' && specA !== 'no' && (specB === 'yes' || specB === 'no')) {
            return -1;
        } else if ((specA === 'yes' || specA === 'no') && specB !== 'yes' && specB !== 'no') {
            return 1;
        } else if (specA === '' || specA === null) {
            return 1;  // Taruh spesifikasi dengan data null atau '' di belakang
        } else if (specB === '' || specB === null) {
            return -1;  // Taruh spesifikasi dengan data null atau '' di belakang
        }

        return 0;
    })


</script>

<div class="w-full border-2 rounded-lg">
    <div class="w-full flex justify-center p-5 bg-white z-20 rounded-t-lg">
        <p class="text-2xl font-semibold">{key}</p>
    </div>
    <div class="w-full">
        {#each data[key] as item, i (i)}
            {#if item.spec}
                 <div class="w-full flex p-5 {i%2 == 0 ? 'bg-gray-200' : 'bg-gray-100'} gap-10" key={i}>
                     <div class="w-1/2">
                         <p class=" font-medium">{item.title}</p>
                     </div>
                     <div class="w-1/2 font-semibold space-y-2">
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