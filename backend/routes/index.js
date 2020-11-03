const express = require('express');
const router = express.Router();
const Model = require('./model');

const model = new Model();
model.init().then(() => {});

/* GET count of entries in journal */
router.get('/trips-count', function(req, res) {
    model.entriesCount().then(result => {
        res.send({tripsCount: result});
    });
});

/* GET journal entries, offset - index of first entry to get, limit - max number of entries to get  */
router.get('/trips', function(req, res) {
    let offset = parseInt(req.query.offset, 10) || 0;
    if (offset < 0) {
        offset = 0;
    }
    let limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit < 0) {
        limit = 10;
    }
    model.getEntries(offset, limit).then(result => {
        res.send(result);
    });
});

/* ADD new entry into the journal */
router.post('/add-trip', function(req, res) {
    req.body.distance = parseFloat(req.body.distance) || 0.0;
    model.addEntity(req.body).then(resultMessage => {
        res.send(resultMessage);
    });
});

/* DELETE the entry from the journal by its id */
router.delete('/trip', function(req, res) {
    let entityID = req.query.ID;
    model.removeEntity(entityID).then(result => {
        res.send(result);
    });
});

module.exports = router;
