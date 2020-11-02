<template>
    <div id="modal-window" class="w3-modal" style="display: block" v-on:click="CloseModal($event)">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: 10%; width: 20%">
            <div class="w3-container">
                <h2>{{ header }}</h2>
                <p>{{ text }}</p>
                <div class="w3-bar w3-section">
                    <button class="w3-btn w3-light-grey w3-border" style="margin-right: 80px; width: 70px" v-on:click="$emit('yes')">YES</button>
                    <button class="w3-btn w3-light-grey w3-border" style="width: 70px" v-on:click="$emit('no')">NO</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalWindow",
        props: {
            header: String,
            text: String
        },
        //props: ['header', 'text'],
        methods: {
            CloseModal: function (event) {
                if (event.target === document.getElementById('modal-window')) {
                    this.$emit('no');
                }
            }
        }
    }
</script>

<style scoped>

</style>
