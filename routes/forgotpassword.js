const express = require("express");
const router = express.Router();
const db =  require("../models/database");



router.get('/', async function(request, response){
    const {email} = request.body;
    
    const result = await db.promise().query('SELECT * FROM student WHERE email = "kampadu42@gmail.com"')
    

    if(result[0].length == 0){
        throw error;
    }

    response.send("User exists")



})

module.exports = router