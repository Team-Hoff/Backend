const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({path: './.env'})


module.exports = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ozneroL200",
    database:"coursematerials"
});

