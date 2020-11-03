<template>
    <div id="modal-window" class="w3-modal" style="display: block" v-on:click="CloseWindow($event)">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 3%; width: 35%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('no')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>BACK-UPS</h2>
                <form class="w3-section w3-left-align">
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block" style="margin-right: 17px" for="input-file">File name:</label>
                        <input id="input-file" type="file" class="w3-input w3-border w3-round-large input-file" v-on:change="GetFileName($event.target.value)" required>
                        <span id="file-name-label" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 54%; margin-right: 17px">{{ this.fileNameLabelText }}</span>
                        <label class="w3-inline-block w3-btn w3-light-grey w3-border w3-round" style="width: 25%" for="input-file">REVIEW</label>
                    </div>
                    <div class="w3-bar w3-margin-bottom">
                        <input type="submit" class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin-right: 39px" value="EXPORT DB TO FILE" v-on:click="$emit('no')">
                        <input type="submit" class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%;" value="IMPORT DB FROM FILE" v-on:click="$emit('no')">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BackUp",
        data: function () {
            return {
                fileNameLabelText: "Choose a file..."
            }
        },
        methods: {
            GetFileName: function (str) {
                let i;
                if (str.lastIndexOf('\\')){
                    i = str.lastIndexOf('\\') + 1;
                } else {
                    i = str.lastIndexOf('/') + 1;
                }
                let filename = str.slice(i);
                if (filename === '') {
                    this.fileNameLabelText = "Choose a file...";
                } else {
                    this.fileNameLabelText = filename;
                }
            },
            CloseWindow: function (event) {
                if (event.target === document.getElementById('modal-window')) {
                    this.$emit('no');
                }
            }
        }
    }
</script>

<style scoped>
    .input-file {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
</style>
