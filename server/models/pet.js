var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PetSchema = new Schema({
  petId: { type: String, required: true },
  petName: { type: String, required: false},
  imgURL: { type: String, required: false},
  description: { type: String, required: false},
  species: {type: String, required: true},
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
