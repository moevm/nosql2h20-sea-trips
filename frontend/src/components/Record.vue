<template>
    <div>
        <h1>Sea Voyages Journal: Record №{{ this.$route.params.id }}</h1>
        <div style="margin-top: 50px">
            <div class="w3-left-align" style="margin-left: 16%">
                <div class="w3-margin-bottom">
                    <span style="font-weight: bold; display: inline-block; margin-right: 30px">Ship Name:</span>
                    <span>{{ ship }}</span>
                </div>
                <div class="w3-margin-bottom">
                    <span style="font-weight: bold; display: inline-block; margin-right: 20px">Commander:</span>
                    <span>{{ commander }}</span>
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
                            <span style="display: inline-block; width: 80px; position: absolute; right: 40%; top: -40px">{{ distance }} km</span>
                        </div>
                    </div>
                    <div class="w3-cell square-with-diagonals-container">
                        <div class="square-with-diagonals"></div>
                    </div>
                </div>
                <div class="w3-cell-row w3-margin-top">
                    <div class="w3-cell square-with-diagonals-container">
                        <div>
                            <span>{{ departure }}</span>
                        </div>
                        <div>
                            <span>{{ start }}</span>
                        </div>
                    </div>
                    <div class="w3-cell w3-cell-middle" style="width: 40%; padding-right: 22px">
                    </div>
                    <div class="w3-cell square-with-diagonals-container">
                        <div>
                            <span>{{ destination }}</span>
                        </div>
                        <div>
                            <span>{{ end }}</span>
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
    export default {
        name: "Record",
        data: function () {
            return {
                ship: 'COVINGA',
                commander: 'CHAS.N.BATES',
                departure: 'NEW YORK',
                destination: 'SAN FRANCISCO',
                start: '1853/12/04',
                end: '1804/01/40',
                distance: '2134'
            }
        }
    }
</script>

<style scoped>
    .arrow {
        position: relative;
        margin: 50px auto;
    }

    .arrow:before, .arrow:after {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border: 40px solid transparent;
        border-right: 0;
    }

    .arrow {
        width: 100%;
        height: 10px;
        background: #000000;
    }

    .arrow:after {
        top: -7px;
        right: -25px;
        border-left-color: #000000;
        border-width: 12px 0 12px 60px;
    }

    .square-with-diagonals-container{
        width: 200px;
    }

    .square-with-diagonals{
        position: relative;
        width: 200px;
        height: 200px;
        border: 5px solid #000000;
    }

    .square-with-diagonals:before, .square-with-diagonals:after {
        position: absolute;
        top: -42px;
        content: ' ';
        height: 273px;
        width: 4px;
        background-color: #000000;
    }

    .square-with-diagonals:before {
        transform: rotate(45deg);
    }

    .square-with-diagonals:after {
        transform: rotate(-45deg);
    }
</style>
