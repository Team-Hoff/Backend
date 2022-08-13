const express = require('express');
const app = express();
const cors = require('cors')

//middlewares to parse info from site
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login')


//
app.use("/signup", signupRouter);
app.use("/login", loginRouter);


app.listen(3500);