const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  link: {
    type: String
  },
  date: String,
  image: String
  });

module.exports = mongoose.model('Advert', schema);
