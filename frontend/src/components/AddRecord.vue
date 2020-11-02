<template>
    <div id="modal-window" class="w3-modal" style="display: block">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 3%; width: 40%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('no')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>ADD NEW RECORD</h2>
                <form class="w3-section w3-left-align">
                    <label class="w3-block w3-margin-bottom">
                        Ship name:
                        <input type="text" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 84%; margin-left: 12px" placeholder="Black Pearl" required>
                    </label>
                    <label class="w3-block w3-margin-bottom">
                        Commander:
                        <input type="text" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 84%; margin-left: 2px" placeholder="Cpt. Jack Sparrow" required>
                    </label>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Departure:
                            <input type="text" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 19px; margin-right: 15px" placeholder="Tartuga" required>
                        </label>
                        <label class="w3-inline-block">
                            Destination:
                            <input type="text" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%" placeholder="London" required>
                        </label>
                    </div>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Start Date:
                            <input type="date" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 19px; margin-right: 15px" required>
                        </label>
                        <label class="w3-inline-block">
                            End Date:
                            <input type="date" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%; margin-left: 11px" required>
                        </label>
                    </div>
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block">
                            Distance, km:
                            <input type="text" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 33%" placeholder="2000" required>
                        </label>
                    </div>
                    <input type="submit" class="w3-btn w3-block w3-light-grey w3-border w3-round" style="width: 33%; margin-left: 67%" value="SUBMIT" v-on:click="$emit('no')">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddRecord",
        methods: {
        }
    }
</script>

<style scoped>
</style>
