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
    console.log(request.params);
    const slides_books = [];
    let sql = `SELECT * FROM  CourseInfo WHERE IDM = ? AND id=?`;
    const slides = await db.promise().query(sql, [programme,course]);
    slides_books[0] = slides[0];
    sql = `SELECT * FROM CourseBooks WHERE courseName = ?`
    const books = await db.promise().query(sql, [slides[0][0].name]);
    slides_books[1] = books[0];
    
    response.send(slides_books);
})
module.exports=router;