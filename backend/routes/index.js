const express = require('express');
const router = express.Router();
const {Model} = require('./model');

const ACCEPTED_KEYS = ["shipName", "commander", "departureName", "destinationName",
    "startDate", "endDate", "distance"];

const checkKeys = function (keysObject) {
    const keys = Object.keys(keysObject);
    for (let key of keys) {
        if (!ACCEPTED_KEYS.includes(key)) {
            throw new Error("Key error!");
        }
    }
};
const checkSortingValues = function (sortingObject) {
    const sortValues = Object.values(sortingObject);
    for (let value of sortValues) {
        if (value !== 1 && value !== -1) {
            throw new Error("Sorting value error!");
        }
    }
};

const model = new Model();
model.init().catch(err => {
    console.log(err);
});

/* SET filter and sort function for DB*/
router.post('/set-filter-and-sorting', function (req, res) {
    console.log(model.filter);
    console.log(model.sorting);
    try {
        checkKeys(req.body.filter);
        checkKeys(req.body.sorting);
        checkSortingValues(req.body.sorting);
    } catch {
        res.status(400);
        res.send({message: "Incorrect filter / sorting objects."});
        return;
    }
    model.setFilterAndSort(req.body);
    console.log(model.filter);
    console.log(model.sorting);
    res.send({message: "Success"});
});

/* GET count of records in the journal */
router.get('/trips-count', function(req, res) {
    model.recordsCount().then(result => {
        res.send({tripsCount: result});
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
});

/* GET the record by its ID*/
router.get('/trip/:id', function(req, res) {
    let ID = req.params.id;
    model.getRecord(ID).then(record => {
        if (record === null) {
            res.status(404);
        }
        res.send(record);
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
});

/*
   GET journal records.
   offset - index of the first entry to get
   limit - max number of entries to get
*/
router.get('/trips', function(req, res) {
    let offset = parseInt(req.query.offset, 10) || 0;
    if (offset < 0) {
        offset = 0;
    }
    let limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit < 0) {
        limit = 10;
    }
    model.getRecords(offset, limit).then(records => {
        res.send(records);
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
});

/* ADD new record into the journal */
router.post('/add-trip', function(req, res) {
    req.body.distance = parseFloat(req.body.distance) || 0.0;
    model.addRecord(req.body).then(resultMessage => {
        res.send(resultMessage);
    }).catch(() => {
        res.status(400);
        res.send({message: "Incorrect entity parameters in body"});
    });
});

/* DELETE the record from the journal by its ID */
router.delete('/trip', function(req, res) {
    const entityID = req.query.ID;
    model.removeRecord(entityID).then(result => {
        res.send(result);
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
});

/* EXPORT Data From DB into the file with the name "filename" */
router.get('/export-data', function (req, res) {
    const fileName = "sea-trips-backup.json";
    model.exportData(fileName).then(() => {
        const file = `./back-ups/${fileName}`;
        res.download(file, fileName);
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
})

/* IMPORT Data from income file into the DB */
router.post('/import-data', function (req, res) {
    const filePath = req.files.file.path;
    if (!filePath.endsWith(".json")) {
        res.status(400);
        res.send({message: "Importing data from JSON files is only available."});
    }
    model.importData(filePath).then(() => {
        res.send({message: "Success"});
    }).catch(() => {
        res.status(500);
        res.send({message: "Internal Server Error"});
    });
});

module.exports = router;
