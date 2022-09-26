const express = require("express")
const router = express.Router();
const db = require("../models/database")

router.use( (request, response, next) =>{
    if(request.user) next()
    else {
        console.log("Program ");
        response.sendStatus(401)
    }
})

router.post('/', async(request, response) => {

    // try{
        const {email} = request.user
        const {field, new_value} = request.body
        console.log(field);
        switch (field) {
            case 'username':
                console.log("here");
                const result = await db.promise()
                .query('SELECT * FROM student WHERE username = ?', [new_value])
                console.log(result);
                break;
        
            default:
                break;
        }

        
        sql = `UPDATE student SET ${field} = ? WHERE email=? `
        // db.query(sql, [new_value, email])
        response.send(request.body)
        // const result = await db.promise().query(sql, [email])    
    // }
    // catch{
    //     console.log("Error")
    // }

    
    
    


})


module.exports = router