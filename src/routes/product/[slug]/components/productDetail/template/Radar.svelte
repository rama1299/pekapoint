<script>
	import { afterUpdate } from 'svelte';
    import { RadarChart } from '@carbon/charts-svelte'
    import '@carbon/charts-svelte/styles.css'

    $: innerWidth = 0
    afterUpdate(()=> {
        if (innerWidth < 600) {
            radarHeight = '170px'
        } else {
            radarHeight = '350px'
        }
    })
    let radarHeight
     let labels = ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type']
     let scores = [80, 87, 79, 93, 97]
  
    let data = labels.map((label, index) => {
      return {
        label: label,
        score: scores[index]
      }
    })
  
    let options = {
      radar: {
        title: {
          enabled: false
        },
        axes: {
          angle: 'label',
          value: 'score',
        },
        alignment: 'center',
      },
      legend: {
          enabled: false,
      },
      color: {
        gradient: {
          enabled: true,
          colors: ['#413A9E', '#0FA4E9'],
        },
      },
      toolbar: false,
      animations: true,
      resizable: true,
      minRange:10
    }
  </script>
  
  <style>
    .radar {
      width: 100%; /* Mengambil lebar penuh dari parent */
      height: 100%; /* Mengambil tinggi penuh dari parent */
      box-sizing: border-box;
    }
  </style>
  
  <svelte:window bind:innerWidth/>
  <div class='radar'>
    <RadarChart {data} {options} style="height: {radarHeight}"/>
  </div>
  