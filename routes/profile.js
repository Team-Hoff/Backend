const express = require('express')
const router = express.Router()



router.use( (request, response, next) =>{
    if(request.user) next()
    else {
        console.log("here");
        response.sendStatus(401)
    }
})


person = {
    fullname:"Lorenzo Sarkodie", 
    level: 100, 
    programme:"Computer Engineering",
    email:"dslark13@gmail.com"
};

router.get("/", (request, response) => {
    response.send(person)
})


module.exports = router