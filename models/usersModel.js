'use strict';

var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  userLogin: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  dateCreationStory:{
    type: Date,
    default: Date.now
  },
  dateLastUpdate:{
    type: Date
  },
  userFirstName:{
    type: String,
    required: true
  },
  userLastName:{
    type: String,
    required: true
  },
  userEmail:{
    type: String,
    required: true
  },
  userStatus:{
    type: Boolean,
    required: true
  },
  option:[{
    key: String,
    value: String
  }],
  tags: [{
     key: String,
     value: String
  }]
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;
