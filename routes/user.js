const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);
const passport = require('passport');
const User = require('../models/user');
const Article = require('../models/article');

router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const articleIds = user.articles;
    const articles = [];
    for (var i = 0; i < articleIds.length; i++) {
      const article = await Article.findById(articleIds[i]);
      articles.push(article);
    }


    res.render('profile',
         {
           profile: user,
           articles: articles.reverse()
         }
       );
 } catch (error) {
    next(error)
  }
});


router.get('/logout',isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/')
});

router.get('/password-recover', (req, res, next) => {
  res.render('password-recover')
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
})

router.get('/signup', (req, res, next) => {
  var messages = req.flash('error')
  res.render('signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect:'/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  var messages = req.flash('error')
  res.render('signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect:'/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/signin')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/profile')
}
