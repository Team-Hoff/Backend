const express = require('express');
const router = express.Router();


const computerRouter = require("./Programs/computer")


router.use("/computer", computerRouter)


module.exports = router;