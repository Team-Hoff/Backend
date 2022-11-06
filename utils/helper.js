const bcrypt = require('bcryptjs');
const db = require('../models/database')

function hashpassword (password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparepassword (raw, hash){
    return bcrypt.compareSync(raw, hash);
}

function updateAccess(programme, course){
    let sql = `UPDATE ${programme} SET access = access +1 WHERE course = ?`
    const results =  db.promise().query(sql, course)
    return results[0]
}

async function retrieveRecommended(programme){
    let sub_query = `(SELECT course FROM ${programme} WHERE access >= 0 ORDER BY access DESC LIMIT 5)`
    let sql = `SELECT * FROM CourseInfo WHERE id in (SELECT * FROM` + sub_query + ` AS t1) AND IDM='computer'`
    const results = await db.promise().query(sql)
    return results[0]
}

module.exports = {
    hashpassword,
    comparepassword,
    updateAccess,
    retrieveRecommended
}