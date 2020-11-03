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

    async entriesCount() {
        let resultCount;
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        resultCount = await journal.find({}).count();
        await client.close();
        return resultCount;
    }

    async getEntries(offset, limit) {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        let entries = await journal.find({}).toArray();
        await client.close();
        return entries.slice(offset, offset + limit);
    }

    async addEntity(entity) {
        let resultMessage = {};
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        await journal.insertOne({
            shipName: entity.shipName,
            commander: entity.commander,
            departure: {
                "name": entity.departureName,
            },
            destination: {
                "name": entity.destinationName,
            },
            startDate: new Date(entity.startDate),
            endDate: new Date(entity.endDate),
            distance: entity.distance
        }).then(result => {
            resultMessage.message = "Success!";
            resultMessage.newID = result.insertedId;
        }).catch(error => {
            console.log(error);
            resultMessage.message = "Fail";
        });
        await client.close();
        return resultMessage;
    }

    async removeEntity(entityID) {
        let resultMessage = {};
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const journalDB = client.db('journalDB');
        const journal = await journalDB.collection("journal");
        await journal.deleteOne({"_id": new ObjectID(entityID)}).then(() => {
            resultMessage.message = "Success";
        }).catch(() => {
            resultMessage.message = "Fail";
        })
        await client.close();
        return resultMessage;
    }
}

module.exports = Model;