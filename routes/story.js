
var asynclib = require('async');
var Story = require('../models/storyModel');

module.exports = {
    getStories: function(req, res) {
        Story.find({ subjectId: req.params.id_subject },"_id title summary tags dateCreationStory dateLastUpdate subjectId authorId editorId price status thumbnail review", function(err, storys) {
           if (err) throw err;

           // object of all the Storys
           res.status('200').json(storys);
           console.log(storys);
         });

    },
    updateStory: function(req, res) {
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
      //res.status('200').json({'success': 'updateStory ok'});
    },
    setStory : function(req, res){
      //res.status('200').json({'success': 'setStory ok'});
      var story = new Story();
      story.authorId = req.body.authorId;
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
        }
          res.status(200).json({'_id': story._id, "status": story.status});
      });
    },
    DeleteStory: function(req, res){

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
