const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Dir = require('../models/directory');
const Article = require('../models/article');
const Subscription = require('../models/subs');
const Trending = require('../models/trending');
const Social = require('../models/socials');
const Contact = require('../models/contact');
const Live = require('../models/live');
const Accommodation = require('../models/accommodation');
const fs = require('fs');

module.exports = {
  getAdmin: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.render('index', {
        users: users.reverse()
      });
    } catch (err) {
      next(err)
    }
  },

  getAdminPasswords: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.render('passwords', {
        users: users
      });
    } catch (err) {
      next(err)
    }
  },

  getSubs: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const subscribers = await Subscription.find({});
      res.render('subs', {
        subscribers: subscribers,
        profile: user
      });
    } catch (err) {
      next(err)
    }
  },

  getCustomerCare: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const contact = await Contact.find({});
      res.render('customer', {
        contact: contact,
        profile: user
      });
    } catch (err) {
      next(err)
    }
  },
  /* Begin Trending Upload  */

  getTrendingUpload: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId)
      res.render('upload-trending', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  uploadTrending: async (req, res, next) => {
   try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {tag, featured, tile,category, title, description, video_url} = req.body;

     const images = [];
     var photos = req.files;

     for (var i = 0; i < photos.length; i++) {
       images.push(photos[i].filename);
     }

     const views = 0;
     const comments_count = 0;
     const date = Date.now();
     const created_at = new Date(date).toDateString();
     const author_name = user.firstname + " " + user.lastname;

     const article = new Article({
       tag: tag,
       tile: tile,
       featured: featured,
       category: category,
       title: title,
       description: description,
       news_cover: req.files[0].filename,
       video_url: video_url,
       news_images: images,
       date: created_at,
       views: views,
       author: userId,
       author_name: author_name,
       author_image: user.profile_image,
       comments_count: comments_count
     });

     article.comments;
     await article.save();
     user.articles.push(article);
     await user.save();

     res.redirect('/user/profile')
   } catch (err) {
     next(err)
   }
  },

  /*End Trending Upload  */

  getEditProfile: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId)
       res.render('edit-profile', {profile: user});
     } catch (err) {
       next(err)
     }
   },

   editProfile: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId);

       const { about, firstname, lastname, institution, cell, facebook, instagram, twitter, linkedin } = req.body;
       user.about = about;
       user.firstname = firstname;
       user.lastname = lastname;
       user.institution = institution;
       user.cell = cell;
       user.facebook = facebook;
       user.instagram = instagram;
       user.twitter = twitter;
       user.linkedin = linkedin;

       await user.save();
       res.redirect('/user/profile')
     } catch (err) {
       next(err)
     }
   },
  /* Outa Zone */
  getEditProfileImage: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId)
       res.render('edit-profile-image', {profile: user});
     } catch (err) {
       next(err)
     }
   },

   editProfileImage: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId);

       if (user.profile_image) {
         const imgpath = "./public/uploads/" + user.profile_image;
         if (fs.existsSync(imgpath)) {
          fs.unlinkSync(imgpath);
         }
       }

       user.profile_image = req.file.filename;

       await user.save();
       res.redirect('/user/profile')
     } catch (err) {
       next(err)
     }
   },

   deleteArticle: async (req, res, next) => {
     try {
       const articleId = req.params.id;
       const article = await Article.findById(articleId);

	     const userId = req.session.passport.user;
	     const user = await User.findById(userId);
	     var arr = user.articles;

	     for (var i = 0; i < arr.length; i++) {
	       if (arr[i] == articleId) {
	         arr.splice(i, 1);
	         await user.save();
	       }
	     }

       function deleteFiles(files, callback) {
           var i = files.length;
           files.forEach((filepath) => {
             fs.unlink(filepath, function(err) {
               i--;
               if (err) {
                 callback(err);
                 return;
               }
               else if (i <= 0) {
                 callback(null);
               }
             });
           });
         }

         var conts = article.comments;
         var contsImages = [];
         var contsIds = [];
         for (var i = 0; i < conts.length; i++) {
           var cont = await Comments.findById(conts[i]);
           contsImages.push(cont.image);
           contsIds.push(cont._id);
         }

         var merged = [].concat.apply([], contsImages);
         var mergedIds = [].concat.apply([], contsIds);
         var files = [];

         for (var i = 0; i < merged.length; i++) {
           var file = "./public/uploads/" + merged[i];
           files.push(file);
         }

         deleteFiles(files, function(err) {
           if (err) {
             console.log(err);
           }
           else {
             console.log("Success");
           }
         });

         var articleImgs = article.news_images;
         var imgFiles = [];
         for (var i = 0; i < articleImgs.length; i++) {
           var file = "./public/uploads/" + articleImgs[i];
           imgFiles.push(file);
         }

         deleteFiles(imgFiles, function(err) {
           if (err) {
             console.log(err);
           }
           else {
             console.log("Success");
           }
         });

         for (var i = 0; i < mergedIds.length; i++) {
           await Comments.findByIdAndDelete(mergedIds[i]);
         }

         await Article.findByIdAndDelete(articleId);
       res.redirect('/user/profile')
     } catch (err) {
       next(err)
     }
   },
  /* Outa Zone */

  getAdminUpload: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('admin-upload', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  adminUploadTrending: async (req, res, next) => {
   try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {tag,featured, tile,category, title, description, video_url} = req.body;

     const images = [];
     var photos = req.files;

     for (var i = 0; i < photos.length; i++) {
       images.push(photos[i].filename);
     }

     const views = 0;
     const comments_count = 0;
     const date = Date.now();
     const created_at = new Date(date).toDateString();
     const author_name = user.firstname + " " + user.lastname;

     const article = new Article({
       tag: tag,
       tile: tile,
       category: category,
       title: title,
       featured: featured,
       description: description,
       news_cover: req.files[0].filename,
       video_url: video_url,
       news_images: images,
       date: created_at,
       views: views,
       author: userId,
       author_name: author_name,
       author_image: user.profile_image,
       comments_count: comments_count
     });

     article.comments;
     await article.save();
     user.articles.push(article);
     await user.save();

     res.redirect('back')
   } catch (err) {
     next(err)
   }
  },
  /*End Admin Upload*/

  activateTrender: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      user.is_trender = 1;
      await user.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  disableTrender: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      user.is_trender = 0;
      await user.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  getSocials: async (req, res, next) => {
    try {
      const socials = await Social.find({});
      var social;
      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }
      res.render('socials', {social: social});
    } catch (err) {
      next(err)
    }
  },

  uploadSocials: async (req, res, next) => {
    try {
      const {facebook, twitter, linkedin, instagram, email, youtube, hq} = req.body;
      var cells = req.body.cells.split('#');

      const socials = new Social({
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin,
        instagram: instagram,
        email: email,
        youtube: youtube,
        hq: hq,
        cells: cells
      });

      await socials.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  updateSocials: async (req, res, next) => {
    try {
      const {facebook, twitter, linkedin, instagram, email, youtube,hq} = req.body;
      var cells = req.body.cells.split('#');
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

        social.facebook = facebook;
        social.twitter = twitter;
        social.linkedin = linkedin;
        social.instagram = instagram;
        social.email = email;
        social.youtube = youtube;
        social.hq = hq;
        social.cells = cells;


      await social.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  getLive: async (req, res, next) => {
    try {
      const lives =  await Live.find({});
      var live;

      for (var i = 0; i < lives.length; i++) {
        live = lives[i]
      }

      res.render('live', {live: live});
    } catch (err) {
      next(err)
    }
  },

  uploadLive: async (req, res, next) => {
    try {
      const {url, title} = req.body;

      const live = new Live({
        url: url,
        title: title,
        image: req.file.filename
      });

      await live.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  updateLive: async (req, res, next) => {
    try {
      const {url, title} = req.body;

      const lives =  await Live.find({});
      var live;

      for (var i = 0; i < lives.length; i++) {
        live = lives[i]
      }

        live.url = url;
        live.title = title;
        live.image = req.file.filename;

      await live.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  getJobs: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const jobs = await Job.find({});
      res.render('admin-jobs', {jobs: jobs.reverse(), profile: user});
    } catch (err) {
      next(err)
    }
  },

  deleteJob: async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);

      const imgpath = "./public/uploads/" + job.image;
      fs.unlinkSync(imgpath);

      await Job.findByIdAndDelete(jobId);

      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  getDirectories: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);
      const dirs = await Dir.find({});

      res.render('admin-dirs', {dirs: dirs.reverse(), profile: user});
    } catch (err) {
      next(err)
    }
  },

  deleteDir: async (req, res, next) => {
    try {
      const dirId = req.params.id;
      const dir = await Dir.findById(dirId);

      const imgpath = "./public/uploads/" + dir.image;
      fs.unlinkSync(imgpath);

      await Dir.findByIdAndDelete(dirId);

      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  getAcco: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);
      const houses = await Accommodation.find({});

      res.render('admin-acco', {houses: houses.reverse(), profile: user});
    } catch (err) {
      next(err)
    }
  },

  deleteHouse: async (req, res, next) => {
    try {
      const houseId = req.params.id;
      const house = await Accommodation.findById(houseId);

      function deleteFiles(files, callback) {
          var i = files.length;
          files.forEach((filepath) => {
            fs.unlink(filepath, function(err) {
              i--;
              if (err) {
                callback(err);
                return;
              }
              else if (i <= 0) {
                callback(null);
              }
            });
          });
        }

        var articleImgs = house.images;
        var imgFiles = [];
        for (var i = 0; i < articleImgs.length; i++) {
          var file = "./public/uploads/" + articleImgs[i];
          imgFiles.push(file);
        }

        deleteFiles(imgFiles, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success");
          }
        });

      await Accommodation.findByIdAndDelete(houseId);

      res.redirect('back');
    } catch (err) {
      next(err)
    }
  }

}
