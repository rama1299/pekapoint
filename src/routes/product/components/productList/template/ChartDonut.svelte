<script>
    import { DonutChart } from "@carbon/charts-svelte";
    import '@carbon/charts-svelte/styles.css'

    export let score = 87
    let maxScore = 100
    let remainingPercentage = maxScore - score

    let data = [
        {
            group: 'score',
            value: score
        },
        {
            group: 'Remaining',
            value: remainingPercentage
        }
    ]

    const options = {
        donut: {
            title: {
                enabled: false,
            },
            alignment: "center",
            center: {
                numberFontSize: (value) => {
                    return 0
                }
            }
        },
        pie: {
            labels: {
            enabled: false,
            },
        },
        resizable: true,
        // height: '400px',
        legend: {
            enabled: false,
        },
        toolbar: false,
        getFillColor: (group, label, data, defaultFillColor) => {
            if (group === 'score') {
                return '#0062bd';
            } else if (group === 'Remaining') {
                return '#eeeeee';
            }
        },
        tooltip: false,
        resizable: true
    };

</script>

<div class="w-full h-full relative">
    <DonutChart class="w-11/12 absolute top-0 -left-[7px]" {data} {options} />
</div>