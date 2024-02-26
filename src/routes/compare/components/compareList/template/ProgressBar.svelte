<script>
    export let score 
    
</script>

<div class="w-full">
    <div class="w-full h-[9px] border rounded-full bg-gray-200 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary-500 to-accent-red-600" 
        style="-webkit-clip-path: polygon(0 0, {score}% 0, {score}% 100%, 0% 100%);">
        </div>
    </div>
</div>

<style>
</style>