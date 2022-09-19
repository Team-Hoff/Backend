const { localsName } = require('ejs');
const {Router} = require('express');
const router = Router();

const db = require('../models/database')

router.get('/:programme', async(request,response,) =>{
    const {programme} = request.params;
    let sql = `SELECT name,IDM,id,year,semester FROM  CourseInfo WHERE IDM = ?`;
    const result = await db.promise().query(sql, [programme]);
    //console.log(result);
    response.send(result[0]);
     
});

router.get('/:programme/:course', async(request, response) => {
    const {programme, course} = request.params;
    let sql = `SELECT * FROM  CourseInfo WHERE IDM = ? AND id=?`;
    const result = await db.promise().query(sql, [programme,course]);
    console.log(request.params);
    response.send(result[0]);
    


})
module.exports=router;