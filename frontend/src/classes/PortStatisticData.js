export default class PortStatisticData {
    constructor() {
        this.departures = [];
        this.destinations = [];
        this.trades = [];
    }

    SetValuesFromResponseData(data) {
        this.departures = [['Departure', 'Voyages Count', {role: 'annotation'}], ...data.departures];
        this.destinations = [['Destination', 'Voyages Count', {role: 'annotation'}], ...data.destinations];
        this.trades = [['Trade', 'Voyages Count', {role: 'annotation'}], ...data.trades];
    }
}
