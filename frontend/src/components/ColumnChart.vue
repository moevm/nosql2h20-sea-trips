<template>
    <div v-bind:id="id" style="width: 100%; height: 500px;"/>
</template>

<script>
    export default {
        name: "ColumnChart",
        props: {
            id: String,
            data: Array,
            options: Object,
        },
        created() {
            this.$loadScript('https://www.gstatic.com/charts/loader.js')
                .then(() => {
                    google.charts.load('current', {packages: ['corechart']})
                        .then(() => {
                            /* global google */
                            let data = google.visualization.arrayToDataTable(this.data);
                            let chart = new google.visualization.ColumnChart(document.getElementById(this.id));
                            chart.draw(data, this.options);
                            google.visualization.events.addListener(chart, 'select', () => {
                                this.$emit('click', chart.getSelection());
                            });
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
</style>
