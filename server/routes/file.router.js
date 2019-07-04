const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// let imagesUrlArray = [];
//route to post image
router.post('/', (req, res) => {
    // imagesUrlArray.push(req.body.url);
    pool.query(`INSERT INTO "aws_document" ("url", "file", "user_id", "job_id")
    VALUES ($1, $2, $3, $4);`, [req.body.url, req.body.fileName, req.user.id, req.body.job_id]).then(
        () => {
            res.sendStatus(200);
        }
    ).catch(error => console.log('error with post request', error));
})

//route to get all files
router.get('/:job_id', (req, res) => {
    pool.query(`SELECT * FROM "aws_document" WHERE "job_id" = $1 AND "user_id" = $2;`,
    [req.params.job_id, req.user.id]).then(
        result => {
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    ).catch(error => {
        console.log('error with get request', error);
    })
})



module.exports = router;