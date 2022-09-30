const express = require('express');
const router = express.Router();
const passport=require('passport');
const db = require('../models/database')


router.use( (request, response, next) =>{
    console.log({"google authentication": request.sessionID});
    next()
    // if(request.user) next()
    // else {
    //     response.sendStatus(401).send({msg: "User is not Logged In"})
    // }
})


// creating the routes for the end point

router.get ('/google',
passport.authenticate( 'google',{
  scope:['profile', 'email']})
);

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'http://www.thvirtuallibrary.com:3000/auth',
        failureRedirect:'http://www.thvirtuallibrary.com:3000?authfailed'
    }),(req,res)=>{
       return res.send(200);
    });

module.exports = router