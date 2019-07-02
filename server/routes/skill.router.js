const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get route to retrieve all skills from db
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "skill"`)
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get all skills', error);
        res.sendStatus(500);
    })
});

// get route to retrieve skills for one job from db
router.get('/:jobid', rejectUnauthenticated, (req, res) => {
    console.log('req.params.jobid', req.params.jobid);
    pool.query(`SELECT * FROM "job_skill"
        JOIN "skill" ON "job_skill"."skill_id" = "skill"."id"
        JOIN "job" ON "job"."id" = "job_skill"."job_id" 
        WHERE "job_skill"."job_id" = $1 AND "job"."user_id" = $2;`,
        [req.params.jobid, req.user.id])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get skills for one job', error);
        res.sendStatus(500);
    })
});


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;