<script>
    export let data
    export let tabControl

    let display = data.find(item => item.title === 'Display');
    let performance = data.find(item => item.title === 'Performance');
    let camera = data.find(item => item.title === 'Camera');
    let battery = data.find(item => item.title === 'Battery');
    let audio = data.find(item => item.title === 'Audio');
</script>

{#if tabControl.isDisplay}
    {#each display.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <tr class="w-full">
                <td class="text-start font-medium">{detail.title}</td>
            </tr>
            <tr>
                <td class="italic">{detail.description}</td>
            </tr>
        </div>
    {/each}
{:else if  tabControl.isPerformance}
    {#each performance.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <tr class="w-full">
                <td class="text-start font-medium">{detail.title}</td>
            </tr>
            <tr>
                <td class="italic">{detail.description}</td>
            </tr>
        </div>
    {/each}
{:else if  tabControl.isCamera}
    {#each camera.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <tr class="w-full">
                <td class="text-start font-medium">{detail.title}</td>
            </tr>
            <tr>
                <td class="italic">{detail.description}</td>
            </tr>
        </div>
    {/each}
{:else if  tabControl.isBattery}
    {#each battery.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <tr class="w-full">
                <td class="text-start font-medium">{detail.title}</td>
            </tr>
            <tr>
                <td class="italic">{detail.description}</td>
            </tr>
        </div>
    {/each}
{:else if  tabControl.isAudio}
    {#each audio.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <tr class="w-full">
                <td class="text-start font-medium">{detail.title}</td>
            </tr>
            <tr>
                <td class="italic">{detail.description}</td>
            </tr>
        </div>
    {/each}
{/if}