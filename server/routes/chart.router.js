const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get route to get most demanding job skills
router.get('/skills', (req, res) => {
    pool.query(`SELECT "skill", COUNT("job_id") FROM "job_skill"
        JOIN "skill" ON "skill"."id"="job_skill"."skill_id"
        JOIN "job" ON "job"."id" = "job_skill"."job_id"
        WHERE "user_id" = $1
        GROUP BY "skill"
        ORDER BY COUNT DESC;`, [req.user.id])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get most demanding skills', error);
        res.sendStatus(500);
    })
})


module.exports = router;