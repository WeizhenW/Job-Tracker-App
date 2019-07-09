const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get route to get contact persons
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "contact" WHERE "user_id" = $1;`, [req.user.id])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error with get contacts', error);
        res.sendStatus(500);
    })
})

//post route to post new contact
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post route');
    const contact = req.body;
    pool.query(`INSERT INTO "contact" ("first_name", "last_name", "company", "job_title", "phone", "email", "note", "role", "user_id") 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "id";`, 
    [contact.firstName, contact.lastName, contact.company, contact.title, contact.phone, contact.email, contact.note, contact.role, req.user.id])
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows[0])
    })
    .catch(error => {
        console.log('error with post contact', error);
        res.sendStatus(500);
    })
})

//post route to add a contact to a job
router.post('/:job_id', rejectUnauthenticated, (req, res) => {
    pool.query(`UPDATE "job" SET "contact_id" = $1 WHERE "id" = $2 AND "user_id" = $3;`, 
    [req.body.contact_id, req.params.job_id, req.user.id])
    .then( () => res.sendStatus(200))
    .catch(error => {
        console.log('error with post contact', error);
        res.sendStatus(500);
    })
})


module.exports = router;