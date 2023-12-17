<script>
    import { removeHtmlTags } from "../../../../../../helpers/removeHtmlTags";
    import ProgressBar from "./ProgressBar.svelte";
      export let data
  
  </script>
  
  <div class="w-full">
      <div class="w-full">
          <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
              {#each data as item, i (i)}
                  <!-- {#if item.spec} -->
                      <div class="col-1 p-5 flex items-start w-full border-2 rounded-lg h-32 overflow-hidden" key={i} >
                           <div class="font-semibold space-y-3 w-full">
                              {#if item.spec.toLowerCase() == 'yes'}
                              <div class="flex gap-2 items-center">
                                  <p class=" font-medium">{item.title}</p>
                                  <i class='bx bx-check text-green-400 text-3xl'></i>
                              </div>
                              <p class="text-sm text-gray-500 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                  molestiae quas vel sint commodi.</p>
                              {:else if  item.spec.toLowerCase() == 'no'}
                              <div class="flex gap-2 items-center">
                                  <p class=" font-medium">{item.title}</p>
                                  <i class='bx bx-x text-red-600 text-3xl'></i>
                              </div>
                              <p class="text-sm text-gray-500 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                  molestiae quas vel sint commodi.</p>
                              {:else}
                              <p class=" font-medium">{item.title}</p>
                                  <div>
                                      <p>{removeHtmlTags(item.spec)}</p>
                                      <ProgressBar score={item.score}/>
                                  </div>
                              {/if}
                          </div>
                      </div>
                      <!-- {/if} -->
                  {/each}
                   </div>
              </div>
          </div>