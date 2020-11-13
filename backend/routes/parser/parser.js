const fs = require('fs');

const AVR_EARTH_RAD = 6372.795;

function readTextFile(file, callback) {
    const rawRecords = fs.readFileSync(file, 'utf8');
    callback(rawRecords);
}

function parseStringToDate(str) {
    return new Date(parseInt(str.substr(0, 4)),
        parseInt(str.substr(4, 2)),
        parseInt(str.substr(6, 2)), 0, 0, 0);
}

function calcDistance(depLat, depLon, destLat, destLon) {
    const sin1 = Math.sin(depLat * Math.PI / 180.0);
    const sin2 = Math.sin(destLat * Math.PI / 180.0);
    const cos1 = Math.cos(depLat * Math.PI / 180.0);
    const cos2 = Math.cos(destLat * Math.PI / 180.0);
    const cos3 = Math.cos((depLon - destLon) * Math.PI / 180.0);
    const sin3 = Math.sin((depLon - destLon) * Math.PI / 180.0);
    const tempResult1 = Math.sqrt(Math.pow(cos2 * sin3, 2) + Math.pow(cos1 * sin2 - sin1 * cos2 * cos3, 2));
    const tempResult2 = sin1 * sin2 + cos1 * cos2 * cos3;
    return Math.atan2(tempResult1, tempResult2) * AVR_EARTH_RAD;
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
            object.distance = calcDistance(departure.lat, departure.lon, destination.lat, destination.lon);
            recordsList[line] = object
        }
    });
    return recordsList;
}

module.exports = getMockedData;