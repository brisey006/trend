const User = require('../models/user');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const fs = require('fs');

module.exports = {
  getReset: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      var messages = req.flash('error');
      var info = req.flash('info');
      res.render('forgot',{
        info: info,
        hasInfo: info.length>0,
        messages: messages,
        hasErrors: messages.length>0
      });
    } catch (err) {
      next(err)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/reset-password');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },

        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
            type: "OAuth2",
            user: 'mbrisisthismyhood@gmail.com',
            clientId: '289197539726-07e7cr32ar0qkqheehc6t2fqiu7e5k53.apps.googleusercontent.com',
            clientSecret: 'e9SNVogyoFVJ0P34j5FeNMCO',
            refreshToken: '1//044n3hFB5naFKCgYIARAAGAQSNwF-L9IrWUZBZs9O3g92H-H2BK9QLllWCd-XcMDEGSTv30tmnMT7yvjWaAKcC-hYzPB0lQw0V3w'
          }
          });
          var mailOptions = {
            to: user.email,
            from: 'trendingnhasi@gmail.com',
            subject: 'Trending Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
         res.redirect('/reset-password');
      });

    } catch (err) {
      next(err)
    }
  },

  reset: async (req, res, next) => {
    try {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/reset-password');
        }

        var messages = req.flash('error');
        var success = req.flash('success');

        res.render('reset', {
          token: req.params.token,
          user: req.user,
          success: success,
          hasSuccess: success.length>0,
          messages: messages,
          hasErrors: messages.length>0
        });
      });
    } catch (err) {
      next(err)
    }
  },

  resetDone: async (req, res, next) => {
    try {
      async.waterfall([
        function(done) {
          User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              req.flash('error', 'Password reset token is invalid or has expired.');
              return res.redirect('back');
            }

            user.password = user.encryptPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
            type: "OAuth2",
            user: 'mbrisisthismyhood@gmail.com',
            clientId: '289197539726-07e7cr32ar0qkqheehc6t2fqiu7e5k53.apps.googleusercontent.com',
            clientSecret: 'e9SNVogyoFVJ0P34j5FeNMCO',
            refreshToken: '1//044n3hFB5naFKCgYIARAAGAQSNwF-L9IrWUZBZs9O3g92H-H2BK9QLllWCd-XcMDEGSTv30tmnMT7yvjWaAKcC-hYzPB0lQw0V3w'
          }
          });
          var mailOptions = {
            to: user.email,
            from: 'trendingnhasi@gmail.com',
            subject: 'Your password has been changed',
            text: `Hello, ${user.firstname} ${user.lastname} \n\n` +
              'This is a confirmation that the password for your account ' + user.email + ' on trendingzw.com has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('success', 'Success! Your password has been changed.');
            done(err);
          });
        }
      ], function(err) {
        res.redirect('/user/profile');
      });
    } catch (err) {
      next(err)
    }
  }
}
