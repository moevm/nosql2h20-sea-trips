<template>
    <div id="modal-window" class="w3-modal" style="display: block" v-on:click="CloseWindow($event)">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 3%; width: 35%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('no')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>BACK-UPS</h2>
                <div class="w3-section w3-left-align">
                    <div class="w3-margin-bottom">
                        <label class="w3-inline-block" style="margin-right: 17px" for="input-file">File name:</label>
                        <input id="input-file" type="file" class="w3-input w3-border w3-round-large input-file" ref="file" accept="application/json" v-on:change="GetFileName($event.target.value)">
                        <span id="file-name-label" class="w3-input w3-border w3-round-large" style="display: inline-block; width: 54%; margin-right: 17px">{{ this.fileNameLabelText }}</span>
                        <label class="w3-inline-block w3-btn w3-light-grey w3-border w3-round" style="width: 25%" for="input-file">REVIEW</label>
                    </div>
                    <div class="w3-bar w3-margin-bottom">
                        <input type="button" class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin-right: 39px" value="EXPORT DB TO FILE" v-on:click="DownloadFile">
                        <input type="button" class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%;" value="IMPORT DB FROM FILE" v-on:click="SendFile">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Handler from "../classes/Handler";

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
            },
            DownloadFile: async function () {
                await axios.get(`http://localhost:3000/sea-journal/export-data`).then(response => {
                    let link = document.createElement('a');
                    link.setAttribute('download', 'sea-trips-backup.json');
                    let type = 'data:application/json;base64, ';
                    let base = btoa(response.data);
                    link.href = type + base;
                    link.click();
                }, error => Handler.Error(error, 'ERROR DOWNLOAD FILE'));
            },
            SendFile: async function (event) {
                event.preventDefault();
                let file = this.$refs.file.files[0];
                if (file === undefined) {
                    Handler.Warn('SELECT FILE');
                    return;
                }
                let extension = file.name.substr(file.name.lastIndexOf('.'));
                if (extension !== '.json') {
                    Handler.Warn('SELECT A .JSON FILE');
                    return;
                }

                let formData = new FormData();
                formData.append('file', file);
                await axios.post(`http://localhost:3000/sea-journal/import-data`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                    Handler.Success(response, 'DB IMPORT COMPLETED');
                }, error => Handler.Error(error, 'DB IMPORT FAILED'));
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
