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


// router.get("/list?name", async (req, res) => {
//     const bookName = {
//         name: '${proram}/Third Year/First Semester/Numerical Analysis/'
//     };
//     const bookList = await courseBooks.list('Computer Engineering');
//     res.send(bookList);
//     console.log('All files in drive');
// });


//lists all files in Deta Drive
// router.get("/list", async (req, res) => {
//     // const bookName = {
//     //     name: 'Computer Engineering/Third Year/First Semester/Numerical Analysis/'
//     // };
//     const bookList = await courseBooks.list();
//     const bookShelf = bookList.names;
//     res.send(bookShelf);
//     console.log('All files in drive');
// }); 



//places names of course in database
router.get("/list", async (req, res) => {
    const program = `Telecom Engineering`
    const name = `Electrical Engineering Drawing`
    const courses = `${program}/First Year/Second Semester/${name}/Slides/` //Edit year and semester
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

    
    console.log(array);
    const Arrlength = array.length;
    const newLectarr = [];
    console.log(Arrlength);
    //const i =1;
    for(let i=1;i<=Arrlength;i++){
    newLectarr.push(i);

}
    console.log(newLectarr);
    const jsonArr = JSON.stringify(newLectarr);
    const sql = `UPDATE CourseInfo SET slides = ?, ext=? WHERE IDM =? AND name=?`;
    db.query(sql, [jsonArr, ext[0][1][1], `telecom`, name])//Edit program ere
    res.send(array);
    console.log(`All files in ${courses}`);
}); 



module.exports = router;