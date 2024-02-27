<script>
  import { afterUpdate, onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let dataRadar;

  let chart = null
  $: labels = dataRadar.map(data => data.label.split(' '));
  $: scores = dataRadar.map(data => data.score);

  afterUpdate(() => {
    chart.data.labels = labels;
    chart.data.datasets[0].data = scores;
    chart.update('active');
  });

  onMount(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: 'rgb(254, 215, 0, 0.5)',
            borderColor: 'rgb(254, 215, 0)',
            data: scores,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeInOutElastic',
            from: 1,
            to: 0,
          },
        },
      },
    });
  });
</script>

<div>
  <canvas id="myChart"></canvas>
</div>

<style>
  div {
    width: 100%;
  }
</style>
