const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to get all status from db
router.post('/new', (req, res) => {
    // console.log(req.body);
    const newJob = req.body;
    pool.query(`INSERT INTO "job" ("title", "post_url", "company", "status_id")
    VALUES($1, $2, $3, $4);`, [newJob.jobTitle, newJob.postUrl, newJob.companyName, newJob.status_id])
    .then(() => res.sendStatus(200))
    .catch(error => {
        console.log('error with post new job', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;