var mongoose = require("mongoose");
var CharacterVoyageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  health: {
    type: Number,
    required: true
  },
  exhaustion: {
    type: Number,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  yid: {
    type: Number,
    required: false,
    default: 0
  },
  str: {
    type: Number,
    required: true
  },
  dex: {
    type: Number,
    required: true
  },
  tgh: {
    type: Number,
    required: true
  },
  int: {
    type: Number,
    required: true
  },
  cha: {
    type: Number,
    required: true
  },
  will: {
    type: Number,
    required: true
  },
  skills: {
    type: Array,
    required: false
  },
  traits: {
    type: Array,
    required: false
  },
  abilities: {
    type: Array,
    required: false
  },
  inventory: {
    type: Array,
    required: false
  }
})

var CharacterVoyage = mongoose.model("CharacterVoyage", CharacterVoyageSchema);
module.exports = CharacterVoyage;
