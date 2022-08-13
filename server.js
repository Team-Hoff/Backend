const express = require('express');
const app = express();


//middlewares to parse info from site
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login')


//
app.use("/signup", signupRouter);
app.use("/login", loginRouter);


app.listen(3500);