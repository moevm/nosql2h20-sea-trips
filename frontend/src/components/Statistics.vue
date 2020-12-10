<template>
    <div style="margin: 0 100px">
        <h1>Sea Voyages Journal: Statistics</h1>
        <div class="w3-margin-bottom">
            <form v-on:submit="GetData($event)" v-on:change="DropStatistic" class="w3-margin-bottom w3-margin-top">
                <div class="w3-cell-row w3-margin-bottom w3-left-align" style="margin-left: 100px">
                    <div class="w3-cell" style="width: 10%">
                        <span>Time period:</span>
                    </div>
                    <div class="w3-cell" style="width: 20%">
                        <div class="w3-cell-row">
                            <div class="w3-cell" style="width: 45%">
                                <label>
                                    <input type="number" min="0" name="start" v-model="start" class="w3-input w3-border w3-round-large" required>
                                </label>
                            </div>
                            <div class="w3-cell w3-center" style="padding: 10px; width: 10%">
                                <span>&mdash;</span>
                            </div>
                            <div class="w3-cell" style="width: 45%">
                                <label>
                                    <input type="number" min="0" name="end" v-model="end" class="w3-input w3-border w3-round-large" required>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="w3-cell">
                        <label style="font-weight: bold; margin: 0 30px">
                            <input type="radio" class="w3-radio" name="statistic" value="trips" required v-on:change="ChangeStatistic($event)">
                            Voyages statistic
                        </label>
                        <label style="font-weight: bold">
                            <input type="radio" class="w3-radio" name="statistic" value="ports" v-on:change="ChangeStatistic($event)">
                            Port statistic
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="SHOW STATISTIC" class="w3-btn w3-light-grey w3-border w3-round" style="padding: 8px 28px"/>
                </div>
            </form>
        </div>
        <TripStatistic v-bind:statistic="tripStatistic" v-if="isVisibleTripStatistic" v-on:click="ClickOnAChartData"/>
        <PortStatistic v-bind:statistic="portStatistic" v-if="isVisiblePortStatistic" v-on:click="ClickOnAChartData"/>
        <TableModal v-bind:trips="tableModal.trips" v-bind:header="tableModal.header" v-if="tableModal.isVisible" v-on:close="tableModal.isVisible = false"/>
    </div>
</template>

<script>
    import TripStatistic from "./TripStatistic";
    import PortStatistic from "./PortStatistic";
    import axios from "axios";
    import Handler from "../classes/Handler";
    import PortStatisticData from "../classes/PortStatisticData";
    import TripStatisticData from "../classes/TripStatisticData";
    import TableModal from "./TableModal";
    import Trip from "../classes/Trip";

    export default {
        name: "Statistics",
        components: {TableModal, PortStatistic, TripStatistic},
        data: function() {
            return {
                isVisibleTripStatistic: false,
                isVisiblePortStatistic: false,
                statistic: '',
                start: '',
                end: '',
                tripStatistic: new TripStatisticData(),
                portStatistic: new PortStatisticData(),
                tableModal: {
                    isVisible: false,
                    header: '',
                    trips: []
                }
            }
        },
        methods: {
            ClickOnAChartData: async function (url, header, isUseDateParam = true) {
                let requestURL = url;
                if (isUseDateParam) {
                    requestURL = url.concat(`&start=${this.start}&end=${this.end}`);
                }
                await axios.get(requestURL).then(response => {
                    this.tableModal.trips.length = 0;
                    let trips = response.data;
                    trips.forEach(item => {
                        let trip = new Trip();
                        trip.CopyValuesFromBdEntity(item);
                        this.tableModal.trips.push(trip);
                    });
                    this.tableModal.header = header;
                    this.tableModal.isVisible = true;
                }, error => Handler.Error(error));
            },
            GetData: async function (event) {
                event.preventDefault();
                let start = parseInt(this.start);
                let end = parseInt(this.end);

                await axios.get(`http://localhost:3000/sea-journal/${this.statistic}-statistics?start=${start}&end=${end}`).then(response => {
                    for (let field in response.data) {
                        if (response.data[field].length === 0) {
                            Handler.Warn('DATA NOT FOUND. CAN\'T BUILD CHARTS');
                            return;
                        }
                    }
                    if (this.statistic === 'ports') {
                        this.portStatistic.SetValuesFromResponseData(response.data);
                        this.isVisibleTripStatistic = false;
                        this.isVisiblePortStatistic = true;
                    }
                    if (this.statistic === 'trips') {
                        this.tripStatistic.SetValuesFromResponseData(response.data);
                        this.isVisiblePortStatistic = false;
                        this.isVisibleTripStatistic = true;
                    }
                }, error => Handler.Error(error));
            },
            ChangeStatistic: function (event) {
                this.statistic = event.target.value;
            },
            DropStatistic: function () {
                this.isVisiblePortStatistic = false;
                this.isVisibleTripStatistic = false;
            }
        },
    }
</script>

<style scoped>
</style>
