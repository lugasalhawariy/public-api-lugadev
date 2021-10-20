<template>
    <div class="small">
        <bar-chart :chartdata="this.chartdata"/>
    </div>
</template>

<script>
    import { Bar } from 'vue-chartjs'
    // import { onMounted } from '@vue/runtime-core'

    export default {
        name: 'Chart',
        extends: Bar,
        data () {
            return {
                chartdata: {
                    labels: ['January', 'February'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [40, 20]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted () {
            this.renderChart(this.chartdata, this.options)
        }
        // props: ['dataitem']
    }
</script>