<script>
	import Footer from './../lib/components/layout/Footer.svelte';
  import '@fontsource/jost/400.css';
  import '@fontsource/jost/500.css';
  import '@fontsource/jost/600.css';
  import '@fontsource/jost/700.css';

  import '../app.css';

</script>

<slot/>
<Footer/>

<style lang="postcss">
:global(html) {
  background-color: #EEEDED;
}
</style>