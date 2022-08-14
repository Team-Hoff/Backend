const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config({path: './.env'});

module.exports = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

