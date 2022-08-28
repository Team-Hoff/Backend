const express = require('express');
const router = express.Router();


router.use( (request, response, next) =>{
    console.log(request.sessionID);
    if(request.user) next()
    else {
        console.log("here");
        response.sendStatus(401)
    }
})

router.get('/', (request, response) => {
    console.log(request.user);
    response.send(request.user)
})
module.exports = router