<script>
    import { afterUpdate, onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let data;
  
    let chart
    $: score = data
    $: rest = 100 - score
 
    afterUpdate(() => {
      chart.data.datasets[0].data = [score, rest];
      chart.update('active');
    });
  
    onMount(() => {
      const ctx = document.getElementById('myChart_2').getContext('2d');

      if (Chart.getChart("myChart_2")){
          Chart.getChart("myChart_2").destroy();
        }
  
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Scores', 'Rest'],
          datasets: [
            {
              backgroundColor: ['rgb(0, 98, 189)', 'rgb(249, 249, 249, 0.5)'],
              data: [score, rest],
              borderColor: 'transparent'
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: '65%'
        },
      });
    });
  </script>
  
  <div>
    <canvas id="myChart_2"></canvas>
  </div>
  
  <style>
    div {
      width: 100%;
    }
  </style>
  