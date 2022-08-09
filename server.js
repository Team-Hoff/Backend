const express = require('express');
const app = express();


//middlewares to parse info from site
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


const signupRouter = require('./routes/signup.js');



//
app.use("/signup", signupRouter);


app.listen(3500);