const express = require('express')
const router = express.Router()
const db = require('../models/database')
const courses = require('../models/CourseData.json')
const {retrieveRecommended} = require('../utils/helper')
let list = ''

let i = 0

function program(programme){
    let p = programme.split(' ')
    return p[0].toLowerCase()
    
}

courses.map((course)=> {
    if (i > 57) return
    if ( i == 57) list += `('${course.id}')`
    else if (list.search(`${course.id}`) == -1)list += `('${course.id}'),`
    i++
})


router.get('/', async(request, response) => {
    const {programme} = request.user
    let courses = await retrieveRecommended(program(programme))
    response.send(courses)
})

module.exports = router