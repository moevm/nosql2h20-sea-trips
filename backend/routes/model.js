const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const {exec} = require('child_process');
const getMockedData = require('./parser/parser');

const ADDRESS = "docker-db";
const PORT = "27017";
const DB = "journalDB";
const COLLECTION = "journal";
let MOCK_FILE = `${__dirname}/parser/mock_data.txt`;

const prepareFilterObject = function (filterObject) {
    if (filterObject.departureName) {
        filterObject["departure.name"] = filterObject.departureName;
        delete filterObject.departureName;
    }
    if (filterObject.destinationName) {
        filterObject["destination.name"] = filterObject.destinationName;
        delete filterObject.destinationName;
    }
    if (filterObject.startDate) {
        filterObject.startDate = new Date(filterObject.startDate);
    }
    if (filterObject.endDate) {
        filterObject.endDate = new Date(filterObject.endDate);
    }
};
const prepareSortingObject = function (sortingObject) {
    if (sortingObject.departureName) {
        sortingObject["departure.name"] = sortingObject.departureName;
        delete sortingObject.departureName;
    }
    if (sortingObject.destinationName) {
        sortingObject["destination.name"] = sortingObject.destinationName;
        delete sortingObject.destinationName;
    }
};

class Model {
    constructor() {
        this.filter = {};
        this.sorting = {};
    }

    async init() {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        let alreadyExists = false;
        const journal = await journalDB.createCollection(COLLECTION, {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["shipName", "commander", "departure", "destination",
                        "startDate", "endDate"],
                    properties: {
                        shipName: {
                            bsonType: "string"
                        },
                        commander: {
                            bsonType: "string"
                        },
                        departure: {
                            bsonType: "object",
                            required: ["name"],
                            properties: {
                                name: {
                                    bsonType: "string"
                                },
                                lat: {
                                    bsonType: ["double", "int"]
                                },
                                lon: {
                                    bsonType: ["double", "int"]
                                }
                            }
                        },
                        destination: {
                            bsonType: "object",
                            required: ["name"],
                            properties: {
                                name: {
                                    bsonType: "string"
                                },
                                lat: {
                                    bsonType: ["double", "int"]
                                },
                                lon: {
                                    bsonType: ["double", "int"]
                                }
                            }
                        },
                        startDate: {
                            bsonType: "date"
                        },
                        endDate: {
                            bsonType: "date"
                        },
                        distance: {
                            bsonType: ["double", "int"]
                        }
                    }
                }
            }
        }).catch(() => {
            alreadyExists = true;
        });
        if (alreadyExists || process.argv.includes("--no-data-init")) {
            await client.close();
            return;
        }
        const recordsList = getMockedData(MOCK_FILE);
        await journal.insertMany(recordsList).catch(err => {
            console.log(err);
            throw new Error("Server Error!");
        });
        await client.close();
        return "Success";
    }

    setFilterAndSort(filterSortingObject) {
        prepareFilterObject(filterSortingObject.filter);
        prepareSortingObject(filterSortingObject.sorting);
        this.filter = filterSortingObject.filter;
        this.sorting = filterSortingObject.sorting;
    }

    async recordsCount() {
        let resultCount;
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        resultCount = await journal.find(this.filter).count().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return resultCount;
    }

    async getRecord(recordID) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        let record = await journal.findOne({"_id": new ObjectID(recordID)}).catch(err => {
            console.log(err);
            throw new Error("Server Error!");
        });
        await client.close();
        return record
    }

    async getRecords(offset, limit) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        let records = await journal.find(this.filter).sort(this.sorting).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records.slice(offset, offset + limit);
    }

    async getRecordsByDeparture(start, end, departureName) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const records = await journal.find({
            startDate: {$gte: start},
            endDate: {$lte: end},
            "departure.name": departureName
        }).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records;
    }

    async getRecordsByDestination(start, end, destinationName) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const records = await journal.find({
            startDate: {$gte: start},
            endDate: {$lte: end},
            "destination.name": destinationName
        }).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records;
    }

    async getRecordsByTrade(start, end, depName, destName) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const records = await journal.find({
            startDate: {$gte: start},
            endDate: {$lte: end},
            "departure.name": depName,
            "destination.name": destName
        }).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records;
    }

    async getRecordsByShip(start, end, shipName) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const records = await journal.find({
            endDate: {$lte: end, $gte: start},
            shipName: shipName
        }).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records;
    }

    async getRecordsByPeriodOfTime(start, end) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const records = await journal.find({
            endDate: {$lte: end, $gte: start},
        }).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records;
    }

    async addRecord(record) {
        let resultMessage = {};
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        await journal.insertOne({
            shipName: record.shipName,
            commander: record.commander,
            departure: {
                "name": record.departureName,
            },
            destination: {
                "name": record.destinationName,
            },
            startDate: new Date(record.startDate),
            endDate: new Date(record.endDate),
            distance: record.distance
        }).then(result => {
            resultMessage.message = "Success!";
            resultMessage.newID = result.insertedId;
        }).catch(() => {
            throw new Error("Insert Error!");
        });
        await client.close();
        return resultMessage;
    }

    async removeRecord(recordID) {
        let resultMessage = {};
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        await journal.deleteOne({"_id": new ObjectID(recordID)}).then(() => {
            resultMessage.message = "Success";
        }).catch(() => {
            throw new Error("Server Error!");
        })
        await client.close();
        return resultMessage;
    }

    async exportData(fileName) {
        const command = `mongoexport --host=\"${ADDRESS}:${PORT}\" ` +
            `--collection=${COLLECTION} --db=${DB} --out=back-ups/${fileName}`;
        return new Promise(resolve => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    throw new Error("Server Error!");
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                resolve("Success");
            });
        });
    }

    async importData(filePath) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        await journal.deleteMany({});
        const command = `mongoimport --host=\"${ADDRESS}:${PORT}\" ` +
            `--collection=${COLLECTION} --db=${DB} --file=${filePath}`;
        return new Promise(resolve => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    throw new Error("Server Error!");
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                resolve("Success");
            });
        });
    }

    async getPortsStatistics(start, end) {
        const portsStatisticsObject = {
            departures: [],
            destinations: [],
            trades: []
        };
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const departures = await journal.aggregate([
            {
                $match: {
                    $and: [{startDate: {$gte: start}}, {endDate: {$lte: end}},
                        {"departure.name": {$ne: ""}}]
                }
            },
            {
                $group: {
                    _id: "$departure.name",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            }
        ]).limit(10).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        const destinations = await journal.aggregate([
            {
                $match: {
                    $and: [{startDate: {$gte: start}}, {endDate: {$lte: end}},
                        {"destination.name": {$ne: ""}}]
                }
            },
            {
                $group: {
                    _id: "$destination.name",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            }
        ]).limit(10).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        const trades = await journal.aggregate([
            {
                $match: {
                    $and: [{startDate: {$gte: start}}, {endDate: {$lte: end}},
                        {"departure.name": {$ne: ""}}, {"destination.name": {$ne: ""}}]
                }
            },
            {
                $group: {
                    _id: {
                        from: "$departure.name",
                        to: "$destination.name"
                    },
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            }
        ]).limit(10).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        for (let elem of departures) {
            portsStatisticsObject.departures.push([elem._id, elem.count, elem.count.toString()]);
        }
        for (let elem of destinations) {
            portsStatisticsObject.destinations.push([elem._id, elem.count, elem.count.toString()]);
        }
        for (let elem of trades) {
            portsStatisticsObject.trades.push([`${elem._id.from} -> ${elem._id.to}`,
                elem.count, elem.count.toString()]);
        }
        return portsStatisticsObject;
    }

    async getTripsStatistics(start, end) {
        const tripsStatisticsObject = {
            averages: [],
            voyages: [],
            mileage: []
        };
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, {useUnifiedTopology: true});
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        const voyages = await journal.aggregate([
            {
                $match: {
                    $and: [{endDate: {$gte: start}}, {endDate: {$lte: end}},
                        {"shipName": {$ne: ""}}]
                }
            },
            {
                $group: {
                    _id: "$shipName",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            }
        ]).limit(10).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        const mileage = await journal.aggregate([
            {
                $match: {
                    $and: [{endDate: {$gte: start}}, {endDate: {$lte: end}},
                        {"shipName": {$ne: ""}}]
                }
            },
            {
                $group: {
                    _id: "$shipName",
                    mileage: {$sum: "$distance"}
                }
            },
            {
                $sort: {mileage: -1}
            }
        ]).limit(10).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        const averages = await journal.aggregate([
            {
                $match: {
                    $and: [{endDate: {$gte: start}}, {endDate: {$lte: end}}]
                }
            },
            {
                $group: {
                    _id: {$dateToString: {format: "%Y", date: "$endDate"}},
                    average: {$avg: "$distance"}
                }
            },
            {
                $sort: {_id: 1}
            }
        ]).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        for (let elem of voyages) {
            tripsStatisticsObject.voyages.push([elem._id, elem.count, elem.count.toString()]);
        }
        for (let elem of mileage) {
            tripsStatisticsObject.mileage.push([elem._id, Math.round(elem.mileage), Math.round(elem.mileage).toString()]);
        }
        for (let elem of averages) {
            tripsStatisticsObject.averages.push([elem._id, Math.round(elem.average), Math.round(elem.average).toString()]);
        }
        return tripsStatisticsObject;
    }
}

module.exports.Model = Model;
module.exports.ADDRESS = ADDRESS;
module.exports.PORT = PORT;
module.exports.DB = DB;
module.exports.COLLECTION = COLLECTION;