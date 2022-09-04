const express=require('express');
const router=express.Router();
const {courseBooks} = require('../DETA/detaStorage')


// creating a get request for the lectuers slides for the applied electricity\
router.get("/download", async(req, res) => {
    const bookName = {
        name: 'Computer Engineering/Third Year/First Semester/Classical Control Systems/ Slides/EE 387 UNIT 00.pptx'
    };
    
    const book = await courseBooks.get(bookName.name);
   console.log(book);

})

router.get('/here ',(request,response) =>{
// const {lecture_number}=request.params;
lecture_number = 2
switch(lecture_number){
    case 1:
        response.sendFile("the link for lecture 2",(err)=>{
            console.log(err);
     })
    break;
    case 2:3
        response.sendFile("the link for lecture 2",(err)=>{
            console.log(err);
        })
    break;
    case 3:
        response.sendFile("the link for lecture 3",(err)=>{
            console.log(err);
        })
    break;
    case 4:
        response.sendFile("the link for lecture 4",(err)=>{
                console.log(err);
        })
    break;
    case 5:
        response.sendFile("the link for lecture 5",(err)=>{
            console.log(err);
        })
    break;    
    case 6:
        response.sendFile("the link for lecture 6",(err)=>{
            console.log(err);
        })
    break;
    case 7:
        response.sendFile("the link for lecture 7",(err)=>{
            console.log(err);
        })
    break;
    case 8:
        response.sendFile("the link for lecture 8",(err)=>{
            console.log(err);
        })
    break;
    case 9:
        response.sendFile("the link for lecture 9",(err)=>{
            console.log(err);
        })
    break;
    case 10:
        response.sendFile("the link for lecture 10",(err)=>{
            console.log(err);
        })
    break;
    case 11:
        response.sendFile("the link for lecture 11",(err)=>{
            console.log(err);
        })
    break;
    case 12:
        response.sendFile("the link for lecture 12",(err)=>{
            console.log(err);
            })
            default:
                response.status(404);
}

});
module.exports=router;