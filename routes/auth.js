const express = require('express');
const router = express.Router();
const passport=require('passport');


// router.use( (request, response, next) =>{
//     console.log(request.sessionID);
//     if(request.user) next()
//     else {
//         console.log("auth");
//         // console.log(request);
//         response.sendStatus(401)
//     }
// })


// creating the routes for the end point

router.get ('/google',
passport.authenticate( 'google',{
  scope:['profile', 'email']})
);

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'http://localhost:3000/auth',
        failureRedirect:'http://localhost:3000/'
    }),(req,res)=>{
        res.send(200);
    });




router.get('/', (request, response) => {
    response.send(request.user)
})
module.exports = router