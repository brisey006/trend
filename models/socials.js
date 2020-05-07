const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  linkedin: {
    type: String
  },
  youtube: {
    type: String
  },
  email: {
    type: String
  },
  hq: {
    type: String
  },
  cells: Array
  });

module.exports = mongoose.model('Socials', schema);
