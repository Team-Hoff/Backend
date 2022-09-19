const {Router} = require('express');
const router = Router();

const db = require('../models/database')

// router.get('/:course', async(request,response,) =>{
//     const {course} = request.params;
//     let sql = `SELECT name,IDM,id FROM  CourseInfo WHERE name = ?`;
//     const result = await db.promise().query(sql, [course]);
//     //console.log(result);
//     response.send(result[0]);
     
// });

// router.get('/', async(request,response,) =>{
//     const {course} = request.params;
//     let sql = `SELECT name,IDM,id FROM  CourseInfo `;
//     const result = await db.promise().query(sql, [course]);
//     //console.log(result);
//     response.send(result[0]);
     
// });

router.get('/:course', async(request,response,) =>{
    const {course} = request.params;
    let sql = `SELECT name,IDM,id FROM  CourseInfo WHERE name LIKE '${course}%'`;
    const result = await db.promise().query(sql, [course]);
    //console.log(result);
    response.send(result[0]);
     
});





module.exports=router;