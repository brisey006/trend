const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  description: String,
  location: String,
  date: String,
  image: String,
  images: Array,
  cells: Array,
  emails: Array,
  features: Array,
  services: Array,
  value: String,
  type: String,
  views: Number,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String
});

module.exports = mongoose.model('Accommodation', schema);
