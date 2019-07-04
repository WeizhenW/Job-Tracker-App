const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "job" 
        WHERE (("status_date" < CURRENT_DATE - 10 AND "status_id" = 1) 
        OR ("status_date" < CURRENT_DATE - 5 AND ("status_id" = 2 OR "status_id" = 3 OR "status_id" = 4)))
        AND "user_id" = $1;`, [req.user.id]
    ).then(
        result => res.send(result.rows)
    ).catch(error => {
        console.log('error with get follow up jobs', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;