<template>
    <div>
        <ColumnChart v-bind:id="'average'" v-bind:data="averageDistanceData" v-bind:options="averageDistanceOption" v-on:click="$emit('click', $event)"/>
        <ColumnChart v-bind:id="'voyages'" v-bind:data="voyagesData" v-bind:options="voyagesOption" v-on:click="$emit('click', $event)"/>
        <ColumnChart v-bind:id="'mileage'" v-bind:data="mileageData" v-bind:options="mileageOption" v-on:click="$emit('click', $event)"/>
    </div>
</template>

<script>
    import ColumnChart from "./ColumnChart";

    export default {
        name: "TripStatistic",
        components: {ColumnChart},
        data: function() {
            return {
                averageDistanceData: [
                    ['Date', 'Average distance per years', {role: 'annotation'}],
                    ['1840', 1756.65, '1756.65'],
                    ['1841', 1888.07, '1888.07'],
                    ['1842', 1799.3, '1799.3'],
                    ['1843', 1656.23, '1656.23'],
                    ['1844', 1701.95, '1701.95'],
                ],
                averageDistanceOption: {
                    title: 'Average distance per years:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkblue'],
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
                voyagesData: [
                    ['Ship', 'Voyages count', {role: 'annotation'}],
                    ['Lewis', 270, '270'],
                    ['St.Maria', 256, '256'],
                    ['Lady Anna', 215, '215'],
                    ['St.Paul', 171, '171'],
                ],
                voyagesOption: {
                    title: 'Ships with the biggest count of voyages:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkblue'],
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
                mileageData: [
                    ['Ship', 'Mileage', {role: 'annotation'}],
                    ['Lewis', 3525, '3525'],
                    ['St.Maria', 3123, '3123'],
                    ['Lady Anna', 2966, '2966'],
                    ['St.Paul', 2570, '2570'],
                ],
                mileageOption: {
                    title: 'Ships with the biggest mileage:',
                    legend: {
                        position: 'top',
                        alignment: 'center',
                    },
                    colors: ['darkblue'],
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
                }
            }
        },
    }
</script>

<style scoped>
</style>
