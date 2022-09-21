const express = require("express")
const router = express.Router();
const db = require("../models/database")



router.get('/', async(request, response) => {

    try{
        const {value,original_email } = request.body

        sql = `UPDATE student SET ${value[0]} = ? WHERE email=? `
    
        db.query(sql, [value[1], original_email])
    
        response.sendStatus(200)
    
        const result = await db.promise().query(sql, [email])    
    }
    catch{
        console.log("Error")
    }

    
    
    


})


module.exports = router