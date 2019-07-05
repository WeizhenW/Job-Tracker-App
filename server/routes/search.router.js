const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get route search jobs by company
router.get('/company', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "job"."id" AS "job_id", * FROM "job" 
        JOIN "status" ON "job"."status_id" = "status"."id"
        WHERE "company" iLIKE $1 AND "user_id"=$2;`, [`%${req.query.company}%`, req.user.id])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with searching by company', error);
        res.sendStatus(500);
    })
})

//get route search jobs by status
router.get('/status', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "job"."id" AS "job_id", * FROM "job" 
        JOIN "status" ON "job"."status_id" = "status"."id"
        WHERE "status_id"=$1 AND "user_id"=$2;`, [req.query.status_id, req.user.id])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with searching by status', error);
        res.sendStatus(500);
    })
})


module.exports = router;