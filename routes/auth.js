const express = require('express');
const router = express.Router();
const passport=require('passport');
const db = require('../models/database')


router.use( (request, response, next) =>{
    console.log({"authentication": request.sessionID});
    if(request.user) next()
    else {
        response.sendStatus(401).send({msg: "User is not Logged In"})
    }
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
        res.send(200);
    });




router.get('/', async(request, response) => {
    const {email} = request.user
    const sql = 'SELECT * FROM student WHERE email = ?'
    const user_details = await db.promise().query(sql, [email])
    let user = user_details[0][0]
    console.log(user);
    response.send(user)
})
module.exports = router