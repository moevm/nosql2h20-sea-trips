const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { exec } = require('child_process');
const getMockedData = require('./parser/parser');

const ADDRESS = "127.0.0.1";
const PORT = "27017";
const DB = "journalDB";
const COLLECTION = "journal";
const MOCK_FILE = `${__dirname}/parser/mock_data.txt`;

class Model {
    constructor() {}

    async init() {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
        const journalDB = client.db(DB);
        let alreadyExists = false;
        const journal = await journalDB.createCollection(COLLECTION, {
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
                                    bsonType: [ "double", "int" ]
                                },
                                lon: {
                                    bsonType: [ "double", "int" ]
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
                                    bsonType: [ "double", "int" ]
                                },
                                lon: {
                                    bsonType: [ "double", "int" ]
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
        const recordsList = getMockedData(MOCK_FILE);
        await journal.insertMany(recordsList).catch(err => {
            console.log(err);
            throw new Error("Server Error!");
        });
        await client.close();
        return "Success";
    }

    async recordsCount() {
        let resultCount;
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        resultCount = await journal.find({}).count().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return resultCount;
    }

    async getRecord(recordID) {
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
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
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        let records = await journal.find({}).toArray().catch(() => {
            throw new Error("Server Error!");
        });
        await client.close();
        return records.slice(offset, offset + limit);
    }

    async addRecord(record) {
        let resultMessage = {};
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
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
            throw new Error ("Insert Error!");
        });
        await client.close();
        return resultMessage;
    }

    async removeRecord(recordID) {
        let resultMessage = {};
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
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
        return new Promise (resolve => {
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
        const client = await MongoClient.connect(`mongodb://${ADDRESS}:${PORT}`, { useUnifiedTopology: true });
        const journalDB = client.db(DB);
        const journal = await journalDB.collection(COLLECTION);
        await journal.deleteMany({});
        const command = `mongoimport --host=\"${ADDRESS}:${PORT}\" ` +
            `--collection=${COLLECTION} --db=${DB} --file=${filePath}`;
        return new Promise (resolve => {
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
}

module.exports.Model = Model;
module.exports.ADDRESS = ADDRESS;
module.exports.PORT = PORT;
module.exports.DB = DB;
module.exports.COLLECTION = COLLECTION;