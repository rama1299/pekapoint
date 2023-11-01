<script>
  import '@fontsource/jost/400.css';
  import '@fontsource/jost/500.css';
  import '@fontsource/jost/600.css';
  import '@fontsource/jost/700.css';

  import '../app.css';
  import Navbar from '../components/layouts/Navbar.svelte';
  import Footer from '../components/layouts/Footer.svelte';
</script>

<Navbar/>
<slot/>
<Footer/>
