const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Article = require('../models/article');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const fs = require('fs');

module.exports = {
  getJobs: async (req, res, next) => {
    try {
      const jobs = await Job.find({});
      const recents = await Job.find({});

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

      res.render('jobs', {
        jobs: jobs,
        social: social,
        recents: recents.slice((recents.length - 6)).reverse(),
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
        entertainment: entertainment.slice((entertainment.length - 3)).reverse()
      });
    } catch (err) {
      next(err)
    }
  },

  getJob: async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      const jobs = await Job.find({});
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

      job.views++;
      await job.save();
      res.render('job-single',
       {
         job: job,
         social: social,
         jobs: jobs.slice((jobs.length - 3)).reverse(),
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
         entertainment: entertainment.slice((entertainment.length - 3)).reverse()
        }
      );
    } catch (err) {
      next(err)
    }
  },

  /*Admin Upload */
  getJobAdd: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('job', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  uploadJob: async (req, res, next) => {
   try {
     const {title, company,location, salary, description, facebook, instagram, twitter, linkedin, mobile, email, website, type, period} = req.body;

     const views = 0;
     const date = Date.now();
     const created_at = new Date(date).toDateString();

     const job = new Job({
       title: title,
       company: company,
       location: location,
       salary: salary,
       description: description,
       image: req.file.filename,
       facebook: facebook,
       instagram: instagram,
       twitter: twitter,
       linkedin: linkedin,
       mobile: mobile,
       email: email,
       website: website,
       date: created_at,
       views: views,
       type: type,
       period: period
     });

     await job.save();

     res.redirect('back')
   } catch (err) {
     next(err)
   }
  },

  searchJob: async (req, res, next) => {
    try {
      const jobs = await Job.find({});
      const searchName = req.body.name;
      const searchLocation = req.body.location;

      var searchResult = [];
      for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].title.toLowerCase().includes(searchName.toLowerCase()) && jobs[i].location.toLowerCase().includes(searchLocation.toLowerCase())) {
          searchResult.push(jobs[i])
        }
      }

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

      res.render('jobs', {
        jobs: searchResult.reverse(),
        social: social,
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
        entertainment: entertainment.slice((entertainment.length - 3)).reverse()
      });
    } catch (err) {
      next(err)
    }
  }

}
