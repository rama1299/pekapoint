<script>
  import Card from "./template/Card.svelte";
</script>

<section class="w-full bg-gray-50">
    <div class="container pb-10 lg:w-wrap mx-auto bg-white px-5 lg:px-10 space-y-3">
        <div class="w-full space-y-3">
            <div class="w-full">
                <p class="text-2xl font-semibold">Price Details</p>
            </div>
            <div class="w-full space-y-3">
                {#each Array(5) as _, i (i)}
                    <Card/>
                {/each}
            </div>
        </div>
    </div>
</section>
