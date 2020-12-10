<template>
    <div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">The most popular departures:</div>
            <ColumnChart v-bind:id="'departures'" v-bind:data="statistic.departures" v-bind:options="portsOptions" v-bind:height="600" v-on:click="DepartureChartClick($event)"/>
        </div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">The most popular destination:</div>
            <ColumnChart v-bind:id="'destinations'" v-bind:data="statistic.destinations" v-bind:options="portsOptions" v-bind:height="600" v-on:click="DestinationChartClick($event)"/>
        </div>
        <div>
            <div style="font-weight: bold; text-align: left; margin-left: 50px">The most popular trade routes:</div>
            <ColumnChart v-bind:id="'trades'" v-bind:data="statistic.trades" v-bind:options="tradesOptions" v-bind:height="600" v-on:click="TradeChartClick($event)"/>
        </div>
    </div>
</template>

<script>
    import ColumnChart from "./ColumnChart";
    import PortStatisticData from "../classes/PortStatisticData";

    export default {
        name: "PortStatistic",
        components: {ColumnChart},
        props: {
            statistic: PortStatisticData
        },
        data: function() {
            return {
                portsOptions: {
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkgreen'],
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
                },
                tradesOptions: {
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkgreen'],
                    chartArea: {
                        left: 300,
                        top: 50,
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
            }
        },
        methods: {
            DepartureChartClick: function (event) {
                let dep = this.statistic.departures[event[0].row + 1][0].replace('&', '%26');
                this.$emit('click', `http://localhost:3000/sea-journal/trips/departure?dep=${dep}`, 'Port Records')
            },
            DestinationChartClick: function (event) {
                let dest = this.statistic.destinations[event[0].row + 1][0].replace('&', '%26');
                this.$emit('click', `http://localhost:3000/sea-journal/trips/destination?dest=${dest}`, 'Port Records')
            },
            TradeChartClick: function (event) {
                let route = this.statistic.trades[event[0].row + 1][0].replace('&', '%26');
                let tradePoints = route.split(" -> ");
                this.$emit('click', `http://localhost:3000/sea-journal/trips/trade?dep=${tradePoints[0]}&dest=${tradePoints[1]}`, 'Port Records')
            }
        }
    }
</script>

<style scoped>
</style>
