<template>
    <div>
        <h1>Sea Voyages Journal</h1>
        <button>ADD NEW RECORD</button>
        <button>RECORDS FILTER AND SORT</button>
        <button>STATISTICS</button>
        <button>BACK-UP USAGE</button>
        <table>
            <tr>
                <th>Ship Name</th>
                <th>Commander</th>
                <th>Departure</th>
                <th>Destination</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Distance, km</th>
                <th></th>
            </tr>
            <tr>
                <td>LEWIS</td>
                <td>D.HUTCHINSON</td>
                <td>SALEM</td>
                <td>ZANZIBAR</td>
                <td>1854/01/01</td>
                <td>1854/02/01</td>
                <td>465</td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Journal"
    }
</script>

<style scoped>

</style>
