'use strict';

/**** Import ****/
const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes').router;
var expressValidator = require('express-validator');
require('dotenv').config();


const app = express()

/**** Middleware ****/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
//express validator
app.use(expressValidator());
//Connect to mongoose
var mongoAdress = 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+"/"+process.env.DB_NAME
mongoose.connect(mongoAdress);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection success');
});

/****Configure Routes ****/
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api/', routes);

app.get('/', function (req, res) {
  res.status(200).json({ success: 'Hello World!'});
})

//Server Configure

var port= process.env.SERVER_PORT || 5000;
app.listen(port, function () {
  console.log('Example app listening on port '+port+' !');
})
