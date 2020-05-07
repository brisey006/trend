const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  about: {
    type: String
  },
  profile_image: {
    type: String
  },
  institution: {
    type: String
  },
  cell: {
    type: String
  },
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
  is_trender: Number,
  email: {
    type: String,
    required: true
  },
  password_reset: String,
  password: {
    type: String,
    required: true
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article'
    }
  ]
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(candidatePassword) {
    if(this.password != null) {
        return bcrypt.compareSync(candidatePassword, this.password);
    } else {
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);
