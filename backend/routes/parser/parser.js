const fs = require('fs');

const AVR_EARTH_RAD = 6371;

function readTextFile(file, callback) {
    const rawRecords = fs.readFileSync(file, 'utf8');
    callback(rawRecords);
}

function parseStringToDate(str) {
    return new Date(parseInt(str.substr(0, 4)),
        parseInt(str.substr(4, 2)),
        parseInt(str.substr(6, 2)), 0, 0, 0);
}

function getMockedData(file) {
    let recordsList = [];
    readTextFile(file, function (sourceText) {
        const lines = sourceText.split('\n');
        recordsList = new Array(lines.length);
        for (let line = 0; line < lines.length; line++) {
            const currentLine = lines[line];
            let object = {};
            object.shipName = currentLine.substr(0, 8).trim();
            object.startDate = parseStringToDate(currentLine.substr(9, 8));
            object.endDate = parseStringToDate(currentLine.substr(18, 8));
            let destination = {};
            let departure = {};
            departure.lat = parseFloat(currentLine.substr(27, 4).trim());
            departure.lon = parseFloat(currentLine.substr(32, 4).trim());
            departure.name = currentLine.substr(88, 24).trimEnd();
            destination.lat = parseFloat(currentLine.substr(37, 4).trim());
            destination.lon = parseFloat(currentLine.substr(42, 4).trim());
            destination.name = currentLine.substr(113, 24).trimEnd();
            object.departure = departure;
            object.destination = destination;
            object.commander = currentLine.substr(70, 16).trim();
            const sin1 = Math.sin(departure.lat * Math.PI / 180.0);
            const sin2 = Math.sin(destination.lat * Math.PI / 180.0);
            const cos1 = Math.cos(departure.lat * Math.PI / 180.0);
            const cos2 = Math.cos(destination.lat * Math.PI / 180.0);
            const cos3 = Math.cos((departure.lon - destination.lon) * Math.PI / 180.0);
            const radDistance = Math.acos(sin1 * sin2 + cos1 * cos2 * cos3);
            object.distance = radDistance * AVR_EARTH_RAD;
            recordsList[line] = object
        }
    });
    return recordsList;
}

module.exports = getMockedData;