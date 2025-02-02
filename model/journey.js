var mongoose = require('./connection')

var journeySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var journeyModel = mongoose.model('journey', journeySchema);
  
  module.exports = journeyModel;