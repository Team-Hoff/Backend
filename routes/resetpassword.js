const express = require("express");
const router = express.Router();

router.get('/', function(request, response){
    response.send("Come in ");
    


})

module.exports = router