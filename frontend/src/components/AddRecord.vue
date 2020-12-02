<template>
    <div id="modal-window" class="w3-modal" style="display: block">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 3%; width: 50%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('close')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>ADD NEW RECORD</h2>
                <TripForm v-bind:is-required="true" v-bind:is-select-port-list="false" v-on:submit="Add"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import TripForm from "./TripForm";
    import Handler from "../classes/Handler";

    export default {
        name: "AddRecord",
        components: {TripForm},
        methods: {
            Add: async function(trip)  {
                await axios.post('http://localhost:3000/sea-journal/add-trip', trip).then(response => {
                    Handler.Success(response, 'RECORD ADDED');
                    this.$emit('add-trip');
                }, error => Handler.Error(error, 'NO RECORD ADDED'));
            }
        }
    }
</script>

<style scoped>
</style>
