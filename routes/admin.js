const express = require("express")
const router = express.Router();
const db = require("../models/database")

router.get('/update', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `UPDATE CourseInfo SET name = "Calculus with Several Variables II" WHERE IDM = "civil" AND name = "Environmental Quality Engineering" AND year = 2 `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Update Successful`);
     
});

router.get('/delete', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `DELETE FROM CourseInfo WHERE IDM = "metallurgical" AND name = "Numerical Methods for Engineers" `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Deletion Successful`);
     
});

router.get('/insert', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `INSERT INTO CourseInfo (IDM,id,name,code,year,semester,img)  VALUES ('metallurgical','numericalmethodsforengineers','Numerical Methods for Engineers','MSE 358', 3 , 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNe9syWcg9Y5J5hiNXq82NNAy8dmtP-auX_Q&usqp=CAU') `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Insertion Successful`);
     
});

module.exports = router;