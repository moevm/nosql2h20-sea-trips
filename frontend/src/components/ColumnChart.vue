<template>
    <div v-bind:id="id" ref="diagram" style="width: 100%; min-height: 500px;"/>
</template>

<script>
    import Handler from "../classes/Handler";

    export default {
        name: "ColumnChart",
        props: {
            id: String,
            data: Array,
            options: Object,
            height: Number
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
                        .catch(error => Handler.Error(error, 'CORECHART NOT LOADED'));
                })
                .catch(error => Handler.Error(error, 'DIAGRAMS NOT LOADED'));
        },
        mounted() {
            this.$refs.diagram.style.height = `${this.height}px`;
        }
    }
</script>

<style scoped>
</style>
