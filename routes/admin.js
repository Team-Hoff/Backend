const express = require("express")
const router = express.Router();
const db = require("../models/database")

router.get('/update', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `UPDATE CourseInfo SET img = "https://th.bing.com/th/id/R.d03c6da728d2d9db994ced40346e68d5?rik=cMUcZXiBNEIdAg&pid=ImgRaw&r=0" WHERE IDM = "biomedical" AND name="Algebra" `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Update Successful`);
     
});

router.get('/delete', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `DELETE FROM CourseInfo WHERE IDM = "mechanical" AND name = "Mechanical Engineering Lab II" `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Deletion Successful`);
     
});

router.get('/insert', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `INSERT INTO Courses (IDM,id,name,code,year,semester,img)  VALUES ('telecom','telecomskills','Telecom Skills','TE 309', 2, 1, 'https://th.bing.com/th/id/OIP.7b2iWGFGqXMr6VyJuLsPTwHaE8?w=280&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7') `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Insertion Successful`);
     
});

// router.get('/list', async(request,response,) =>{
//     //const {course} = request.params;
//     let sql = `SELECT * FROM CourseInfo WHERE IDM = "computer" AND year = "1" `;
//     const result = await db.promise().query(sql);
//     //console.log(result);
//     response.send(`Insertion Successful `);
     
// });

module.exports = router;

