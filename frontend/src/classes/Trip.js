export default class Trip {
    constructor() {
        this.shipName = '';
        this.commander = '';
        this.departureName = '';
        this.destinationName = '';
        this.startDate = '';
        this.endDate = '';
        this.distance = '';
    }

    initValues(id, shipName, commander, departureName, destinationName, startDate, endDate, distance) {
        this.id = id;
        this.shipName = shipName;
        this.commander = commander;
        this.departureName = departureName;
        this.destinationName = destinationName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.distance = distance;
    }
}
