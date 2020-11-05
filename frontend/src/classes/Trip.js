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

    static GetFieldsForSorting() {
        return [
            {
                option: 'SHIP NAME',
                name: 'shipName'
            },
            {
                option: 'COMMANDER',
                name: 'commander'
            },
            {
                option: 'DEPARTURE NAME',
                name: 'departureName'
            },
            {
                option: 'DESTINATION NAME',
                name: 'destinationName'
            },
            {
                option: 'START DATE',
                name: 'startDate'
            },
            {
                option: 'END DATE',
                name: 'endDate'
            },
            {
                option: 'DISTANCE',
                name: 'distance'
            },
        ]
    }
}
