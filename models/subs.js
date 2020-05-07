const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String
  },
  date: String
  });

module.exports = mongoose.model('Subscriptions', schema);
