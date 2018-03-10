'use strict';

var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  authorId: {
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
  content:{
    type: String,
    required: true
  },
  price:{
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

var Story = mongoose.model('story', storySchema);

module.exports = Story;
