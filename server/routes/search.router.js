const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get route to get most demanding job skills
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('query', req.query);
    pool.query(`SELECT * FROM "job" 
        JOIN "status" ON "job"."status_id" = "status"."id"
        WHERE "company" iLIKE $1 AND "user_id"=$2;`, [`%${req.query.company}%`, req.user.id])
    .then(result => 
        {console.log(result.rows);
            res.send(result.rows)
        })
    .catch(error => {
        console.log('error with searching by company', error);
        res.sendStatus(500);
    })
})


module.exports = router;