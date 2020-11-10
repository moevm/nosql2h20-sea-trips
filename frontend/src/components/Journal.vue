<template>
    <div>
        <div>
            <h1>Sea Voyages Journal</h1>
            <div class="w3-container w3-section">
                <div class="w3-bar">
                    <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%" v-on:click="addRecordWindow.isVisible = true">ADD NEW RECORD</button>
                    <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46% ; margin: 0 2%" v-on:click="sortAndFilter.isVisible = true">RECORDS FILTER AND SORT</button>
                </div>
                <div class="w3-bar w3-margin-top">
                    <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%" v-on:click="$router.push({path: `/statistics`})">STATISTICS</button>
                    <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%" v-on:click="backUpWindow.isVisible = true">BACK-UP USAGE</button>
                </div>
            </div>
            <div class="w3-container w3-responsive">
                <table class="w3-table w3-border w3-bordered w3-centered w3-card">
                    <tr class="w3-light-grey">
                        <th>Ship Name</th>
                        <th>Commander</th>
                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Distance, km</th>
                        <th></th>
                    </tr>
                    <tr v-for="item in trips" v-bind:key="item.id" class="w3-hover-light-grey" v-on:click="GoToRecord($event, item.id)" style="cursor: pointer">
                        <td style="height: 10px">{{ item.shipName }}</td>
                        <td>{{ item.commander }}</td>
                        <td>{{ item.departureName }}</td>
                        <td>{{ item.destinationName }}</td>
                        <td>{{ item.startDate }}</td>
                        <td>{{ item.endDate }}</td>
                        <td>{{ item.distance }}</td>
                        <td style="padding: 0">
                            <button class="w3-button w3-red w3-block del-button" style="padding: 0; height: 40px" v-on:click="DelButtonClick(item.id)">Delete</button>
                        </td>
                    </tr>
                </table>
            </div>
            <sliding-pagination :current="pagination.currentPage" :total="pagination.totalPages" @page-change="pageChangeHandler"></sliding-pagination>
        </div>
        <ModalWindow v-if="modalWindow.isVisible" v-bind:header="modalWindow.header" v-bind:text="modalWindow.text" v-on:yes="DeleteRow()" v-on:no="modalWindow.isVisible = false"></ModalWindow>
        <AddRecord v-if="addRecordWindow.isVisible" v-on:add-trip="AddRow" v-on:close="addRecordWindow.isVisible = false"></AddRecord>
        <SortAndFilterTrip v-if="sortAndFilter.isVisible" v-on:filter-sort="GetTrips" v-on:close="sortAndFilter.isVisible = false"/>
        <BackUp v-if="backUpWindow.isVisible" v-on:no="backUpWindow.isVisible = false"></BackUp>
    </div>
</template>

<script>
    import axios from 'axios';
    import ModalWindow from "./ModalWindow";
    import AddRecord from "./AddRecord";
    import BackUp from "./BackUp";
    import Trip from "../classes/Trip";
    import SlidingPagination from 'vue-sliding-pagination';
    import SortAndFilterTrip from "./SortAndFilterTrip";
    import Handler from "../classes/Handler";

    export default {
        name: "Journal",
        components: {SortAndFilterTrip, BackUp, AddRecord, ModalWindow, SlidingPagination},
        data: function () {
            return {
                modalWindow: {
                    isVisible: false,
                    header: 'WARNING',
                    text: 'Do you want to delete this record?',
                    rowId: '',
                },
                addRecordWindow: {
                    isVisible: false,
                },
                backUpWindow: {
                    isVisible: false,
                },
                trips: [],
                pagination: {
                    countRowPerPage: 10,
                    totalPages: 1,
                    currentPage: 1,
                },
                sortAndFilter: {
                    isVisible: false,
                }
            }
        },
        methods: {
            DelButtonClick: function (rowId) {
                this.modalWindow.rowId = rowId;
                this.modalWindow.isVisible = true;
            },
            DeleteRow: async function () {
                await axios.delete(`http://localhost:3000/sea-journal/trip?ID=${this.modalWindow.rowId}`).then(response => {
                    Handler.Success(response, 'RECORD DELETED');
                    this.modalWindow.isVisible = false;
                    this.GetTrips();
                }, error => Handler.Error(error));
            },
            GoToRecord: function (event, id) {
                if (!event.target.classList.contains('del-button')) {
                    this.$router.push({path: `/record/${id}`});
                }
            },
            GetTrips: async function(offset = (this.pagination.currentPage - 1) * this.pagination.countRowPerPage, limit = this.pagination.countRowPerPage) {
                this.trips.length = 0;
                await axios.get(`http://localhost:3000/sea-journal/trips-count`).then(response => {
                    let tripsCount = response.data.tripsCount;
                    this.pagination.totalPages = Math.ceil(tripsCount / this.pagination.countRowPerPage);
                }, error => Handler.Error(error));
                await axios.get(`http://localhost:3000/sea-journal/trips?offset=${offset}&limit=${limit}`).then(response => {
                    let trips = response.data;
                    trips.forEach(item => {
                        let trip = new Trip();
                        trip.CopyValuesFromBdEntity(item);
                        this.trips.push(trip);
                    });
                }, error => Handler.Error(error));
            },
            AddRow: function () {
                this.addRecordWindow.isVisible = false;
                this.GetTrips();
            },
            pageChangeHandler(selectedPage) {
                this.pagination.currentPage = selectedPage;
                this.GetTrips();
            }
        },
        created() {
            this.GetTrips(0);
        }
    }
</script>

<style>
    @import "../assets/css/pagination-panel.css";
</style>
