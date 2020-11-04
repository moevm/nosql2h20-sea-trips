<template>
    <div id="modal-window" class="w3-modal" style="display: block">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 3%; width: 40%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('close')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>ADD NEW RECORD</h2>
                <form class="w3-section w3-left-align" action="http://localhost:3000/sea-journal/add-trip" method="post" v-on:submit="Add($event)">
                    <label class="w3-block w3-margin-bottom">
                        Ship name:
                        <input v-model="trip.shipName" type="text" name="shipName" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 84%; margin-left: 12px" placeholder="Black Pearl" required>
                    </label>
                    <label class="w3-block w3-margin-bottom">
                        Commander:
                        <input v-model="trip.commander" type="text" name="commander" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 84%; margin-left: 2px" placeholder="Cpt. Jack Sparrow" required>
                    </label>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Departure:
                            <input v-model="trip.departureName" type="text" name="departureName" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 19px; margin-right: 15px" placeholder="Tartuga" required>
                        </label>
                        <label class="w3-inline-block">
                            Destination:
                            <input v-model="trip.destinationName" type="text" name="destinationName" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%" placeholder="London" required>
                        </label>
                    </div>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Start Date:
                            <input v-model="trip.startDate" type="date" name="startDate" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 19px; margin-right: 15px" required>
                        </label>
                        <label class="w3-inline-block">
                            End Date:
                            <input v-model="trip.endDate" type="date" name="endDate" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 11px" required>
                        </label>
                    </div>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Distance, km:
                            <input v-model="trip.distance" type="text" name="distance" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%" placeholder="2000" required>
                        </label>
                    </div>
                    <input type="submit" class="w3-btn w3-block w3-light-grey w3-border w3-round" style="width: 33%; margin-left: 67%" value="SUBMIT">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Trip from "../classes/Trip";

    export default {
        name: "AddRecord",
        data: function() {
            return {
                trip: new Trip()
            }
        },
        methods: {
            Add: async function(event)  {
                event.preventDefault();
                await axios.post('http://localhost:3000/sea-journal/add-trip', this.trip).then(response => {
                    console.log('response:', response);
                    //window.alert('Add new record!');
                    this.$emit('add-trip');
                }, error => {
                    console.log('error:', error);
                });
            }
        }
    }
</script>

<style scoped>
</style>
