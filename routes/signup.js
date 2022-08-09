const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');

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
check('program')
.notEmpty() 
],(req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return(res.status(201).send("ERROR!"))
    }

    const {username, password, email, fullname, program} = req.body;

    res.send(req.body);
})



module.exports = router;