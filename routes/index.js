const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const insertDocuments = function (db, callback) {
  const collection = db.collection('projectData');
  collection.insertMany([
    {title: "Sea Trips"}, {reportsCount: 1000}, {lastUpdate: "12/05/2019 13:54:00"}
  ], function (err, result) {
    if (err != null) {
      throw err;
    }
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  const collection = db.collection('projectData');
  collection.find({title: { $exists: true}}).toArray(function(err, docs) {
    console.log("Found the following records:");
    console.log(docs);
    callback(docs);
  });
};

const removeAllDocuments = function (db, callback) {
  const collection = db.collection('projectData');
  collection.deleteMany({}, function (err, result) {
    if (err != null) {
      throw err;
    }
    console.log("Removed all documents from the collection.");
    callback(result);
  });
};

/* GET home page. */
router.get('/', function(req, res) {
  MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
    if (err != null) {
      throw err;
    }
    console.log("Connected successfully to MongoDB server");

    const db = client.db("project");
    insertDocuments(db, function() {
      findDocuments(db, function(result) {
        res.render('index', { title: result[0].title });
        removeAllDocuments(db, function () {
          client.close();
        });
      });
    });
  });
});

module.exports = router;
