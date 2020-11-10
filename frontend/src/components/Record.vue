<template>
    <div>
        <h1>Sea Voyages Journal: Record № {{ this.$route.params.id }}</h1>
        <div style="margin-top: 50px">
            <div class="w3-left-align" style="margin-left: 16%">
                <div class="w3-margin-bottom">
                    <span style="font-weight: bold; display: inline-block; margin-right: 30px">Ship Name:</span>
                    <span>{{ trip.shipName }}</span>
                </div>
                <div class="w3-margin-bottom">
                    <span style="font-weight: bold; display: inline-block; margin-right: 20px">Commander:</span>
                    <span>{{ trip.commander }}</span>
                </div>
            </div>
            <div style="margin-top: 50px">
                <div class="w3-cell-row">
                    <div class="w3-cell square-with-diagonals-container">
                        <div class="square-with-diagonals"></div>
                    </div>
                    <div class="w3-cell w3-cell-middle" style="width: 40%; padding-right: 22px">
                        <div class="arrow"></div>
                        <div style="position: relative">
                            <span style="display: inline-block; width: 80px; position: absolute; right: 40%; top: -40px">{{ trip.distance }} km</span>
                        </div>
                    </div>
                    <div class="w3-cell square-with-diagonals-container">
                        <div class="square-with-diagonals"></div>
                    </div>
                </div>
                <div class="w3-cell-row w3-margin-top">
                    <div class="w3-cell square-with-diagonals-container">
                        <div>
                            <span>{{ trip.departureName }}</span>
                        </div>
                        <div>
                            <span>{{ trip.startDate }}</span>
                        </div>
                    </div>
                    <div class="w3-cell w3-cell-middle" style="width: 40%; padding-right: 22px">
                    </div>
                    <div class="w3-cell square-with-diagonals-container">
                        <div>
                            <span>{{ trip.destinationName }}</span>
                        </div>
                        <div>
                            <span>{{ trip.endDate }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 50px">
                <button class="w3-btn w3-light-grey w3-border w3-round" v-on:click="$router.push({path: `/`})">RETURN TO MAIN PAGE</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Trip from "../classes/Trip";
    import Handler from "../classes/Handler";

    export default {
        name: "Record",
        data: function () {
            return {
                trip: new Trip(),
            }
        },
        created() {
            let tripID = this.$route.params.id;
            axios.get(`http://localhost:3000/sea-journal/trip/${tripID}`).then(response => {
                this.trip.CopyValuesFromBdEntity(response.data);
            }, error => Handler.Error(error, 'RECORD NOT RECEIVED'));
        }
    }
</script>

<style scoped>
    @import "../assets/css/right-arrow.css";
</style>
