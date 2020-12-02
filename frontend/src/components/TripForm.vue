<template>
    <form class="w3-section w3-left-align" style="padding: 0 20px" v-on:submit="Submit($event)">
        <div class="w3-margin-bottom">
            <label for="shipName" style="display: inline-block; width: 15%">Ship name:</label>
            <input v-model="trip.shipName" name="shipName" type="text" id="shipName" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 85%" placeholder="Black Pearl" required>
        </div>
        <div class="w3-margin-bottom">
            <label for="commander" style="display: inline-block; width: 15%">Commander:</label>
            <input v-model="trip.commander" name="commander" type="text" id="commander" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 85%" placeholder="Cpt. Jack Sparrow" required>
        </div>
        <div>
            <div v-if="!isSelectPortList" class="w3-cell-row w3-margin-bottom">
                <div class="w3-cell" style="width: 15%">
                    <label for="departureNameText">Departure:</label>
                </div>
                <div class="w3-cell" style="width: 35%">
                    <input v-model="trip.departureName" name="departureName" type="text" id="departureNameText" class="w3-input w3-border w3-round-large" placeholder="Tartuga" required>
                </div>
                <div class="w3-cell" style="width: 15%; padding: 0 10px;">
                    <label for="destinationNameText">Destination:</label>
                </div>
                <div class="w3-cell" style="width: 35%">
                    <input v-model="trip.destinationName" name="destinationName" type="text" id="destinationNameText" class="w3-input w3-border w3-round-large" placeholder="London" required>
                </div>
            </div>
            <div v-if="isSelectPortList" class="w3-cell-row w3-margin-bottom">
                <div class="w3-cell" style="width: 15%">
                    <label for="departureNameSelect">Departure:</label>
                </div>
                <div class="w3-cell" style="width: 35%">
                    <select v-model="trip.departureName" name="departureName" id="departureNameSelect" class="w3-select w3-border w3-round-large">
                        <option v-for="option in departures" v-bind:key="option" v-bind:value="option">{{ option }}</option>
                    </select>
                </div>
                <div class="w3-cell" style="width: 15%; padding: 0 10px;">
                    <label for="destinationNameSelect">Destination:</label>
                </div>
                <div class="w3-cell" style="width: 35%">
                    <select v-model="trip.destinationName" name="destinationName" id="destinationNameSelect" class="w3-select w3-border w3-round-large">
                        <option v-for="option in destinations" v-bind:key="option" v-bind:value="option">{{ option }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="w3-cell-row w3-margin-bottom">
            <div class="w3-cell" style="width: 15%">
                <label for="startDate">Start Date:</label>
            </div>
            <div class="w3-cell" style="width: 35%">
                <input v-model="trip.startDate" name="startDate" type="date" id="startDate" class="w3-input w3-border w3-round-large" required>
            </div>
            <div class="w3-cell" style="width: 15%; padding: 0 15px">
                <label for="endDate">End Date:</label>
            </div>
            <div class="w3-cell" style="width: 35%">
                <input v-model="trip.endDate" name="endDate" type="date" id="endDate" class="w3-input w3-border w3-round-large" required>
            </div>
        </div>
        <div class="w3-margin-bottom">
            <label for="distance" style="display: inline-block; width: 15%">Distance, km:</label>
            <input v-model="trip.distance" name="distance" type="text" id="distance" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 35%" placeholder="2000" required>
        </div>
        <div class="w3-right-align">
            <input type="submit" class="w3-btn w3-inline-block w3-light-grey w3-border w3-round" style="width: 35%" value="SUBMIT">
        </div>
    </form>
</template>

<script>
    import Trip from "../classes/Trip";
    import axios from "axios";
    import Handler from "../classes/Handler";

    export default {
        name: "TripForm",
        props: {
            isRequired: Boolean,
            isSelectPortList: Boolean,
        },
        data: function () {
            return {
                trip: new Trip(),
                departures: [],
                destinations: [],
            }
        },
        methods: {
            Submit: function (event) {
                event.preventDefault();
                this.$emit('submit', this.trip);
            }
        },
        async created() {
            await axios.get('http://localhost:3000/sea-journal/cities-lists').then(response => {
                this.departures = response.data.departures;
                this.destinations = response.data.destinations;
            }, error => Handler.Error(error, 'PORT LIST NOT RECEIVED'));
        },
        mounted() {
            if (this.isRequired === false) {
                for (let item of document.getElementsByClassName('w3-input')) {
                    item.required = false;
                }
            }
        }
    }
</script>

<style scoped>
</style>
