<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
  
    onMount(() => {
      const ctx = document.getElementById('myChart').getContext('2d');
  
      chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Monthly Data',
              backgroundColor: 'rgb(75, 192, 192, 0.5)',
              borderColor: 'rgb(75, 192, 192)',
              data: [10, 20, 15, 25, 30],
            },
          ],
        },
      });
    });
  
    function updateChart() {
      // Contoh pembaruan data grafik
      chart.data.labels = ['Jun', 'Jul', 'Ags', 'Sep', 'Okt'];
      chart.data.datasets[0].data = [35, 30, 20, 25, 15];
      chart.update();
    }
  </script>
  
  <style>
    div {
      width: 100%;
    }
  </style>
  
  <div>
    <canvas id="myChart"></canvas>
    <button on:click={updateChart}>update</button>
  </div>
  