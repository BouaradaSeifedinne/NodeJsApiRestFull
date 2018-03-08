
var asynclib = require('async');
var Users = require('../models/usersModel');
module.exports = {
    getUsers: function(req, res) {
        //res.status('200').json({'success': 'getStory ok'});
        Users.find({}, function(err, users) {
           if (err) throw err;

           // object of all the Storys
           res.status('200').json(users);
           console.log(users);
         });

    },
    updateUser: function(req, res) {
      res.status('200').json({'success': 'updateUser ok'});
    },
    setUser : function(req, res){
      //res.status('200').json({'success': 'setStory ok'});
      var user = new Users();

      user.userLogin = req.body.userLogin;
      user.userFirstName = req.body.userFirstName;
      user.userLastName = req.body.userLastName;
      user.userEmail = req.body.userEmail;
      user.userStatus = req.body.userStatus;
      user.option = req.body.option;
      user.tags = req.body.tags;

      user.save(function(err) {
        if(err)
        {
          res.status(400).json({'error': err});
        }
          res.status(200).json({'success': 'created'});
      });
    },
    DeleteUser: function(req, res){
      Users.findOne({_id: req.params.id_user}, function(err, user){

          user.status = 0;
          user.dateLastUpdate = new Date();

        story.save(function(err) {
          if(err)
          {
            res.status(400).json({'error': err});
          }
            res.status(200).json({'success': 'Deleted'});
        });
      });
    },

}
