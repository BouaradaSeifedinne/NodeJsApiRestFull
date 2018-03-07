'use strict';

/**** Import ****/
const express = require('express')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
//var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var routes = require('./routes').router;

const app = express()

/**** Middleware ****/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

/****Configure Routes ****/

app.use('/api/', routes);

app.get('/', function (req, res) {
  res.status(200).json({ success: 'Hello World!'});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
