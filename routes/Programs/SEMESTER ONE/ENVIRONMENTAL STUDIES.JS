const express=require('express');
const router=express.Router();


// creating a get request for the lectuers slides for the ENVIRONMENTAL STUDIES
router.get('/:lecture_number ',(request,response) =>{
const {lecture_number}=request.params;
switch(lecture_number){
    case 1:
        response.sendFile("the link for lecture 2",(err)=>{
            console.log(err);
        })
    break;
    case 2:
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
