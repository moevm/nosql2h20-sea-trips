<template>
    <div>
        <h1>Sea Voyages Journal</h1>
        <div class="w3-container w3-section">
            <div class="w3-bar">
                <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%">ADD NEW RECORD</button>
                <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46% ; margin: 0 2%">RECORDS FILTER AND SORT</button>
            </div>
            <div class="w3-bar w3-margin-top">
                <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%">STATISTICS</button>
                <button class="w3-btn w3-light-grey w3-border w3-round" style="width: 46%; margin: 0 2%">BACK-UP USAGE</button>
            </div>
        </div>
        <div class="w3-container w3-section w3-responsive">
            <table class="w3-table w3-border w3-bordered w3-centered w3-card">
                <tr class="w3-light-grey">
                    <th>Ship Name</th>
                    <th>Commander</th>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Distance, km</th>
                    <th></th>
                </tr>
                <tr v-for="item in voyages" v-bind:key="item.id" class="w3-hover-light-grey">
                    <td style="height: 10px">{{ item.ship }}</td>
                    <td>{{ item.commander }}</td>
                    <td>{{ item.departure }}</td>
                    <td>{{ item.destination }}</td>
                    <td>{{ item.start }}</td>
                    <td>{{ item.end }}</td>
                    <td>{{ item.distance }}</td>
                    <td style="padding: 0">
                        <button class="w3-button w3-red w3-block" style="padding: 0; height: 40px" v-on:click="DelButtonClick(item.id)">Delete</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="w3-container w3-section w3-center">
            <div class="w3-bar w3-border w3-round">
                <a href="#" class="w3-button">&laquo;</a>
                <a href="#" class="w3-button w3-light-grey">1</a>
                <a href="#" class="w3-button">2</a>
                <a href="#" class="w3-button">3</a>
                <a href="#" class="w3-button">4</a>
                <a href="#" class="w3-button">...</a>
                <a href="#" class="w3-button">20</a>
                <a href="#" class="w3-button">&raquo;</a>
            </div>
        </div>
        <ModalWindow v-if="modalWindow.isVisible" v-bind:header="modalWindow.header" v-bind:text="modalWindow.text" v-on:yes="DeleteRow()" v-on:no="modalWindow.isVisible = false"></ModalWindow>
    </div>
</template>

<script>
    import ModalWindow from "./ModalWindow";

    export default {
        name: "Journal",
        components: {ModalWindow},
        data: function () {
            return {
                modalWindow: {
                    isVisible: false,
                    header: 'Warning',
                    text: 'Do you want to delete this record?',
                    rowId: '',
                },
                voyages: [
                    {
                        id: '1',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '2',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '3',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '4',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '5',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '6',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '7',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '8',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '9',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                    {
                        id: '10',
                        ship: 'LEWIS',
                        commander: 'D.HUTCHINSON',
                        departure: 'SALEM',
                        destination: 'ZANZIBAR',
                        start: '1854/01/01',
                        end: '1854/02/01',
                        distance: '465'
                    },
                ]
            }
        },
        methods: {
            DelButtonClick: function (rowId) {
                this.modalWindow.rowId = rowId;
                this.modalWindow.isVisible = true;
            },
            DeleteRow: function () {
                console.log(`Удаление из бд записи с id = ${this.modalWindow.rowId}`)
            }
        }
    }
</script>

<style scoped>

</style>
