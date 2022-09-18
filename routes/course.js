const { localsName } = require('ejs');
const {Router} = require('express');
const router = Router();

const db = require('../models/database')

router.get('/computerCourse', async(request,response,) =>{
    let sql = 'SELECT year,semester FROM  CourseInfo WHERE name = "Numerical Analysis" AND IDM = "computer"';
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(result[0]);
     
});
module.exports=router;