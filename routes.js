'use strict';

// Import
var express = require('express');
var story = require('./routes/story');
var users = require('./routes/users');
var subjects = require('./routes/subjects');

exports.router = (function(){

  var routes = express.Router();

  //Story Routes
  routes.route('/story/feed/:id_subject').get(story.getStories);
  routes.route('/story/update/:id_story').put(story.updateStory);
  routes.route('/story/add/').post(story.createStory);
  routes.route('/story/delete/:id_story').put(story.UpdateStatusStory);
  routes.route('/story/validatestory/:id_story').put(story.UpdateStatusStory);
  routes.route('/story/search/:key&:value').get(story.getStoriesBy);
  routes.route('/story/show/:id_story').get(story.getStoryById);
  routes.route('/story/addreview/:id_story').put(story.updateReviewStory);

  //Users routes
  routes.route('/users/show/').get(users.getUsers);
  routes.route('/users/update/:id_user').put(users.updateProfileUser);
  routes.route('/users/add/').post(users.setUser);
  routes.route('/users/delete/:id_user').put(users.DeleteUser);
  routes.route('/users/login/').post(users.login);
  routes.route('/users/profile/').get(users.getProfileUser);

  //Subjects routes
  routes.route('/subjects/feed/').get(subjects.getSubjects);
  routes.route('/subjects/update/:id_subject').put(subjects.updateSubject);
  routes.route('/subjects/add/').post(subjects.createSubject);

  return routes;
})();
