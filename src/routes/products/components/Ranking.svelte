<script>
    import { Doughnut } from 'svelte-chartjs';
  
    import {
      Chart as ChartJS,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
    
    export let value;
    let valueArray = [value]
    $: valueArray[1] = 100 - valueArray[0]

    let data = {
        datasets: [
            {
            data: valueArray,
            backgroundColor: ['#0283C6', '#F3F4F6'],
            },
        ],
    };
  
    ChartJS.register(ArcElement, CategoryScale);

  </script>
  
  <Doughnut {data} options={{ responsive: true, cutout:'65%' }} />