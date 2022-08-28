const express=require('express');
const router=express.Router();


// creating a get request for the lectuers slides for TECHNICAL DRAWING
router.get('/:lecture_number ',(request,response) =>{
const {lecture_number}=request.params;
switch(lecture_number){
    case 1:
        response.sendFile("the link for lecture ",(err)=>{
            console.log(err);
    })
    
    default:
             response.status(404);
}

});
module.exports=router;

