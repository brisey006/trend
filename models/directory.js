const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  description: String,
  location: String,
  date: String,
  image: String,
  cells: Array,
  emails: Array,
  services: Array,
  views: Number,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String
});

module.exports = mongoose.model('Directory', schema);
