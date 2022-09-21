const express = require('express');
const app = express();

const cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser   = require("body-parser"); 
const passport  = require("passport");
const db     = require("./models/database");
const local = require('./strategies/local');
const allowedOrigin = require('./utils/allowedOrigin')

//storing session
const mysqlStore = require("express-mysql-session")(session);

const options = {
    connectionLimit: 10,
    host:"virtual-library.cp1myldql9kf.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"JnFbLwKjL7jtczy",
    database: 'library',
    port: 3306,
    createDatabaseTable: true,
    endConnectionOnClose: false,
    clearExpired: true,
    checkExpirationInterval: 60*60*24,
    expiration: 14400000

}

const sessionStore = new mysqlStore(options, db.promise());




//middlewares to parse info from site
app.use(cors(
    {   credentials: true,
        origin: true
    }
));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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
const loginRouter  = require('./routes/login');
const authRouter   = require('./routes/auth')
const profileRouter = require('./routes/profile');
const detaRouter   = require('./routes/DETA/detaStorage')
const testRouter = require('./routes/testdb');
const logoutRouter = require("./routes/logout");
const programRouter = require("./routes/Program");
const resetRouter = require('./routes/resetpassword');
const forgotRouter = require('./routes/forgotpassword');
const courseRouter = require('./routes/course');
const searchRouter = require('./routes/search');
const settingsRouter     = require('./routes/changeUserDetails')


app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/deta", detaRouter)
app.use("/testdb", testRouter)
app.use("/logout", logoutRouter)
app.use("/program", programRouter)
app.use("/reset", resetRouter);
app.use("/forgot", forgotRouter)
app.use("/course", courseRouter)
app.use("/search", searchRouter)
app.use("/setting", settingsRouter)




const port = process.env.PORT || 3500;
app.listen(port, ()=>
{console.log(`server is running on port ${port}`)});