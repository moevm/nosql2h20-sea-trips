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
        <div class="w3-cell-row w3-margin-bottom ">
            <div class="w3-cell" style="width: 15%">
                <label for="departureName">Departure:</label>
            </div>
            <div class="w3-cell" style="width: 35%">
                <input v-model="trip.departureName" name="departureName" type="text" id="departureName" class="w3-input w3-border w3-round-large" placeholder="Tartuga" required>
            </div>
            <div class="w3-cell" style="width: 15%; padding: 0 15px">
                <label for="destinationName">Destination:</label>
            </div>
            <div class="w3-cell" style="width: 35%">
                <input v-model="trip.destinationName" name="departureName" type="text" id="destinationName" class="w3-input w3-border w3-round-large" placeholder="London" required>
            </div>
        </div>
        <div class="w3-cell-row w3-margin-bottom ">
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

    export default {
        name: "TripForm",
        props: {
            isRequired: Boolean
        },
        data: function () {
            return {
                trip: new Trip(),
            }
        },
        methods: {
            Submit: function (event) {
                event.preventDefault();
                this.$emit('submit', this.trip);
            }
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
