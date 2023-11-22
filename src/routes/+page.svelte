<script>
	import { onMount } from 'svelte';
  
	let isRouteEnabled = false
	let ipInfo;
	let apiKey = 'a96dd7c20cca4d3c928434af9e5de67d';
	const urlIpGeolocation = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`
  
	onMount(async () => {
	  try {
		const response = await fetch(urlIpGeolocation);
		if (response) {
			ipInfo = await response.json();
			console.log('IP Information:', ipInfo);
		} else {
			console.log('Fetch IP Information failed')
		}
	  } catch (error) {
		console.error('Error:', error);
	  }
	});
  </script>
  
  <style>
	/* Tambahkan gaya CSS sesuai kebutuhan */
  </style>
  
  <div>
	{#if ipInfo !== undefined}
	  <h3>IP Information:</h3>
	  <p>IP Address: {ipInfo.ip}</p>
	  <p>City: {ipInfo.city.name}</p>
	  <p>Region: {ipInfo.state.name}</p>
	  <p>Country Capital: {ipInfo.country.capital}</p>
	  <p>Country: {ipInfo.country.name}</p>
		<p>Continent: {ipInfo.continent.name}</p>
	  <p>Currency: {ipInfo.country.currency}</p>
	  <p>Languages: {ipInfo.country.languages[0].name_native}</p>
	  <p>Iso Code: {ipInfo.country.languages[0].iso_code}</p>
	  <p>Latitude: {ipInfo.location.latitude}</p>
	  <p>Longitude: {ipInfo.location.longitude}</p>
	{:else}
	  <p>Loading IP information...</p>
	{/if}
  </div>
  


<!-- <script>
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
</style> -->