const express = require('express')
const router = express.Router()


person = {
    fullname:"John", 
    level: 100, 
    programme:"New York",
    email:"dslark13@gmail.com"
};

router.get("/", (request, response) => {
    response.send(person)
})


module.exports = router