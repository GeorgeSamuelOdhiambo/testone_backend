const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


//self imports 
const getroutes = require('./Routes/getroutes');
const postroutes = require('./Routes/postroutes');

const app = express();




app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(getroutes,postroutes);



mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then((result) => {
    app.listen(8080);
})
.catch((err) => {
    // throw new Error(err);
    console.log(err);
});
