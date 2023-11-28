<script>
    export let title 
    export let score 
    $: score = score.toString()
    
</script>

<div class="w-full">
    <div class="w-full">
        <p class="text-sm font-medium leading-none">{title}</p>
    </div>
    <div class="w-full h-[9px] border rounded-full bg-gray-200 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-orange-500 via-yellow-300 to-green-400" 
        style="-webkit-clip-path: polygon(0 0, {score}% 0, {score}% 100%, 0% 100%);">
        </div>
    </div>
</div>

<style>
</style>