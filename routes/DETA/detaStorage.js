const express = require('express');
const router =express.Router();
const db = require("../../models/database")
const {Deta} =require('deta');


const upload = require('express-fileupload');
// var http = require('http');
// var fs = require('fs');
// const path = require('path');




router.use(upload());

// Product key to access Deta Drive
const deta = Deta('a0h5zcg7_zX38QAiyFSDXG4c4gxt4Qd6WhWxJuBiq');


// Unique name of Deta Drive
const courseBooks = deta.Drive('courseBooks');


//Creates a form to allow user upload a book
router.get('/', (req, res) => {
    res.send(`
    <form action="deta/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="filetoUpload" required accept="application/pdf, .txt, .docx , .doc, .pptx"> 
      <input type="submit" value="Upload">
    </form>`);
    //accept attribute restricts the upload form to only specified file types
    console.log('Starting file upload');
});

//this request handles the upload of the specified book to the Deta drive
router.post("/upload", async (req, res) => {

    
    const directory = 'Biomedical Engineering/First Year/First Semester/Cell Biology/Slides'
    const name = `${directory}/${req.files.filetoUpload.name}`;
    
    const contents = req.files.filetoUpload.data;
    const storeBook = await courseBooks.put(name, {data: contents});
    res.send(storeBook);
    console.log('Successful file upload');
});

// this request enables user to retrieve a specified item from Deta Drive
router.get("/download", async (req, res) => {
    
    const bookName = {
        name: '${proram}/Third Year/First Semester/Numerical Analysis/Slides/Lecture One.pdf'
    };
    
    const book = await courseBooks.get(bookName.name);
    const buffer = await book.arrayBuffer();
    res.send(Buffer.from(buffer));
    console.log('file is being downloaded');
});

// this request enables user to see all items in a specifc Deta Drive

//original code in github
// router.get("/list?name", async (req, res) => {
//     const bookName = {
//         name: '${proram}/Third Year/First Semester/Numerical Analysis/'
//     };
//     const bookList = await courseBooks.list('Computer Engineering');
//     res.send(bookList);
//     console.log('All files in drive');
// });


//tests 01(all files)
// router.get("/list", async (req, res) => {
//     // const bookName = {
//     //     name: 'Computer Engineering/Third Year/First Semester/Numerical Analysis/'
//     // };
//     const bookList = await courseBooks.list();
//     const bookShelf = bookList.names;
//     res.send(bookShelf);
//     console.log('All files in drive');
// }); 



// //tests 02(list files in specific course)
router.get("/list", async (req, res) => {
    const program = `Computer Engineering`
    const name = `Algebra`
    const courses = `${program}/First Year/First Semester/${name}/Slides/` //Edit year and semester
    //const {year} = req.params;
    const array = []
    const ext = []
    const bookList = await courseBooks.list(
        {prefix: courses});
    const bookShelf = bookList.names;
    const myarray = bookShelf.map(x=>x.split(courses))
    var i = 0;
    myarray.forEach(element => {
        ext[0] = element.map(x=>x.split(`.`))
        array[i]=ext[0][1][0]
        i=i+1
    });
    


    const sql = `UPDATE CourseInfo SET slides = ?, ext=? WHERE IDM =? AND name=?`
    db.query(sql, [array, ext[0][1][1], `telecom`, name])//Edit program ere
    res.send(array);
    console.log(`All files in ${courses}`);
}); 


//tests03
// router.get("/list/:course/:year", async (req, res) => {
//     const {course} = req.params;
//     const {year} = req.params;
//     const bookList = await courseBooks.list({prefix: `${course}/${year}`});
//     const bookShelf = bookList.names;
//     res.send(bookShelf);
//     console.log(`All files in ${course}`);
// }); 
// router.get("/list/:course", async (req, res) => {
// const {course} = req.params;
//     const {year} = req.params;
//     const bookList = await courseBooks.list({prefix: `${course}`});
//     const bookShelf = bookList.names;
//     const listBookshelf=bookShelf.filter(element => (element==`${course}`&& element==`${year}`))
//     res.send(listBookshelf);
//     console.log(`All files in ${course}`);
// }); 



module.exports = router;