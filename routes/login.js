const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const db = require('../models/database')
const {hashpassword, comparepassword} = require("../utils/helper")

router.get('/', (req, res)=>{
    res.send("logging in? ")
});

router.post('/', async(req, res)=>{
    const {username, password} = req.body;
    let sql = "SELECT * FROM student WHERE username =?";
    const result = await db.promise().query(sql, [username]);
    const user = result[0][0];

    if(result[0].length < 1) return res.sendStatus(401);
    
    isvalid = comparepassword(password, user.password);
    if(isvalid){
        console.log(req.session);
        res.send("Logged in");
    }
    else{
        res.send("Wrong password/username")
    }
})

module.exports = router;