<script>
    export let title 
    export let score 
    $: score = score.toString()
    
</script>

<div class="w-full">
    <div class="w-full">
        <p class="text-sm font-medium leading-none">{title}</p>
    </div>
    <div class="w-full h-[10px] border rounded-full bg-gray-200">
        <div class="h-full rounded-full bg-indigo-600" style="width: {score}%">
        </div>
    </div>
</div>

<style>
</style>