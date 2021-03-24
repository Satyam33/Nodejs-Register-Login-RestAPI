require('dotenv').config();
const express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT;
var path = require('path');
const database = require('./config/database');
const userRouter = require('./routes/index')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
   extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);

app.listen(port, function () {
    console.log("Server running at port : " + port);
 });
 
 module.exports = app;