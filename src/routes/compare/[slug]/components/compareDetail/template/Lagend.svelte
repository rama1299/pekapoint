<script>
    export let title
    export let widthContainerLagend
    export let heightCol
    export let color
</script>

<div class="w-full relative" style="height: {heightCol}px;">
    <div style="width: {heightCol}px; height: {widthContainerLagend}px; bottom: 0; left: 100%;" class={`border-b-4 border-${color}-500 absolute origin-bottom-left -rotate-90 flex justify-center items-center`}>
        <div class="w-full flex justify-center">
            <p class="font-semibold">{title}</p>
        </div>
    </div>
</div>