<script>
    import { afterUpdate, onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let dataRadar;
    export let radarColor
    $: borderColor = radarColor.map(str => str.replace(/0\.4\)$/, '0.7)'));

    onMount(async () => {
      const ctx = document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
        labels: labelSpec,
        datasets: datasets,
        },
        options: {
        plugins: {
            // legend: {
            //     display: false
            // }
        },
        },
    });
        
    });



    $: labelSpec = dataRadar.labelSpec.map(label => label.split(' '))
    $: device = dataRadar.device
    $: scores = dataRadar.scores

    $: datasets = scores.map((score, i) => {
        return {
            label : device[i],
            data: score,
            backgroundColor	: radarColor[i],
            borderColor : borderColor[i]
        }
    })
    let chart

    afterUpdate(() => {
      chart.data.labels = labelSpec;
      chart.data.datasets = datasets;
      chart.update('active');
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
  
