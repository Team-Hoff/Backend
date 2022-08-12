const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const db = require('../models/database')
const {hashpassword} = require("../utils/helper")



router.get('/' ,(req, res) => {
    res.send("This is the signup page");
}).post('/',
[ check('username')
.notEmpty(),
check('password')
.notEmpty(),
check('email')
.isEmail().notEmpty(),
check('fullname')
.notEmpty(),
check('programme')
.notEmpty() 
],async(req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return(res.status(201).send("ERROR!"))
    }

    const {username, email, fullname, programme, year} = req.body;
    let sql = 'SELECT * FROM student WHERE username = ? OR email = ?';
    const result = await db.promise().query(sql, [username, email])
    if(result[0].length == 0){
        const password = hashpassword(req.body.password);
        try{
        sql =  `INSERT INTO student (username, password, email, fullname, programme, year) VALUES ('${username}','${password}','${email}','${fullname}','${programme}','${year}')`
        db.promise().query(sql)
        res.status(201).send("User created")
        }
        catch (err){
            console.log(err)
        }
    } else {
        res.status(409).send("User already exists")
    }


    
})

module.exports = router;