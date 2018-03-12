
var asynclib = require('async');
var Story = require('../models/storyModel');
module.exports = {
    getStories: function(req, res) {
        //res.status('200').json({'success': 'getStory ok'});
        Story.find({}, function(err, storys) {
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

        story.save(function(err) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'success': 'Updated'});
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

      story.save(function(err) {
        if(err)
        {
          res.status(400).json({'error': err});
        }
          res.status(200).json({'success': 'created'});
      });
    },
    DeleteStory: function(req, res){

    },
    UpdateStatusStory: function(req, res){
      Story.findOne({_id: req.params.id_story}, function(err, story){

          story.status = req.body.status;
          story.dateLastUpdate = new Date();

        story.save(function(err) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'success': 'Status Update'});
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

}
