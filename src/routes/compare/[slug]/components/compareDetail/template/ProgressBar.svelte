<script>
    export let score 
</script>

<div class="w-full">
    <div class="w-full h-[10px] border rounded-full bg-gray-50 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-sky-500 to-sky-700" 
        style="-webkit-clip-path: polygon(0 0, {score}% 0, {score}% 100%, 0% 100%);">
        </div>
    </div>
</div>

<style>
</style>