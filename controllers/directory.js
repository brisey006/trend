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

        res.render('directories', {
          dirs: directories.reverse(),
          social: social,
          recents: recents.reverse(),
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

  getDir: async (req, res, next) => {
    try {
      const dirId = req.params.id;
      const dir = await Dir.findById(dirId);
      const dirs = await Dir.find({});
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
         dirs: dirs.slice((dirs.length - 3)).reverse(),
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

      res.render('directories', {
        dirs: searchResult.reverse(),
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
