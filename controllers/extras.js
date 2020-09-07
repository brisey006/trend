const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Article = require('../models/article');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const fs = require('fs');

module.exports = {
  getAdPrice: async (req, res, next) => {
    try {
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('ad-pricing', {
        social: social
      });
    } catch (err) {
      next(err)
    }
  },

  getError: async (req, res, next) => {
    try {
      res.render('404');
    } catch (err) {
      next(err)
    }
  },

  getError2: async (req, res, next) => {
    try {
      res.render('500');
    } catch (err) {
      next(err)
    }
  },

  getContact: async (req, res, next) => {
    try {
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      /*End Form Handler*/
      res.render('contact', {
        social: social
      });
    } catch (err) {
      next(err)
    }
  },

  contactPost: async (req, res, next) => {
    try {
      var transporter = nodemailer.createTransport({
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
      })

      var mailOptions = {
          from: req.body.email, // listed in rfc822 message header
          to: 'trendingnhasi@gmail.com', // listed in rfc822 message header
          subject: req.body.subject,
          text: `${req.body.firstname} ${req.body.lastname} \n\n Email: ${req.body.email} | Phone: ${req.body.cell} send a new message, \n\n ${req.body.message}`
      }

      transporter.sendMail(mailOptions, function (err, res) {
          if(err){
              return res.redirect('back');
          }
      })

      res.render('thanks');
    } catch (err) {
      next(err)
    }
  },

  getTerms: async (req, res, next) => {
    try {
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('terms', {
        social: social
      });
    } catch (err) {
      next(err)
    }
  }
}
