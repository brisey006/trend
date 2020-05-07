const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  description: String,
  location: String,
  company: String,
  type: String,
  date: String,
  salary: String,
  image: String,
  cells: Array,
  duties: Array,
  skills: Array,
  views: Number,
  period: String,
  mobile: String,
  email: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String
});

module.exports = mongoose.model('Job', schema);
