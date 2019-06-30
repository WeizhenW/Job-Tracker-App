const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to get all status from db
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "status"`)
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get status', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;