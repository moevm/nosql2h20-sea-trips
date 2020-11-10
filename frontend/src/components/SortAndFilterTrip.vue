<template>
    <div id="modal-window" class="w3-modal" style="display: block">
        <div class="w3-modal-content w3-animate-zoom w3-border" style="margin-top: -4%; width: 50%">
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal" v-on:click="$emit('close')">&times;</span>
            <div class="w3-container w3-margin-top">
                <h2>FILTER AND SORTING</h2>
                <div>
                    <div class="w3-cell-row" style="padding: 0 20px">
                        <div class="w3-cell w3-left-align" style="width: 15%">
                            <h4 style="font-weight: bold">SORT BY:</h4>
                        </div>
                        <div class="w3-cell" style="width: 85%">
                            <div v-for="(item, index) in sorting" v-bind:key="index" class="w3-cell-row w3-margin-bottom">
                                <div class="w3-cell" style="width: 45%">
                                    <label>
                                        <select class="w3-select w3-border w3-round-large" style="cursor: pointer" v-model="item.field">
                                            <option v-for="option in tripSelectOptions" v-bind:key="option.name" v-bind:value="option.name">{{ option.option }}</option>
                                        </select>
                                    </label>
                                </div>
                                <div class="w3-cell" style="width: 6%"></div>
                                <div class="w3-cell" style="width: 45%">
                                    <label>
                                        <select class="w3-select w3-border w3-round-large" style="cursor: pointer" v-model="item.order">
                                            <option value="1">USUAL</option>
                                            <option value="-1">REVERSE</option>
                                        </select>
                                    </label>
                                </div>
                                <div class="w3-cell" style="width: 4%; padding-left: 3px">
                                    <span class="w3-button  w3-hover-red" title="Delete sorting field" v-on:click="DeleteSortSelect(index)">&#10006;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="w3-btn w3-border w3-light-grey w3-round" v-on:click="AddSortSelect">ADD NEW SORTING FIELD</button>
                </div>
                <div>
                    <div class="w3-left-align" style="padding: 0 20px">
                        <h4 style="font-weight: bold">FILTER BY:</h4>
                    </div>
                    <TripForm v-bind:is-required="false" v-on:submit="Apply"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TripForm from "./TripForm";
    import Trip from "../classes/Trip";
    import axios from "axios";
    import Handler from "../classes/Handler";

    export default {
        name: "SortAndFilterTrip",
        components: {TripForm},
        data: function() {
            return {
                sorting: [],
                tripSelectOptions: Trip.GetFieldsForSorting()
            }
        },
        methods: {
            Apply: async function (trip) {
                let deleteIndexes = [];
                for (let i = 0; i < this.sorting.length; i++) {
                    if (!this.sorting[i].order || !this.sorting[i].field) {
                        deleteIndexes.push(i);
                    }
                }
                deleteIndexes = deleteIndexes.reverse();
                deleteIndexes.forEach(item => {
                    this.sorting.splice(item, 1);
                });

                let filter = {};
                for (let field in trip) {
                    if (trip[field] !== '') {
                        filter[field] = trip[field];
                    }
                }
                let sorting = {};
                this.sorting.forEach((item) => {
                    sorting[item.field] = parseInt(item.order);
                });
                let data = {
                    filter: filter,
                    sorting: sorting
                };

                await axios.post('http://localhost:3000/sea-journal/set-filter-and-sorting', data).then(response => {
                    Handler.Success(response, 'SET FILTER AND SORT');
                    this.$emit('filter-sort');
                }, error => Handler.Error(error, 'NO FILTER AND SORT APPLIED'));
            },
            AddSortSelect: function () {
                if (this.sorting.length < Trip.GetFieldsForSorting().length) {
                    this.sorting.push({});
                }
            },
            DeleteSortSelect: function (index) {
                this.sorting.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
</style>
