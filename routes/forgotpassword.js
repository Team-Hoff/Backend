const express = require("express");
const router = express.Router();
const db =  require("../models/database");
const nodemailer = require('nodemailer')
const encrypt = require('crypto')

function generate_token() {
  
}

router.get('/', async function(request, response){
    const {email} = request.body;

    const result = await db.promise().query(`SELECT * FROM student WHERE email = '${email}'`)
    if(result[0].length == 0){
        return response.Status(400).send("User does not exist")
    }

   
    const sql = `INSERT INTO password_token (email, token) VALUES (?,?)` 
    const link = []
      encrypt.randomBytes(48,async function(err, buffer) {
      const token = buffer.toString('hex');
      await db.promise().query(sql, [email, token])
       link.push(`http://ec2-3-89-226-48.compute-1.amazonaws.com:3000/resetpassword?${token}`)
      
       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
          user:'dlsark13@gmail.com',
          pass:'zusaywgcxaenvbqj'
        },
        tls: {
            rejectUnauthorized: false
          }
      });
      
      var mailOptions = {
        from: 'dlsark13@gmail.com',
        to: `${email}`,
        subject: 'Team Hoff Virtual Library',
        text: `Click on the link below to reset your password /n ${link[0]}`
      };
      
      transporter.sendMail(mailOptions, function(err, info){
        if (err) console.log(err);
        else console.log("email sent " + info.res);
      });
      response.send(link[0])
    });

    

      
    
})

module.exports = router