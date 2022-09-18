const { localsName } = require('ejs');
const {Router} = require('express');
const router = Router();

const db = require('../models/database')

router.get('/:programme', async(request,response,) =>{
    const {programme} = request.params;
    let sql = `SELECT name,IDM,id,year,semester FROM  CourseInfo WHERE IDM = ${programme}`;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(result[0]);
     
});
module.exports=router;