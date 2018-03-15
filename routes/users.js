
var bcrypt = require('bcrypt');
var asynclib = require('async');
var Users = require('../models/usersModel');
var jwtUtils = require('../utils/jwt.utils');
var message = require('../utils/message');
//console.log(message.error);
//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
    getUsers: function(req, res) {
        //res.status('200').json({'success': 'getStory ok'});
        // getting auth header
      /*  var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        if(userId < 0)
        {
           return res.status(400).json({'error': 'wrong token'});
        }*/

        Users.find({}, "userLogin userFirstName userEmail userLastName option tags userStatus dateCreationUser", function(err, users) {
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
      var password = req.body.userPassword;
      let hash = bcrypt.hashSync(password, 10);
      var user = new Users();

      user.userLogin = req.body.userLogin;
      user.userFirstName = req.body.userFirstName;
      user.userLastName = req.body.userLastName;
      user.userEmail = req.body.userEmail;
      user.userStatus = req.body.userStatus;
      user.option = req.body.option;
      user.tags = req.body.tags;
      user.userPassword = hash;

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
    login: function(req, res){
        var email = req.body.email;
        var password = req.body.password;

        //Todo verify mail regex & password lenght.
        if(email == null || password == null)
        {
            return res.status(400).json({'error': message.error.emptyParams});
        }

        if(!EMAIL_REGEX.test(email))
        {
           return res.status(400).json({'error': message.error.email});
        }

        if(!PASSWORD_REGEX.test(password))
        {
           return res.status(400).json({'error': message.error.email});
        }

        asynclib.waterfall([
          function(done){
            Users.findOne({ userEmail: email })
            .then(function(userFound){
              done(null, userFound);
            })
            .catch(function(err){
              return res.status(500).json({'error': message.error.user});
            });
          },
          function(userFound, done){
            if(userFound)
            {
              bcrypt.compare(password, userFound.userPassword, function(errBycrypt, resBycrypt){
                      done(null, userFound, resBycrypt);
              });
            }
            else
            {
                 return res.status(404).json({'error' : message.error.userNotExist});
            }
          },
          function(userFound, resBycrypt, done){
                if(resBycrypt){
                    done(userFound);
                }
                else
                {
                    return res.status(403).json({ 'error': message.error.password});
                }
          }
        ],function(userFound){
            if(userFound)
            {
                return res.status(201).json({
                            'userId': userFound._id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
            }
            else
            {
                 return res.status(500).json({'error': message.error.user});
            }
        });
    }

}
