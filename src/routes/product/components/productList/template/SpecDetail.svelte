<script>
    import {removeHtmlTags} from '../../../../../helpers/removeHtmlTags'
    export let tabControl
    export let data

    let dataSpec = JSON.parse(data)
    let titleSpec = Object.keys(dataSpec)[0]
    let specs = dataSpec[titleSpec]

    let cleanedSpecs = specs.map(item => {
        return {
            title: item.title,
            score: item.score,
            spec: removeHtmlTags(item.spec)
        };
    });



    // let display = data.find(item => item.title === 'Display');
    // let performance = data.find(item => item.title === 'Performance');
    // let camera = data.find(item => item.title === 'Camera');
    // let battery = data.find(item => item.title === 'Battery');
    // let audio = data.find(item => item.title === 'Audio');

</script>

{#if tabControl.isPerformance && specs}
    {#each cleanedSpecs as spec, i (i)}
    <div class="leading-tight w-full text-sm" key={i}>
        <div class="w-full">
            <p class="text-start font-medium">{spec.title}</p>
        </div>
        <div>
            <p class="italic">{spec.spec}</p>
        </div>
    </div>
    {/each}
{/if}

<!-- {#if tabControl.isDisplay}
    {#each display.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <div class="w-full">
                <p class="text-start font-medium">{detail.title}</p>
            </div>
            <div>
                <p class="italic">{detail.description}</p>
            </div>
        </div>
    {/each}
{:else if  tabControl.isPerformance}
    {#each performance.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <div class="w-full">
                <p class="text-start font-medium">{detail.title}</p>
            </div>
            <div>
                <p class="italic">{detail.description}</p>
            </div>
        </div>
    {/each}
{:else if  tabControl.isCamera}
    {#each camera.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <div class="w-full">
                <p class="text-start font-medium">{detail.title}</p>
            </div>
            <div>
                <p class="italic">{detail.description}</p>
            </div>
        </div>
    {/each}
{:else if  tabControl.isBattery}
    {#each battery.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <div class="w-full">
                <p class="text-start font-medium">{detail.title}</p>
            </div>
            <div>
                <p class="italic">{detail.description}</p>
            </div>
        </div>
    {/each}
{:else if  tabControl.isAudio}
    {#each audio.details as detail (detail.title)}
        <div class="leading-tight w-full">
            <div class="w-full">
                <p class="text-start font-medium">{detail.title}</p>
            </div>
            <div>
                <p class="italic">{detail.description}</p>
            </div>
        </div>
    {/each}
{/if} -->