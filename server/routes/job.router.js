const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//route to get all jobs
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "status_id", "status"."status_name", COUNT(*) FROM "job" 
    JOIN "status" ON "status"."id"="job"."status_id"
    WHERE "user_id" = $1
    GROUP BY "status_id", "status_name"
    ORDER BY "status_id";`, [req.user.id])
        .then((result) => res.send(result.rows))
        .catch(error => {
            console.log('error with get all jobs list', error);
            res.sendStatus(500);
        })
})

// route to post a new job to db
router.post('/new', rejectUnauthenticated, (req, res) => {
    // console.log(req.body);
    const newJob = req.body;
    pool.query(`INSERT INTO "job" ("title", "post_url", "company", "status_id", "user_id")
    VALUES($1, $2, $3, $4, $5) returning "id";`, [newJob.jobTitle, newJob.postUrl, newJob.companyName, newJob.status_id, req.user.id])
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error with post new job', error);
            res.sendStatus(500);
        })
});

//route to get all jobs to apply
router.get('/toapply', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "job" WHERE "status_id" = 1 AND "user_id" = $1 ORDER BY "status_date" DESC;`, [req.user.id])
        .then((result) => res.send(result.rows))
        .catch(error => {
            console.log('error with get new jobs list', error);
            res.sendStatus(500);
        })
})

//route to get all applied jobs
router.get('/applied', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "job" WHERE "status_id" <> 1 AND "user_id" = $1 ORDER BY "status_date" DESC;`, [req.user.id])
        .then((result) => res.send(result.rows))
        .catch(error => {
            console.log('error with get applied jobs list', error);
            res.sendStatus(500);
        })
})

//route to delete one job
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "job" WHERE "id" = $1 AND "user_id" = $2;`,
        [req.params.id, req.user.id]).then(
            result => {
                if (result) {
                    pool.query(`DELETE FROM "job_skill" WHERE "job_id" = $1;`, [req.params.id]);
                    pool.query(`DELETE FROM "aws_document" WHERE "job_id" = $1;`, [req.params.id])
                    .then(
                        () => {
                            pool.query(`DELETE FROM "job" WHERE "id" = $1;`, [req.params.id])
                            .then(() => res.sendStatus(200))
                            .catch(error => {
                                console.log('error with delete from job', error);
                                res.sendStatus(500);
                            })
                        }
                    )
                    .catch(error => {
                        console.log('error with delete from job_skill', error);
                        res.sendStatus(500)
                    })
                    
                } else { res.sendStatus(403); }
            })
        .catch(error => {
            console.log('error with delete one job', error);
            res.sendStatus(500);
        })
})

//route to get one job details (except for job skills)
router.get('/:jobid', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "job"
        LEFT JOIN "status" ON "job"."status_id" = "status"."id"
        WHERE "job"."id" = $1 AND "job"."user_id"=$2;`,
        [req.params.jobid, req.user.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error with get job detail', error);
            res.sendStatus(500);
        })
})

//route to update one job details    
router.put('/edit', rejectUnauthenticated, (req, res) => {
    const job = req.body;
    pool.query(`UPDATE "job" SET "title" = $1, "company" = $2, "address" = $3, "post_url" = $4, "email" = $5,
        "phone" = $6, "website" = $7, "note" = $8, "status_id" = $9, "follow_up"= $10 WHERE "id" = $11 AND "user_id" = $12`,
        [job.title, job.company, job.address, job.post_url, job.email, job.phone, job.website, job.note, job.status_id, job.follow_up, job.job_id, req.user.id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error with update job detail', error);
            res.sendStatus(500);
        })
})



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;