var mongoose = require('mongoose');
var express = require('express');
var app         = express();
var userRouter  = express.Router();
var userModel = mongoose.model('User');
var commonValidations = require('../shared/validations/signup');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var isEmpty = require('lodash/isEmpty');
var auth = require('./../middlewares/authenticate');

//Export controller function
module.exports.controllerFunction = function(app) {

    userRouter.get('/duplicate/:identifier', (req, res) => {
      userModel.findOne({'email':req.params.identifier}).select('email').exec((err,user) => {
        res.json({ user });
      });
    });


    userRouter.get('/current/info',auth.check, (req, res) => {
      userModel.findOne({'email':req.currentUser.email}).select('email username favourites').exec((err,user) => {
        res.status(200).json({ user });
      });
    });

    userRouter.post('/create', (req, res) => {
      let { errors, isValid } = commonValidations(req.body);
      userModel.findOne({'email':req.body.email}).exec((user) => {
        if (user) {
          if (user.get('email') === req.body.email) {
            errors.email = 'There is user with such email';
          }
        }
        if (isValid) {
          var newUser = new userModel(req.body);

          newUser.save((err,user) => {
            console.log("Entered new user");
            if(err){
              console.log('500');
              res.status(500).json({ error: err })
            }
            else{
              console.log('Success');
              res.json({ success: true })
            }
          });
          console.log("finished new user");

        } else {
          console.log('Not valid');
          res.status(400).json(errors);
        }
      });

    });

    userRouter.post('/login', (req, res) => {
      const { identifier, password } = req.body;
      userModel.findOne({'email':identifier}).exec((err,user) => {
        if(user){
          console.log(user);
          console.log(password);
          if(user.comparePassword(password)){
            console.log("Valid password");
            const token = jwt.sign({
              id: user.get('_id'),
              username: user.get('username'),
              email:user.get('email'),
              favourites: user.get('favourites')
            }, config.secret);
            res.json({ token });
          }
          else {
            console.log("Invalid password");
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
          }
        }
        else {
          console.log("User not found");
          res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
      });
    });




    //name api
    app.use('/api/users', userRouter);




};//end contoller code
