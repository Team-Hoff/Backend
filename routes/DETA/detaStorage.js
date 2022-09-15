const express = require('express');
const router =express.Router();

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

    
    const directory = 'Computer Engineering/First Year/Second Semester/Programming and Problem Solving/Slides'
    const name = `${directory}/${req.files.filetoUpload.name}`;
    
    const contents = req.files.filetoUpload.data;
    const storeBook = await courseBooks.put(name, {data: contents});
    res.send(storeBook);
    console.log('Successful file upload');
});

// this request enables user to retrieve a specified item from Deta Drive
router.get("/download", async (req, res) => {
    
    const bookName = {
        name: 'Computer Engineering/Third Year/First Semester/Numerical Analysis/Slides/Lecture One.pdf'
    };
    
    const book = await courseBooks.get(bookName.name);
    const buffer = await book.arrayBuffer();
    res.send(Buffer.from(buffer));
    console.log('file is being downloaded');
});

// this request enables user to see all items in a specifc Deta Drive
router.get("/list", async (req, res) => {
    const bookList = await courseBooks.list();
    res.send(bookList);
    console.log('All files in drive');
}); 



module.exports = router;