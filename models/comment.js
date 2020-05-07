const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String
  },
  image: String,
  comment: {
    type: String
  },
  date: String
  });

module.exports = mongoose.model('Comments', schema);
