<script>
	import Chart from 'chart.js/auto';
	import { onMount, afterUpdate } from 'svelte';
  export let data;

  $: score = data
  $: rest = 100 - score
  // afterUpdate(() => {
  //     chart.data.datasets[0].data = [score, rest];
  //     chart.update();
  //   }
  // );

  let chartLabels = ['Scores', 'Rest'];
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
	  ctx = chartCanvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [{
					backgroundColor: ['rgb(0, 98, 189)', 'rgb(249, 249, 249, 0.5)'],
					data: [score, rest],
          borderColor: 'transparent'
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
          cutout: '65%',
        },
		});
    chart.update('active')
	});

</script>
  
<div>
  <canvas bind:this={chartCanvas} id="myChart_3"></canvas>
</div>

<style>
  div {
    width: 100%;
  }
</style>