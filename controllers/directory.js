const User = require('../models/user');
const Comments = require('../models/comment');
const Dir = require('../models/directory');
const Article = require('../models/article');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const fs = require('fs');

module.exports = {
  getDirectories: async (req, res, next) => {
      try {
        const directories = await Dir.find({});
        const recents = await Dir.find({});

        const socials = await Social.find({});
        var social;

        for (var i = 0; i < socials.length; i++) {
          social = socials[i]
        }

        res.render('directories', {
          dirs: directories.reverse(),
          social: social,
          recents: recents.reverse()
        });
      } catch (err) {
        next(err)
      }
  },

  getDir: async (req, res, next) => {
    try {
      const dirId = req.params.id;
      const dir = await Dir.findById(dirId);
      const dirs = await Dir.find({});

      if (!dir) {
        return res.redirect('/page-not-found');
      }

      dir.views++;
      await dir.save();

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('dir-single',
       {
         dir: dir,
         social: social,
         dirs: dirs.slice((dirs.length - 3)).reverse()
        }
      );
    } catch (err) {
      next(err)
    }
  },

  searchDir: async (req, res, next) => {
    try {
      const directories = await Dir.find({});
      const searchName = req.body.name;
      const searchLocation = req.body.location;

      var searchResult = [];
      for (var i = 0; i < directories.length; i++) {
        if (directories[i].name.toLowerCase().includes(searchName.toLowerCase()) && directories[i].location.toLowerCase().includes(searchLocation.toLowerCase())) {
          searchResult.push(directories[i])
        }
      }

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('directories', {
        dirs: searchResult.reverse(),
        social: social
      });
    } catch (err) {
      next(err)
    }
  },

  /*Admin Upload */
  getDirAdd: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('dir', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  uploadDir: async (req, res, next) => {
   try {
     const {name, location,description, facebook, instagram, twitter, linkedin, website} = req.body;

     var cells = req.body.cells.split('#');
     var emails = req.body.emails.split('#');
     var services = req.body.services.split('#');

     const views = 0;
     const date = Date.now();
     const created_at = new Date(date).toDateString();

     const dir = new Dir({
       name: name,
       location: location,
       description: description,
       image: req.file.filename,
       facebook: facebook,
       instagram: instagram,
       twitter: twitter,
       linkedin: linkedin,
       cells: cells,
       emails: emails,
       website: website,
       date: created_at,
       views: views,
       services: services
     });

     await dir.save();

     res.redirect('back')
   } catch (err) {
     next(err)
   }
  }

}
