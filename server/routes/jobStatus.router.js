const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get route to retrieve all status from db
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "status"`)
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get status', error);
        res.sendStatus(500);
    })
});

//put route to update the status of one job
router.put('/:job_id', rejectUnauthenticated, (req, res) => {
    pool.query(`UPDATE "job" SET "status_id" = $1, "status_date"= CURRENT_DATE WHERE "id" = $2 AND "user_id" = $3;`,
    [req.body.status_id, req.params.job_id, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
        console.log('error with update job status', error);
        res.sendStatus(500);
    })
})
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;