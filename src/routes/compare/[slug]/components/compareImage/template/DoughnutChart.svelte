<script>
	import Chart from 'chart.js/auto';
	import { onMount, afterUpdate } from 'svelte';
  export let data;
  export let color

  $: score = data
  $: rest = 100 - score
  $: color = color.replace(/, 0\.4\)/, ')');

//   afterUpdate(() => {
//       chart.data.datasets[0].data = [score, rest];
//       chart.update();
//     }
//   );

  let chartLabels = ['Scores', 'Rest'];
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
	  ctx = chartCanvas.getContext('2d');
		let chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [{
					backgroundColor: [color, 'rgb(195, 195, 195, 0.5)'],
					data: [score, rest]
				}]
			},
      options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false
            }
          },
          cutout: '70%'
        },
		});
	});

</script>
  
<div>
  <canvas bind:this={chartCanvas} id="myChart_4"></canvas>
</div>

<style>
  div {
    width: 100%;
  }
</style>