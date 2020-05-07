const User = require('../models/user');
const Comments = require('../models/comment');
const Dir = require('../models/directory');
const Article = require('../models/article');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const Accommodation = require('../models/accommodation');
const fs = require('fs');

module.exports = {
  getHouses: async (req, res, next) => {
      try {
        const houses = await Accommodation.find({});
        const recents = await Accommodation.find({});

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

        res.render('accommodation', {
          houses: houses.reverse(),
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

  getHouse: async (req, res, next) => {
    try {
      const houseId = req.params.id;
      const house = await Accommodation.findById(houseId);
      const houses = await Accommodation.find({});
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

      house.views++;
      await house.save();

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('accommodation-single',
       {
         house: house,
         social: social,
         culture: culture.slice((culture.length - 3)).reverse(),
         science: science.slice((science.length - 3)).reverse(),
         travel: travel.slice((travel.length - 3)).reverse(),
         covid: covid.slice((covid.length - 3)).reverse(),
         houses: houses.slice((houses.length - 3)).reverse(),
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

  searchHouse: async (req, res, next) => {
    try {
      const houses = await Accommodation.find({});
      const searchName = req.body.name;
      const searchLocation = req.body.location;

      var searchResult = [];
      for (var i = 0; i < houses.length; i++) {
        if (houses[i].name.toLowerCase().includes(searchName.toLowerCase()) && houses[i].location.toLowerCase().includes(searchLocation.toLowerCase())) {
          searchResult.push(houses[i])
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

      res.render('accommodation', {
        houses: searchResult.reverse(),
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
  getHouseAdd: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('acco', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  uploadHouse: async (req, res, next) => {
   try {
     const {name, value, type, location,description, facebook, instagram, twitter, linkedin, website} = req.body;

     var cells = req.body.cells.split('#');
     var emails = req.body.emails.split('#');
     var services = req.body.services.split('#');
     var features = req.body.features.split('#');

     const views = 0;
     const date = Date.now();
     const created_at = new Date(date).toDateString();

     const images = [];
     var photos = req.files;

     for (var i = 0; i < photos.length; i++) {
       images.push(photos[i].filename);
     }

     const house = new Accommodation({
       name: name,
       location: location,
       description: description,
       image: req.files[0].filename,
       images: images,
       facebook: facebook,
       instagram: instagram,
       twitter: twitter,
       linkedin: linkedin,
       cells: cells,
       emails: emails,
       website: website,
       date: created_at,
       views: views,
       value: value,
       type: type,
       features: features,
       services: services
     });

     await house.save();

     res.redirect('back')
   } catch (err) {
     next(err)
   }
  }

}
