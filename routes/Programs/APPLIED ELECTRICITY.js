const express=require('express');
const router=express.Router();
const {Deta} =require('deta');


const upload = require('express-fileupload');
router.use(upload());
const deta = Deta('a0h5zcg7_zX38QAiyFSDXG4c4gxt4Qd6WhWxJuBiq');


const courseBooks = deta.Drive('courseBooks');


router.get("/", (req, res) => {
    console.log(req.path);
    res.send(req.path)  
})



// creating a get request for the lectuers slides for the applied electricity\
router.get("/:lecture_name", async(req, res) => {
    

    const bookName = {
        name: `Computer Engineering/Third Year/First Semester/Classical Control Systems/Slides/${req.params.lecture_name}`
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

    console.log(req.baseUrl);

    

})

module.exports=router;