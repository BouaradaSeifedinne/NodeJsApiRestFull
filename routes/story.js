
var asynclib = require('async');
var Story = require('../models/storyModel');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
    getStories: function(req, res) {

      /*  findParams = {};
        if(req.params.id_subject)
        {
          findParams = { subjectId: req.params.id_subject }
        } */

        Story.find({}, "_id title summary tags dateCreationStory dateLastUpdate subjectId authorId editorId price status thumbnail review", function(err, storys) {
           if (err) throw err;

           // object of all the Storys
           res.status('200').json(storys);
           console.log(storys);
         });

    },
    updateStory: function(req, res) {

      var headerAuth = req.headers['authorization'];
      var userId = jwtUtils.getUserId(headerAuth);

      if(userId < 0)
      {
         return res.status(400).json({'error': 'wrong token'});
      }

      Story.findOne({_id: req.params.id_story}, function(err, story){

        //story.authorId = req.body.authorId;
        story.title = req.body.title;
        story.content = req.body.content;
        story.summary = req.body.summary;
        story.price = req.body.price;
        story.thumbnail = req.body.thumbnail;
        story.dateLastUpdate = new Date();
        story.tags = req.body.tags;

        story.save(function(err, story) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'_id': story._id, "status": story.status});
        });
      });

    },
    createStory : function(req, res){
      try{
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0)
        {
           return res.status(400).json({'error': 'wrong token'});
        }else {
          //Get Validator
          req.check('status', 'Invalid Status').isInt({min: 0, max: 5});
          req.check('title', 'Invalid title').isAscii().isLength({min: 4, max: 255});
          req.check('summary', 'Invalid summary').isAscii().isLength({min: 4, max: 255});
          req.check('content', 'Invalid content').isAscii().isLength({min: 4});
          req.check('price', 'Invalid price').isFloat({min: 0.00});
          req.check('tags[0][key]', 'Invalid tags key').isAscii().isLength({min: 4}).isIn(['sector']);
          req.check('tags[0][value]', 'Invalid tags sector value').isAscii().isLength({min: 4});
          req.check('tags[1][key]', 'Invalid tags key').isAscii().isLength({min: 4}).isIn(['country']);
          req.check('tags[1][value]', 'Invalid country Value').isAscii().isLength({min: 4});

          var errors = req.validationErrors();

          if(errors)
          {
            res.status(400).json(errors);
            console.log(errors);
            errors = "";
          }else {
            //Create a new object story
            var story = new Story();
            story.authorId = userId;
            story.title = req.body.title;
            story.status = req.body.status;
            story.content = req.body.content;
            story.summary = req.body.summary;
            story.price = req.body.price;
            story.thumbnail = req.body.thumbnail;
            story.tags = req.body.tags;
            story.subjectId = req.body.subjectId;

            story.save(function(err, story) {
              if(err)
              {
                res.status(400).json({'error': err});
              }else {
                res.status(200).json({'_id': story._id, "status": story.status});
              }
            });
          }
        }
      }
      catch(err)
      {
        console.log(err);
      }
    },
    UpdateStatusStory: function(req, res){
      Story.findOne({_id: req.params.id_story}, function(err, story){

          story.editorId = req.body.editorId;
          story.status = req.body.status;
          story.dateLastUpdate = new Date();

        story.save(function(err, story) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({"_id" : story._id, "status": story.status});
        });
      });
    },
    getStoriesBy: function(req, res){
      Story.find({"tags.key": {$in: req.params.key}, "tags.value": {$in: req.params.value}}, function(err, stories) {
         if (err) throw err;

         // object of all the Storys
         res.status('200').json(stories);
         console.log(req.params);
       });
    },
    getStoryById: function(req, res){
      Story.findOne({_id: req.params.id_story}, function(err, story){

          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json(story);
      });
    },
    updateReviewStory: function(req, res) {
      Story.findOne({_id: req.params.id_story}, function(err, story){

        //story.authorId = req.body.authorId;
        story.review = req.body.review;

        story.save(function(err) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'success': "created"});
        });
      });
    },

}
