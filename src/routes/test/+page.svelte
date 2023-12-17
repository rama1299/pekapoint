<script>
	export let thickness = 8; // Ketebalan bar
	let progress = 50; // Nilai progress (dalam persen)
  
	  $: circumference = 2 * Math.PI * (50 - thickness / 2);
	  $: offset = circumference - (progress / 100) * circumference;
	  $: circleStyle = `
		stroke-dasharray: ${circumference};
		stroke-dashoffset: ${offset};
		stroke: #3498db; /* Warna garis terisi */
		stroke-width: ${thickness};
	  `;
  </script>
  
  <style>
	.progress-circle {
	  fill: transparent;
	  stroke: #d3d3d3; /* Warna garis belum terisi */
	  transition: stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease-in-out;
	}
  </style>
  
  <svg class="w-full" height="100" width="100" viewBox="0 0 100 100">
	<circle
	  cx="50"
	  cy="50"
	  r="50"
	  class="progress-circle"
	  style={circleStyle}
	></circle>
  </svg>
  