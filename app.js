const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//to parse incoming request bodies
const bodyParser = require('body-parser');
//db configuration
require("dotenv").config();
const mongoose = require('mongoose');

//mongodb hosted on AWS by mLab
mongoose
  .connect("mongodb+srv://mental:mental@cluster0.vlvjj.mongodb.net/LCnote?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));


let app = express();
let port = 5000;

let tasks = require('./routes/tasks');
let homePage = require('./routes/home-page');

//view engine set up
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
//middleware set up
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use('/', homePage);
app.use('/tasks',tasks);


app.listen(port,()=>{
  console.log(`server listening on port ${port}` );
});
