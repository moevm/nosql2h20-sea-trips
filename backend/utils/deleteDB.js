const MongoClient = require('mongodb').MongoClient;
const { DB, COLLECTION, ADDRESS, PORT } = require('../routes/model');

async function deleteDB(address, port, db, collection) {
    const client = await MongoClient.connect(`mongodb://${address}:${port}`, { useUnifiedTopology: true });
    const journalDB = client.db(db);
    await journalDB.dropCollection(collection);
}

deleteDB(ADDRESS, PORT, DB, COLLECTION).then(() => {
    console.log("DB deletion is complete.");
    process.exit(0);
}).catch(err => {
    console.log(`Deletion error: ${err}`);
    process.exit(0);
});