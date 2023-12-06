<!-- <script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
  
    onMount(() => {
      const ctx = document.getElementById('myChart').getContext('2d');
  
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Score', 'Rest'],
          datasets: [
            {
              backgroundColor:['rgb(75, 192, 192)', 'rgb(195, 195, 195, 0.5)'] ,
              data: [75, 25],
            },
          ],
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            cutout: '60%',
        }
      });
    });

  </script>
  
  <style>
    div {
      width: 30%;
    }
  </style>
  
  <div>
    <canvas id="myChart"></canvas>
  </div>
   -->