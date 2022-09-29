const express = require('express');
const router = express.Router();

const db = require('../models/database')

router.use( (request, response, next) =>{
    if(request.user) next()
    else {
        response.status(401).send({msg: "User is not Logged In"})
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