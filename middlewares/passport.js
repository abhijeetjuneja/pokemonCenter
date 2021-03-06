var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userModel = require('./../models/user')
var session = require('express-session');
var jwt = require('jsonwebtoken');
var config = require('./../config/config');


module.exports = function(app,passport){

    var main=this;
    var token='';
    //Use passport session as middleware
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,cookie: { secure: false }}));

    //Serialize user
    passport.serializeUser(function(user, done) {
        //Sign JWT Token
        token = jwt.sign({id:user._id,email:user.email, username : user.username,favourites : user.favourites},config.secret,{expiresIn:'24h'});
        done(null, user._id);
    });


    //Deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    //Passport Google Strategy
    passport.use(new GoogleStrategy({
        clientID: '364667810129-vnpctakl7m14q8hr40q6flkbql8u6bim.apps.googleusercontent.com',
        clientSecret: '7qyqKMZhTu9LqZb1SdCrHZzJ',
        callbackURL: "https://pokemon-center.herokuapp.com/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        //Find user by email
        userModel.findOne({'email':profile.emails[0].value}).select('username email _id').exec(function(err,user){
            if(err) done(err);

            if(user && user!=null){
                done(null,user);
            }
            else {
                done(null,err);
            }
           });
      }
    ));

    //Google callback function
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/googleerror' }),function(req, res) {
            res.redirect('/google/'+token);
    });


    app.get('/auth/google',passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','profile','email'] }));


    return passport;
};
