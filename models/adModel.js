const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    minlength: 3
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    minlength: 3,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    minlength: 3,
    required: true
  },
  contact: {
    type: String,
    required: true,

  },
  picture: {
    type: String,

  },
});



const Ad = mongoose.model('ad', adSchema);
module.exports = Ad;
