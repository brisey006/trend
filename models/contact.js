const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  subject: {
    type: String
  },
  email: {
    type: String
  },
  cell: {
    type: String
  },
  message: {
    type: String
  }
  });

module.exports = mongoose.model('Contact', schema);
