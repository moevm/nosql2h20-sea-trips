<template>
    <div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">Average distance per years:</div>
            <ColumnChart v-bind:id="'average'" v-bind:data="statistic.averages" v-bind:options="averageDistanceOption" v-bind:height="statistic.averages.length * 40" v-on:click="AverageChartClick($event)"/>
        </div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">Ships with the biggest count of voyages:</div>
            <ColumnChart v-bind:id="'voyages'" v-bind:data="statistic.voyages" v-bind:options="shipsOptions" v-bind:height="600" v-on:click="VoyageChartClick($event)"/>
        </div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">Ships with the biggest mileage:</div>
            <ColumnChart v-bind:id="'mileage'" v-bind:data="statistic.mileage" v-bind:options="shipsOptions" v-bind:height="600" v-on:click="MileageChartClick($event)"/>
        </div>
    </div>
</template>

<script>
    import ColumnChart from "./ColumnChart";
    import TripStatisticData from "../classes/TripStatisticData";

    export default {
        name: "TripStatistic",
        components: {ColumnChart},
        props: {
            statistic: TripStatisticData
        },
        data: function() {
            return {
                averageDistanceOption: {
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkblue'],
                    chartArea: {
                        left: 100,
                        top: 50,
                        bottom: 100,
                        right: 50,
                        width: "100%",
                    },
                    bar: {
                        groupWidth: "80%"
                    },
                    hAxis: {
                        baseline: 0,
                    },
                    orientation: 'vertical'
                },
                shipsOptions: {
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkblue'],
                    chartArea: {
                        left: 100,
                        top: 50,
                        right: 50,
                        width: "100%",
                        height: "75%"
                    },
                    bar: {
                        groupWidth: "80%"
                    },
                    vAxis: {
                        baseline: 0,
                    }
                }
            }
        },
        methods: {
            AverageChartClick: function (event) {
                let year = this.statistic.averages[event[0].row + 1][0];
                this.$emit('click', `http://localhost:3000/sea-journal/trips/year?year=${year}`, 'Ship Records', false)
            },
            VoyageChartClick: function (event) {
                let ship = this.statistic.voyages[event[0].row + 1][0].replace('&', '%26');
                this.$emit('click', `http://localhost:3000/sea-journal/trips/ship?ship=${ship}`, 'Ship Records')
            },
            MileageChartClick: function (event) {
                let ship = this.statistic.mileage[event[0].row + 1][0].replace('&', '%26');
                this.$emit('click', `http://localhost:3000/sea-journal/trips/ship?ship=${ship}`, 'Ship Records')
            },
        }
    }
</script>

<style scoped>
</style>
