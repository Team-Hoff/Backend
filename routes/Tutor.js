const db = require('../models/database')
const express = require('express');
const { Router } = require('express');
const router = express.Router()


router.post('/', (request, response)=> {
    const { fullname ,gender ,occupation ,phone_Number ,email ,region ,city ,course } = req.body;
    sql = `INSERT INTO student (fullname, password, gender, fullname, programme, year) VALUES`+
    `('${fullname}','${gender}','${occupation}','${phone_Number}','${email}','${region}','${city}','${course}')`
    response.send()
})

router.get('/', async(request, response)=>{
    const sql = 'SELECT * FROM Tutors'
    const tutors = await db.promise().query(sql)
    response.send(tutors)
})

module.exports = Router;