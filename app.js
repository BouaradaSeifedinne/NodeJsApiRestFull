'use strict';

/**** Import ****/
const express = require('express')
var bodyParser = require('body-parser')
//var passport = require('passport');
var mongoose = require('mongoose');
var Strategy = require('passport-http-bearer').Strategy;
var routes = require('./routes').router;

const app = express()

/**** Middleware ****/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/newscoin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection success');
});

/****Configure Routes ****/

app.use('/api/', routes);

app.get('/', function (req, res) {
  res.status(200).json({ success: 'Hello World!'});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
