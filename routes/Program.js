const express = require('express');
const router = express.Router();


const computerRouter = require("./Programs/computer")


router.use( (request, response, next) =>{
    console.log(request.sessionID);
    if(request.user) next()
    else {
        console.log("here");
        response.sendStatus(401)
    }
})


router.use("/computer", computerRouter)


module.exports = router;