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

    CopyValuesFromBdEntity(entity) {
        this.id = entity._id;
        this.shipName = entity.shipName;
        this.commander = entity.commander;
        this.departureName = entity.departure.name;
        this.destinationName = entity.destination.name;
        this.startDate = entity.startDate;
        this.endDate = entity.endDate;
        this.distance = entity.distance;
    }
}
