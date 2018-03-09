'use strict';

// Import
var express = require('express');
var story = require('./routes/story');
var users = require('./routes/users');

exports.router = (function(){

  var routes = express.Router();

  //Story Routes
  routes.route('/story/show/').get(story.getStory);
  routes.route('/story/update/:id_story').put(story.updateStory);
  routes.route('/story/add/').post(story.setStory);
  routes.route('/story/delete/:id_story').put(story.DeleteStory);

  //Users routes
  routes.route('/users/show/').get(users.getUsers);
  routes.route('/users/update/:id_user').put(users.updateUser);
  routes.route('/users/add/').post(users.setUser);
  routes.route('/users/delete/:id_user').put(users.DeleteUser);
  routes.route('/users/login/').post(users.login);

  return routes;
})();
