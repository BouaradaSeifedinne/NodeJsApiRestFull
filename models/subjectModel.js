'use strict';

var mongoose = require('mongoose');

var SubjectsSchema = mongoose.Schema({
  dateCreationSubject:{
    type: Date,
    default: Date.now
  },
  dateLastUpdate:{
    type: Date
  },
  editorId: {
    type: String,
  },
  authorId: {
    type: String,
  },
  title:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  summary:{
    type: String,
    required: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  tags:[{
    key: String,
    value: String
  }]
});

var Subjects = mongoose.model('subjects', SubjectsSchema);

module.exports = Subjects;
