const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
 function( req, email,password, done){
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 6});
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg)
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false, {message: "Email Adress is already in use."});
    }

    const firstname = req.body.firstname;
    const cell = req.body.cell;
    const lastname = req.body.lastname;
    const institution = req.body.institution;
    const facebook = req.body.facebook;
    const instagram = req.body.instagram;
    const twitter = req.body.twitter;
    const linkedin = req.body.linkedin;
    const password_reset = req.body.password;

    var newUser = new User();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.profile_image;
      newUser.about;
      newUser.is_trender = 0;
      newUser.institution = institution;
      newUser.cell = cell;
      newUser.facebook = facebook;
      newUser.instagram = instagram;
      newUser.twitter = twitter;
      newUser.linkedin = linkedin;
      newUser.articles;
      newUser.password_reset = password_reset;
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err, result) => {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      })
  })
}));

//Sign In

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg)
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: "User Not Found"});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: "Wrong Password"});
    }
    return done(null, user);
  })
}));
