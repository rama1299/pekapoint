<script>
  import { RadarChart } from '@carbon/charts-svelte'
  import '@carbon/charts-svelte/styles.css'

  export let labels
  export let scores

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
    height: '150px',
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

<div class='radar'>
  <RadarChart {data} {options} />
</div>
