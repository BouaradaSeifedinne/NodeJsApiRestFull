'use strict';
var asynclib = require('async');
var Subjects = require('../models/subjectModel');

module.exports = {
  getSubjects: function(req, res) {
      Subjects.find({},function(err, subject) {
         if (err) throw err;

         // object of all the Storys
         res.status('200').json(subject);
         console.log(subject);
       });
  },
  updateSubject: function(req, res){
    Subjects.find({_id: req.params.id_subject}, function(err, subject) {

        subject.title = req.body.title;
        subject.summary = req.body.summary;
        subject.thumbnail = req.body.thumbnail;
        subject.tags = req.body.tags;
        subject.dateLastUpdate = new Date();

        subject.save(function(err, subject) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'_id': subject._id, "status": subject.status});
        });
    });
  },
  createSubject: function (req, res) {

     var subject = new Subjects();
     subject.authorId = req.body.authorId;
     subject.editorId = req.body.editorId;
     subject.summary = req.body.summary;
     subject.thumbnail = req.body.thumbnail;
     subject.dateCreationSubject = new Date();
     subject.status = 1;
     subject.tags = req.body.tags;
     subject.title = req.body.title;

     subject.save(function(err, subject) {
        if(err)
        {
          res.status(400).json({'error': err});
        }

        res.status(200).json({'_id': subject._id, "status": subject.status});

     });
  },
};
