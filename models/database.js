const mysql = require('mysql2');
require('dotenv').config();
const path = require('path')

//console.log(process.env);
module.exports = mysql.createConnection({
    host:process.env.HOST_NAME,
    user:"admin",
    password:process.env.HOST_KEY,
    port:3306,
    database: "library"
});

