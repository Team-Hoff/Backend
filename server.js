const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser   = require("body-parser"); 
const passport  = require("passport");
const db     = require("./models/database");
const local = require('./strategies/local');

//storing session
const mysqlStore = require("express-mysql-session")(session);

const options = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'ozneroL200',
    database: 'coursematerials',
    port: 4000,
    createDatabaseTable: true,
    endConnectionOnClose: true,
    clearExpired: true,
    checkExpirationInterval: 60*60*24,
    expiration: 14400000

}

const sessionStore = new mysqlStore(options, db.promise());





//middlewares to parse info from site
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session(
    {
        secret: "Cookie_Secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,    
    }
    

));

app.use(passport.initialize());
app.use(passport.session());



//ROUTERS
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login');




app.use("/signup", signupRouter);
app.use("/login", loginRouter);


app.listen(3500, ()=>
{console.log("server is running on port 3500")});