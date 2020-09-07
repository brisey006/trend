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

        const socials = await Social.find({});
        var social;

        for (var i = 0; i < socials.length; i++) {
          social = socials[i]
        }

        res.render('accommodation', {
          houses: houses.reverse(),
          social: social,
          recents: recents.reverse()
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

      if (!house) {
        return res.redirect('/page-not-found');
      }

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
         houses: houses.slice((houses.length - 3)).reverse()
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

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('accommodation', {
        houses: searchResult.reverse(),
        social: social
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
