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

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('jobs', {
        jobs: jobs,
        social: social,
        recents: recents.slice((recents.length - 6)).reverse()
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

      if (!job) {
        return res.redirect('/page-not-found');
      }

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
         jobs: jobs.slice((jobs.length - 3)).reverse()
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

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('jobs', {
        jobs: searchResult.reverse(),
        social: social
      });
    } catch (err) {
      next(err)
    }
  }

}
