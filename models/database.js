const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({path: './.env'})


module.exports = mysql.createConnection({
    host:"virtual-library.cp1myldql9kf.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"JnFbLwKjL7jtczy",
    port: "3306",
    database: "library"
});

