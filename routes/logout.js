const express = require('express');
const router = express.Router();

const db = require('../models/database')



router.get("/", async (req, res) => {
    const sql="DELETE FROM sessions WHERE session_id = ?"
    await db.promise().query(sql, [req?.sessionID], (error, result, field) =>{
        console.log(error);
    })
    res.send(200)
    
})

module.exports = router;