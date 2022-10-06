const express = require("express");
const router = express.Router();
const db = require("../../models/database");

const courseRouter =  require('./courses');
router.use("/course",courseRouter);
const {Deta} =require('deta');
const upload = require('express-fileupload');
const fs = require('fs')
require('dotenv').config();


router.use("/course",courseRouter);
router.use(upload());
const deta = Deta(projectKey=process.env.DETA_KEY);
const courseBooks = deta.Drive(driveName=process.env.DETA_DRIVENAME);

//Creates a form to allow user upload a book

router.get('/', (req, res) => {
    res.send(`
    <form action="admin/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="filetoUpload" required accept="application/pdf, .txt, .docx , .doc, .pptx"> 
      <input type="submit" value="Upload">
    </form>`);
    //accept attribute restricts the upload form to only specified file types
    console.log('Starting file upload');
});

//this request handles the upload of the specified book to the Deta drive
router.post("/upload", async (request, response,next) => {
    // const program = `Dummy Engineering`
    // const Coursename = `Dummy Course`
    
    const {programme,level,semester,courseName} = request.body;
    const directory = `${programme}/${level}/${semester}/${courseName}/Slides/`
    const name = `${directory}/${request.files.filetoUpload.name}`;
    const contents = request.files.filetoUpload.data;
    const storeBook = await courseBooks.put(name, {data: contents});
    response.send(storeBook);
    // let sql = `INSERT INTO Courses (IDM,id,name,code,year,semester,img)  VALUES ('DumDumT','DumCourseT','Dummy CourseT','DU T07', 5, 1, 'https://th.bing.com/th/id/OIP.7b2iWGFGqXMr6VyJuLsPTwHaE8?w=280&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7') `;
    // db.query(sql);
    
    console.log('Successful file upload');
});

router.post('/DeleteFile', async(request,response,) =>{
    const {lecture,courseName,programme,semester,level} = request.body;   //'Dummy 1.pdf'
    console.log('Starting File Deletion');
    const filepath = ` ${programme}/${level}/${semester}/${courseName}/Slides/${lecture} `;
    console.log(filepath);
    // const filepath = `Dummy Engineering/Year 5/Semester 1/Dummy Course/Slides/${lecture}`;
    //const {course} = request.params;
    let sql = `DELETE FROM CourseInfo WHERE IDM = "mechanical" AND name = "Mechanical Engineering Lab II" `;
    const result = await db.promise().query(sql);
    response.send(`Deletion Successful`);
     
});

router.get('/insert', async(request,response,) =>{
    //const {course} = request.params;
    let sql = `INSERT INTO Courses (IDM,id,name,code,year,semester,img)  VALUES ('dummies','dummiescourse','Dummies Course','DU 009', , 1, 'https://th.bing.com/th/id/OIP.7b2iWGFGqXMr6VyJuLsPTwHaE8?w=280&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7') `;
    const result = await db.promise().query(sql);
    //console.log(result);
    response.send(`Insertion Successful`);
     
});

router.get('/name', async(request,response,) =>{
    response.send(`<form action="admin/rename" enctype="multipart/form-data" method="post" >
    <label for="oldName">OldName:</label>
    <input type="text" name="oldName" id="oldName">
    </form>`)
    console.log('Starting file rename');

    //const {course} = request.params;
    // let sql = `INSERT INTO Courses (IDM,id,name,code,year,semester,img)  VALUES ('dummies','dummiescourse','Dummies Course','DU 009', , 1, 'https://th.bing.com/th/id/OIP.7b2iWGFGqXMr6VyJuLsPTwHaE8?w=280&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7') `;
    // const result = await db.promise().query(sql);
    //console.log(result);
});

router.get('/rename', async(request,response,) =>{
   const {oldName} = req.body;
   const {newName} = req.body;
   fs.rename(`${oldName}`,`${newName}`)
   let sql = `UPDATE Courses SET img = "https://th.bing.com/th/id/R.d03c6da728d2d9db994ced40346e68d5?rik=cMUcZXiBNEIdAg&pid=ImgRaw&r=0" WHERE IDM = "biomedical" AND name="Algebra" `;;
   const result = await db.promise().query(sql, [newName])
   console.log("File Renamed")
});


// router.get('/list', async(request,response,) =>{
//     //const {course} = request.params;
//     let sql = `SELECT * FROM CourseInfo WHERE IDM = "computer" AND year = "1" `;
//     const result = await db.promise().query(sql);
//     //console.log(result);
//     response.send(`Insertion Successful `);
     
// });
// router.get('/update', async(request,response,) =>{
//     //const {course} = request.params;
//     let sql = `UPDATE CourseInfo SET img = "https://th.bing.com/th/id/R.d03c6da728d2d9db994ced40346e68d5?rik=cMUcZXiBNEIdAg&pid=ImgRaw&r=0" WHERE IDM = "biomedical" AND name="Algebra" `;
//     const result = await db.promise().query(sql);
//     //console.log(result);
//     response.send(`Update Successful`);
     
// });


module.exports = router;

