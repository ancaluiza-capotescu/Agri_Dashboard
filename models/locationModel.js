const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true
  }
});

const Location = mongoose.model('location', locationSchema);
module.exports = Location;
