const express = require('express');
const router = express.Router();

const db = require('../models/database')

router.use( (request, response, next) =>{
    if(request.user) next()
    else {
        console.log("here");
        response.sendStatus(401)
    }
})

router.get("/", async (req, res) => {
    const sql="DELETE FROM sessions WHERE session_id = ?"
    await db.promise().query(sql, [req?.sessionID], (error, result, field) =>{
        console.log(error);
    })
    res.sendStatus(200)
    
})

module.exports = router;