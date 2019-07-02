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
    pool.query(`SELECT * FROM "job_skill"
        JOIN "skill" ON "job_skill"."skill_id" = "skill"."id"
        JOIN "job" ON "job"."id" = "job_skill"."job_id" 
        WHERE "job_skill"."job_id" = $1 AND "job"."user_id" = $2;`,
        [req.params.jobid, req.user.id])
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error with get skills for one job', error);
            res.sendStatus(500);
        })
});

// post route to add one skill into one job into db
router.post('/add', rejectUnauthenticated, (req, res) => {
    console.log("hit route add skill", req.body);
    pool.query(`SELECT * FROM "job" WHERE "id" = $1 AND "user_id" = $2;`,
        [req.body.job_id, req.user.id]).then(
            result => {
                if (result) {
                    pool.query(`INSERT INTO "job_skill" ("job_id", "skill_id")
                    VALUES ($1, $2);`, [req.body.job_id, req.body.skill_id])
                        .then(() => {
                            res.sendStatus(200);
                        })
                } else {
                    res.sendStatus(403);
                }
            }
        )
        .catch(error => {
            console.log('error with post one skill for one job', error);
            res.sendStatus(500);
        })
});

// delete route to add one skill into one job into db
router.post('/delete', rejectUnauthenticated, (req, res) => {
    console.log("hit route add skill", req.body);
    pool.query(`DELETE INTO "job_skill" ("job_id", "skill_id")
        VALUES ($1, $2);`, [req.body.job_id, req.body.skill_id])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error with post one skill for one job', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;