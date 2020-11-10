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
        this.startDate = Trip.GetFormatStrFromDate(new Date(Date.parse(entity.startDate)));
        this.endDate = Trip.GetFormatStrFromDate(new Date(Date.parse(entity.endDate)));
        this.distance = Math.round(entity.distance);
    }

    static GetFormatStrFromDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        return `${year}/${month}/${day}`;
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
