'use strict';

// Import
var express = require('express');
var story = require('./routes/story');

exports.router = (function(){

  var routes = express.Router();

  //Story Routes
  routes.route('/story/show/').get(story.getStory);
  routes.route('/story/show/').put(story.updateStory);
  routes.route('/story/add/').post(story.setStory);
  routes.route('/story/delete/').put(story.updateStory);

  return routes;
})();
