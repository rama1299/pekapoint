<script>
	import Chart from 'chart.js/auto';
	import { onMount, afterUpdate } from 'svelte';
  export let score;
  export let color

  let chart
  $: score = score
  $: rest = 100 - score
  $: color = color.replace(/, 0\.4\)/, ')');

  afterUpdate(() => {
      chart.data.datasets[0].backgroundColor = [color, 'rgb(195, 195, 195, 0.5)']
      chart.data.datasets[0].data = [score, rest];
      chart.update();
    }
  );

  let chartLabels = ['Scores', 'Rest'];
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
	  ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
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
  <canvas bind:this={chartCanvas} id="myChart_5"></canvas>
</div>

<style>
  div {
    width: 100%;
  }
</style>