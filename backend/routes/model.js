const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

class Model {
    constructor() {}

    async init() {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        let alreadyExists = false;
        const journal = await journalDB.createCollection("journal", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [ "shipName", "commander", "departure", "destination",
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
                            required: [ "name" ],
                            properties: {
                                name: {
                                    bsonType: "string"
                                },
                                lat: {
                                    bsonType: [ "double" ]
                                },
                                lon: {
                                    bsonType: [ "double" ]
                                }
                            }
                        },
                        destination: {
                            bsonType: "object",
                            required: [ "name" ],
                            properties: {
                                name: {
                                    bsonType: "string"
                                },
                                lat: {
                                    bsonType: [ "double" ]
                                },
                                lon: {
                                    bsonType: [ "double" ]
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
                            bsonType: [ "double", "int" ]
                        }
                    }
                }
            }
        }).catch(() => {
            client.close();
            alreadyExists = true;
        });
        if (alreadyExists) {
            return;
        }
        await journal.insertOne({
            shipName: "St. Elena",
            commander: "David Porter Jr.",
            startDate: new Date(41242142),
            endDate: new Date(41242142),
            distance: 9356.54,
            departure: {
                "name": "New York",
                "lon": 95.313
            },
            destination: {
                "name": "Los Angeles",
                "lat": 184.2144,
            },
        });
        await client.close();
        return true;
    }

    async recordsCount() {
        let resultCount;
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        resultCount = await journal.find({}).count().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return resultCount;
    }

    async getRecord(recordID) {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        let record = await journal.findOne({"_id": new ObjectID(recordID)}).catch(err => {
            console.log(err);
            throw new Error("Server Error!");
        });
        await client.close();
        return record
    }

    async getRecords(offset, limit) {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        let records = await journal.find({}).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records.slice(offset, offset + limit);
    }

    async addRecord(record) {
        let resultMessage = {};
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
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
            throw new Error ("Insert Error!");
        });
        await client.close();
        return resultMessage;
    }

    async removeRecord(recordID) {
        let resultMessage = {};
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        await journal.deleteOne({"_id": new ObjectID(recordID)}).then(() => {
            resultMessage.message = "Success";
        }).catch(() => {
            throw new Error("Server Error!");
        })
        await client.close();
        return resultMessage;
    }
}

module.exports = Model;