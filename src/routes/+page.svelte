<script>
	import Layout from "../lib/components/layout/Layout.svelte";

</script>

<Layout>
	<main class="w-full h-screen">
		<div class="w-full h-96 bg-cover bg_gradient">
			<div class="container lg:w-wrap font-monst h-full pt-44 mx-auto">
				<h1 class="text-5xl font-bold text-white">Home</h1>
			</div>
		</div>
	</main>
</Layout>

<style>
    .bg_gradient {
        background-image: linear-gradient(to right bottom, #0a1831, #0a1831, #003e5f, #006989, #0097aa, #00c6bf);
    }
</style>

