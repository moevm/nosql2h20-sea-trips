function readTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                const allText = rawFile.responseText;
                callback(allText)
            }
        }
    };
    rawFile.send(null);
}

function parseStringToDate(str) {
    return new Date(parseInt(str.substr(0, 4)),
        parseInt(str.substr(4, 2)),
        parseInt(str.substr(6, 2)), 0, 0, 0);
}

function getMockedData(file, callback) {
    readTextFile(file, function (sourceText) {
        const lines = sourceText.split('\n');
        let ret = new Array(lines.length);
        for (var line = 0; line < lines.length; line++) {
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
            ret[line] = object
        }

        callback(ret)
    });
}

getMockedData("mock_data.txt", function (ret) {
    console.log(ret);
});