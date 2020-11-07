<template>
    <div style="margin: 0 100px">
        <h1>Sea Voyages Journal: Statistics</h1>
        <div>
            <form v-on:submit="GetData">
                <div class="w3-cell-row w3-margin-bottom w3-left-align">
                    <div class="w3-cell" style="width: 10%">
                        <span>Time period:</span>
                    </div>
                    <div class="w3-cell" style="width: 20%">
                        <div class="w3-cell-row">
                            <div class="w3-cell">
                                <label>
                                    <input type="number" min="0" name="start" class="w3-input w3-border w3-round-large" required>
                                </label>
                            </div>
                            <div class="w3-cell w3-center" style="padding: 10px">
                                <span>&mdash;</span>
                            </div>
                            <div class="w3-cell">
                                <label>
                                    <input type="number" min="0" name="end" class="w3-input w3-border w3-round-large" required>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="w3-cell">
                        <label style="font-weight: bold; margin: 0 30px">
                            <input type="radio" class="w3-radio" name="statistic" value="trips" required v-on:change="Test($event)">
                            Voyages statistic
                        </label>
                        <label style="font-weight: bold">
                            <input type="radio" class="w3-radio" name="statistic" value="ports" v-on:change="Test($event)">
                            Port statistic
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="SHOW STATISTIC" class="w3-btn w3-light-grey w3-border w3-round" style="padding: 8px 28px"/>
                </div>
            </form>
        </div>
        <TripStatistic v-if="isVisibleTripStatistic" v-on:click="ClickOnAChartData"/>
        <PortStatistic v-if="isVisiblePortStatistic" v-on:click="ClickOnAChartData"/>
    </div>
</template>

<script>
    import TripStatistic from "./TripStatistic";
    import PortStatistic from "./PortStatistic";

    export default {
        name: "Statistics",
        components: {PortStatistic, TripStatistic},
        data: function() {
            return {
                isVisibleTripStatistic: false,
                isVisiblePortStatistic: false,
            }
        },
        methods: {
            ClickOnAChartData: function (data) {
                console.log(data);
            },
            GetData: function () {
                // запрос данных
            },
            Test: function (event) {
                console.log(event.target.value);
                if (event.target.value === 'ports') {
                    this.isVisibleTripStatistic = false;
                    this.isVisiblePortStatistic = true;
                }
                if (event.target.value === 'trips') {
                    this.isVisiblePortStatistic = false;
                    this.isVisibleTripStatistic = true;
                }
            }
        },
    }
</script>

<style scoped>
</style>
