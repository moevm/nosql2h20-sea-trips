export default class TripStatisticData {
    constructor() {
        this.averages= [];
        this.voyages = [];
        this.mileage = [];
    }

    SetValuesFromResponseData(data) {
        this.averages = [['Date', 'Average distance per years', {role: 'annotation'}], ...data.averages];
        this.voyages = [['Ship', 'Voyages count', {role: 'annotation'}], ...data.voyages];
        this.mileage = [['Ship', 'Mileage', {role: 'annotation'}], ...data.mileage];
    }
}
