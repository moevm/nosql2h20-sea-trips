<template>
    <div id="modal-window" class="w3-modal" style="display: block; overflow-y: hidden">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="width: 90%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('close')">&times;</span>
            <div class="w3-container" style="margin: 0 30px">
                <h2 class="w3-margin-bottom" style="font-weight: bold">{{ header }}</h2>
                <div class="w3-responsive" style="max-height: 470px; margin-bottom: 40px; overflow-y: hidden">
                    <div style="max-height: 432px; overflow-y: scroll">
                        <table class="w3-table w3-border w3-bordered w3-centered w3-card">
                            <tr class="w3-light-grey">
                                <th>Ship Name</th>
                                <th>Commander</th>
                                <th>Departure</th>
                                <th>Destination</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Distance, km</th>
                            </tr>
                            <tr v-for="item in trips" v-bind:key="item.id" class="w3-hover-light-grey">
                                <td style="height: 10px">{{ item.shipName }}</td>
                                <td>{{ item.commander }}</td>
                                <td>{{ item.departureName }}</td>
                                <td>{{ item.destinationName }}</td>
                                <td>{{ item.startDate }}</td>
                                <td>{{ item.endDate }}</td>
                                <td>{{ item.distance }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TableModal",
        props: {
            header: String,
            trips: Array
        }
    }
</script>

<style scoped>
</style>
