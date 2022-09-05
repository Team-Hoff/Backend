const express = require('express');
const router = express.Router();
const {Deta} =require('deta');
const upload = require('express-fileupload');
router.use(upload());
const deta = Deta('a0h5zcg7_zX38QAiyFSDXG4c4gxt4Qd6WhWxJuBiq');
const courseBooks = deta.Drive('courseBooks');




router.get("/:year/:semester/:course/:slide_name", async(req, res) => {
    const {year, semester, course, slide_name} = req.params;
    const ext = [".pptx"];
    const year_semester = [];

    switch (year) {
        case '1':
            year_semester[0] = "First Year"
            break;
        case '2':
            year_semester[0] = "Second Year"
            break;
        case '3':
            year_semester[0] = "Third Year"
            break;
        case '4':
            year_semester[0] = "Fourth Year"
            break;
        default:
            break;
    }

    switch (semester) {
        case '1':
            year_semester[1] = "First Semester"
            break;
        case '2':
            year_semester[1] = "Second Semester"
            break;
        case '3':
            year_semester[1] = "Third Semester"
            break;
        default:
            break;
    }

    switch (course) {
        case "Numerical Analysis":
            ext[0] = ".pdf"
            break;
    
        default:
            break;
    }
    
    console.log(year_semester);
    const bookName = {
        name: `Computer Engineering/${year_semester[0]}/${year_semester[1]}/${course}/Slides/${slide_name}${ext[0]}`
        
    };


    try{
        const book = await courseBooks.get(bookName.name);
        const buffer = await book.arrayBuffer();
        res.send(Buffer.from(buffer));
        console.log('file is being downloaded');
        console.log(req.params);
            }
        catch(error){
            console.log(error);
        }

    
})

module.exports = router;