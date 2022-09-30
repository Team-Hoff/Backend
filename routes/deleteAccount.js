const express = require("express")
const router = express.Router();
const db = require("../models/database")

router.use( (request, response, next) =>{
    console.log({"DELETE ":request.sessionID});
    if(request.user) next()
    else {
        response.sendStatus(401).send({msg: "User is not Logged In"})
    }
})

router.delete('/', async(request, response) => {
    try{

        //Deletes account from database
        const {email, password } = request.user

        var sql = `DELETE FROM student WHERE email=? AND password=? `
    
        const result = await db.promise().query(sql, [email, password])   

        //logging out the user

        sql = `DELETE FROM student WHERE session_id=?`
        
        await db.promise().query(sql, [req?.sessionID], (error, result, field) =>{
            return console.log(error);
        })
        return res.sendStatus(200)


    }
    catch{
        console.log("Error")
    }

    
    
    


})


module.exports = router