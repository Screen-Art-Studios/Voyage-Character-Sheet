var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Character = mongoose.model("CharacterVoyage");
var User = mongoose.model("User");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
jwtOptions.secretOrKey = 'LokisBreath-420';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({"_id": jwt_payload.id}, function(err, user) {
    if (err) {
          return next(err, false);
      }
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      }
  });
});

app.use(passport.initialize());
passport.use(strategy);
app.use(bodyParser.json());

router.post("/", (req,res) => {
  var newCharacter = new Character({
    name: req.body.name,
    health: req.body.health,
    exhaustion: req.body.exhaustion,
    race: req.body.race,
    yid: req.body.yid,
    str: req.body.str,
    dex: req.body.dex,
    int: req.body.int,
    tgh: req.body.tgh,
    end: req.body.end,
    cha: req.body.cha,
    will: req.body.will,
    skills: req.body.skills,
    traits: req.body.traits,
    abilities: req.body.abilities,
    inventory: req.body.inventory
  })

  newCharacter.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.get("/all", passport.authenticate('jwt', { session: false }),(req, res) => {
  Character.find({},function (err, characters) {
    if (err) {
      res.send(err);
    } else {
      res.send(characters);
    }
  })
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var characterid = new mongodb.ObjectID(req.params["id"]);
  Character.find({"_id": characterid},function (err, character) {
    if (err) {
        res.status(500).send(err);
    } else if (character.length === 0) {
        res.status(404).send('error character not found')
    } else {
        var character = character[0];
        character.yid = req.body.yid || character.yid;
        character.str = req.body.str || character.str;
        character.dex = req.body.dex || character.dex;
        character.int = req.body.int || character.int;
        character.tgh = req.body.tgh || character.tgh;
        character.end = req.body.end || character.end;
        character.cha = req.body.cha || character.cha;
        character.will = req.body.will || character.will;
        character.skills = req.body.skills || character.skills;
        character.traits = req.body.traits || character.traits;
        character.abilities = req.body.abilities || character.abilities;
        character.inventory = req.body.inventory || character.inventory;

        character.save(function (err, character) {
            if (err) {
              res.status(500).send(err)
            }
            res.send(character);
        });
      }
  });
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var characterid = new mongodb.ObjectID(req.params["id"]);
  Character.find({_id: characterid}).remove().then(() => {
    res.send("success");
  })
})

module.exports = router;
