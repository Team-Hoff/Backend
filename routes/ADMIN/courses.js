const express = require('express');
const router = express.Router();
const db = require('../../models/database')

router.get('/', (request, response)=> {
    const sql = 'SELECT id FROM CourseInfo';
    const results = db.promise().query();
    const courses = results[0];
    response.status(200).send(courses)

})