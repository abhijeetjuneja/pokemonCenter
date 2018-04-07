var mongoose = require('mongoose');
var express = require('express');
var app         = express();
var pokemonRouter  = express.Router();
var userModel = mongoose.model('User');
var auth = require('./../middlewares/authenticate');

//Export controller function
module.exports.controllerFunction = function(app) {

    pokemonRouter.post('/add/:id',auth.check,(req, res) => {
      console.log(req.currentUser.email);
      userModel.findOne({'email':req.currentUser.email}).select('favourites').exec((err,user) => {
        user.favourites.push({'id':req.params.id});
        user.save((err,done) => {
          if(err) res.status(500).json({'error' : 'Could not add to favourites'});
          else res.status(200).json({'success' : 'Added to favourites'});
        });

      });
    });

    pokemonRouter.get('/favourites', auth.check,(req, res) => {
      res.status(200).json(req.currentUser.favourites);
    });


    //name api
    app.use('/api/pokemons', pokemonRouter);


};//end contoller code
