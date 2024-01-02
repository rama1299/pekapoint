<script>
  import { onMount } from "svelte";
    import { enableDataToCompare } from "../../../../../../stores";
    export let title
    export let widthContainerLagend
    export let heightCol
    export let color
    export let lagendIndex

    $: enableDataFromStores = $enableDataToCompare

    $: enable = true
    function handleDisable(i) {
        enable =! enable
        if (enable) {
            let updateData = enableDataFromStores.map((data, index) => {
                return index == i ? {...data, enable : enable} : data
            })
            enableDataToCompare.set(updateData)
        } else {
            let updateData = enableDataFromStores.map((data, index) => {
                return index == i ? {...data, enable : enable} : data
            })
            enableDataToCompare.set(updateData)
        }
    }

</script>

<div class="w-full relative cursor-pointer {enable ? '' : 'bg-gray-100' }" style="height: {heightCol}px;" on:click={() => {handleDisable(lagendIndex)}}>
    <div style="width: {heightCol}px; height: {widthContainerLagend}px; bottom: 0; left: 100%;" class={`border-b-4 border-${color}-500 absolute origin-bottom-left -rotate-90 flex justify-center items-center`}>
        <div class="w-full flex justify-center px-2 items-center">
            <div class="flex justify-center items-center max-h-10 overflow-hidden">
                <p class="font-semibold text-center text-sm lg:text-base leading-4 overflow-hidden {enable ? '' : 'line-through'}">{title}</p>
            </div>
        </div>
    </div>
</div>