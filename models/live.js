const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  image: String
  });

module.exports = mongoose.model('Live', schema);
