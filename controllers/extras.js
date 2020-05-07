const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Article = require('../models/article');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const Contact = require('../models/contact');
const fs = require('fs');

module.exports = {
  getAdPrice: async (req, res, next) => {
    try {
      const related = await Article.find({});
      const articles = await Article.find({});

      /*Tiles */
      var world = [];
      var covid = [];
      var travel = [];
      var sport = [];
      var fashion = [];
      var technology = [];
      var science = [];
      var lifestyle = [];
      var politics = [];
      var entertainment = [];
      var business = [];
      var culture = [];
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].tile == 'World') {
          world.push(articles[i]);
        }
        else if (articles[i].tile == 'Sport') {
          sport.push(articles[i]);
        }
        else if (articles[i].tile == 'Fashion') {
          fashion.push(articles[i]);
        }
        else if (articles[i].tile == 'Technology') {
          technology.push(articles[i]);
        }
        else if (articles[i].tile == 'LifeStyle') {
          lifestyle.push(articles[i]);
        }
        else if (articles[i].tile == 'Politics') {
          politics.push(articles[i]);
        }
        else if (articles[i].tile == 'Business') {
          business.push(articles[i]);
        }
        else if (articles[i].tile == 'Entertainment') {
          entertainment.push(articles[i]);
        }
        else if (articles[i].tile == 'Covid') {
          covid.push(articles[i]);
        }
        else if (articles[i].tile == 'Travel') {
          travel.push(articles[i]);
        }
        else if (articles[i].tile == 'Science') {
          science.push(articles[i]);
        }
        else if (articles[i].tile == 'Culture') {
          culture.push(articles[i]);
        }
      }
      /*End Titles*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('ad-pricing', {
        related: related.slice((related.length - 8)).reverse(),
        culture: culture.slice((culture.length - 3)).reverse(),
        science: science.slice((science.length - 3)).reverse(),
        travel: travel.slice((travel.length - 3)).reverse(),
        covid: covid.slice((covid.length - 3)).reverse(),
        world: world.slice((world.length - 3)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 3)).reverse(),
        sport: sport.slice((sport.length - 3)).reverse(),
        technology: technology.slice((technology.length - 3)).reverse(),
        fashion: fashion.slice((fashion.length - 3)).reverse(),
        politics: politics.slice((politics.length - 3)).reverse(),
        business: business.slice((business.length - 3)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 3)).reverse(),
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
      const related = await Article.find({});
      const articles = await Article.find({});

      /*Tiles */
      var world = [];
      var covid = [];
      var travel = [];
      var sport = [];
      var fashion = [];
      var technology = [];
      var science = [];
      var lifestyle = [];
      var politics = [];
      var entertainment = [];
      var business = [];
      var culture = [];
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].tile == 'World') {
          world.push(articles[i]);
        }
        else if (articles[i].tile == 'Sport') {
          sport.push(articles[i]);
        }
        else if (articles[i].tile == 'Fashion') {
          fashion.push(articles[i]);
        }
        else if (articles[i].tile == 'Technology') {
          technology.push(articles[i]);
        }
        else if (articles[i].tile == 'LifeStyle') {
          lifestyle.push(articles[i]);
        }
        else if (articles[i].tile == 'Politics') {
          politics.push(articles[i]);
        }
        else if (articles[i].tile == 'Business') {
          business.push(articles[i]);
        }
        else if (articles[i].tile == 'Entertainment') {
          entertainment.push(articles[i]);
        }
        else if (articles[i].tile == 'Covid') {
          covid.push(articles[i]);
        }
        else if (articles[i].tile == 'Travel') {
          travel.push(articles[i]);
        }
        else if (articles[i].tile == 'Science') {
          science.push(articles[i]);
        }
        else if (articles[i].tile == 'Culture') {
          culture.push(articles[i]);
        }
      }
      /*End Titles*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      /*Start Form Handler*/



      /*End Form Handler*/
      res.render('contact', {
        related: related.slice((related.length - 8)).reverse(),
        culture: culture.slice((culture.length - 3)).reverse(),
        science: science.slice((science.length - 3)).reverse(),
        travel: travel.slice((travel.length - 3)).reverse(),
        covid: covid.slice((covid.length - 3)).reverse(),
        world: world.slice((world.length - 3)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 3)).reverse(),
        sport: sport.slice((sport.length - 3)).reverse(),
        technology: technology.slice((technology.length - 3)).reverse(),
        fashion: fashion.slice((fashion.length - 3)).reverse(),
        politics: politics.slice((politics.length - 3)).reverse(),
        business: business.slice((business.length - 3)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 3)).reverse(),
        social: social
      });
    } catch (err) {
      next(err)
    }
  },

  contactPost: async (req, res, next) => {
    try {
      const {firstname, lastname, email, cell, subject, message} = req.body;

      const contact = new Contact({
        firstname: firstname,
        lastname: lastname,
        email: email,
        cell: cell,
        subject: subject,
        message: message
      });

      await contact.save();

      res.render('thanks');
    } catch (err) {
      next(err)
    }
  },

  getTerms: async (req, res, next) => {
    try {
      const related = await Article.find({});
      const articles = await Article.find({});

      /*Tiles */
      var world = [];
      var covid = [];
      var travel = [];
      var sport = [];
      var fashion = [];
      var technology = [];
      var science = [];
      var lifestyle = [];
      var politics = [];
      var entertainment = [];
      var business = [];
      var culture = [];
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].tile == 'World') {
          world.push(articles[i]);
        }
        else if (articles[i].tile == 'Sport') {
          sport.push(articles[i]);
        }
        else if (articles[i].tile == 'Fashion') {
          fashion.push(articles[i]);
        }
        else if (articles[i].tile == 'Technology') {
          technology.push(articles[i]);
        }
        else if (articles[i].tile == 'LifeStyle') {
          lifestyle.push(articles[i]);
        }
        else if (articles[i].tile == 'Politics') {
          politics.push(articles[i]);
        }
        else if (articles[i].tile == 'Business') {
          business.push(articles[i]);
        }
        else if (articles[i].tile == 'Entertainment') {
          entertainment.push(articles[i]);
        }
        else if (articles[i].tile == 'Covid') {
          covid.push(articles[i]);
        }
        else if (articles[i].tile == 'Travel') {
          travel.push(articles[i]);
        }
        else if (articles[i].tile == 'Science') {
          science.push(articles[i]);
        }
        else if (articles[i].tile == 'Culture') {
          culture.push(articles[i]);
        }
      }
      /*End Titles*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('terms', {
        related: related.slice((related.length - 8)).reverse(),
        culture: culture.slice((culture.length - 3)).reverse(),
        science: science.slice((science.length - 3)).reverse(),
        travel: travel.slice((travel.length - 3)).reverse(),
        covid: covid.slice((covid.length - 3)).reverse(),
        world: world.slice((world.length - 3)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 3)).reverse(),
        sport: sport.slice((sport.length - 3)).reverse(),
        technology: technology.slice((technology.length - 3)).reverse(),
        fashion: fashion.slice((fashion.length - 3)).reverse(),
        politics: politics.slice((politics.length - 3)).reverse(),
        business: business.slice((business.length - 3)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 3)).reverse(),
        social: social
      });
    } catch (err) {
      next(err)
    }
  }
}
