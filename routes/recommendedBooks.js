const express = require('express')
const router = express.Router()
const db = require('../models/database')

router.get('/', (req, res)=> {
    const sql = 'SELECT * FROM recommendedBooksComputer'
    const books = db.promise().query(sql)
    const recommended_books = books[0]
    res.send("recommended books")
})

router.get('/book/:book_name', async(request, response) => {
    // const {programme, year} = request.user
    // const {book_name} = request.params
    // const sql = `UPDATE ${programme.split(' ')[0]}L${year.split(' ')[1]} SET access=access+1 WHERE book=?`
    // db.promise().query(sql,[book_name])
    // const sql = `UPDATE Computer_L200 SET courseName = (SELECT name FROM CourseInfo WHERE IDM="computer" and year=2) WHERE courseName =''`
    const sql = 'SELECT name FROM CourseInfo WHERE IDM="computer" and year=2'
    const results = await db.promise().query(sql)
    response.send(results[0])
})

module.exports = router