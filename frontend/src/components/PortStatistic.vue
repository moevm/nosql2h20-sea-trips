<template>
    <div>
        <ColumnChart v-bind:id="'departures'" v-bind:data="departureData" v-bind:options="departureOption" v-on:click="$emit('click', $event)"/>
        <ColumnChart v-bind:id="'destinations'" v-bind:data="destinationData" v-bind:options="destinationOption" v-on:click="$emit('click', $event)"/>
        <ColumnChart v-bind:id="'trades'" v-bind:data="tradeData" v-bind:options="tradeOption" v-on:click="$emit('click', $event)"/>
    </div>
</template>

<script>
    import ColumnChart from "./ColumnChart";

    export default {
        name: "PortStatistic",
        components: {ColumnChart},
        data: function() {
            return {
                departureData: [
                    ['Departure', 'Voyages Count', {role: 'annotation'}],
                    ['London', 270, '270'],
                    ['New York', 256, '256'],
                    ['San Francisco', 215, '171'],
                    ['Los Angeles', 171, '171'],
                ],
                departureOption: {
                    title: 'The most popular departures:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkgreen'],
                    //width: 1000,
                    chartArea: {
                        left: 100,
                        //top: 0,
                        //width:
                    },
                    bar: {
                        groupWidth: "80%"
                    },
                    vAxis: {
                        baseline: 0,
                    }
                },
                destinationData: [
                    ['Destination', 'Voyages Count', {role: 'annotation'}],
                    ['London', 3525, '3525'],
                    ['New York', 3123, '3123'],
                    ['San Francisco', 2966, '2966'],
                    ['Los Angeles', 2570, '2570'],
                ],
                destinationOption: {
                    title: 'The most popular destination:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkgreen'],
                    //width: 1000,
                    chartArea: {
                        left: 100,
                        //top: 0,
                        //width:
                    },
                    bar: {
                        groupWidth: "80%"
                    },
                    vAxis: {
                        baseline: 0,
                    }
                },
                tradeData: [
                    ['Trade', 'Voyages Count', {role: 'annotation'}],
                    ['London -> New York', 270, '270'],
                    ['New York -> San Francisco', 256, '256'],
                    ['Salem -> Zanzibar', 215, '215'],
                    ['Saint Petersburg -> London', 171, '171'],
                ],
                tradeOption: {
                    title: 'The most popular trade routes:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkgreen'],
                    //width: 1000,
                    chartArea: {
                        left: 100,
                        //top: 0,
                        //width:
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
    }
</script>

<style scoped>
</style>
