const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const upload = require('../upload');
const ArticleController = require('../controllers/articles');
const ExtraController = require('../controllers/extras');
const JobController = require('../controllers/jobs');
const AdminController = require('../controllers/admin');
const DirectoryController = require('../controllers/directory');
const AccommodationController = require('../controllers/accommodation');
const UserController = require('../controllers/user');

/*Start Trending Articles*/
router.route('/')
  .get(ArticleController.index)

router.route('/reset-password')
.get(UserController.getReset)
.post(UserController.resetPassword)

router.route('/reset/:token')
.get(UserController.reset)
.post(UserController.resetDone)

router.route('/trending/:id')
  .get(ArticleController.getTrendingArticle)
  .post(ArticleController.addTrendingComment)

router.route('/trending-news')
  .get(ArticleController.getArticles)
  .post(ArticleController.searchArticles)

router.route('/trending-search-results')
  .get(ArticleController.getArticles)
  .post(ArticleController.searchArticles)

router.route('/trender/:id')
  .get(ArticleController.getAuthor)

router.route('/trending-authors')
  .get(ArticleController.getAuthors)

router.route('/trending-tag/:token')
  .get(ArticleController.getTags)

/*End Trending Articles*/

/*Start Tile Routes*/
router.route('/world')
  .get(ArticleController.getTiles)

router.route('/covid-19')
  .get(ArticleController.getTiles)

router.route('/travel')
  .get(ArticleController.getTiles)

router.route('/sports')
  .get(ArticleController.getTiles)

router.route('/fashion')
  .get(ArticleController.getTiles)

router.route('/technology')
  .get(ArticleController.getTiles)

router.route('/science')
  .get(ArticleController.getTiles)

router.route('/lifestyle')
  .get(ArticleController.getTiles)

router.route('/business')
  .get(ArticleController.getTiles)

router.route('/politics')
  .get(ArticleController.getTiles)

router.route('/entertainment')
  .get(ArticleController.getTiles)

router.route('/culture')
  .get(ArticleController.getTiles)
/*End Tiles*/

/*Extras*/
router.route('/page-not-found')
  .get(ExtraController.getError)

router.route('/internal-server-error')
  .get(ExtraController.getError2)

router.route('/trending-adverts')
  .get(ExtraController.getAdPrice)

router.route('/contact')
  .get(ExtraController.getContact)
  .post(ExtraController.contactPost)

router.route('/terms-and-conditions')
  .get(ExtraController.getTerms)
/*End Extras */

/*Trending Jobs*/
router.route('/trending-job-listings')
  .get(JobController.getJobs)
  .post(JobController.searchJob)

router.route('/job-listing/:id')
  .get(JobController.getJob)

router.route('/admin/trend/upload-job')
  .get(isLoggedIn,JobController.getJobAdd)
  .post(upload.single('image'),JobController.uploadJob)
/*End Trending Jobs*/

/*Trending Directories*/
router.route('/trending-directories')
  .get(DirectoryController.getDirectories)
  .post(DirectoryController.searchDir)

router.route('/directory-listing/:id')
  .get(DirectoryController.getDir)

router.route('/admin/trend/upload-directory')
  .get(isLoggedIn,DirectoryController.getDirAdd)
  .post(upload.single('image'),DirectoryController.uploadDir)
/*End Trending Directories*/

/*Trending Accommodation*/
router.route('/trending-accommodation')
  .get(AccommodationController.getHouses)
  .post(AccommodationController.searchHouse)

router.route('/accommodation-listing/:id')
  .get(AccommodationController.getHouse)

router.route('/admin/trend/upload-accommodation')
  .get(isLoggedIn,AccommodationController.getHouseAdd)
  .post(upload.array('images'),AccommodationController.uploadHouse)
/*End Trending Accommodation*/

/*Trending Admin Dashboards*/
router.route('/mbrisis/admin/upload-trending')
  .get(isLoggedIn,AdminController.getTrendingUpload)
  .post(upload.array('images'), AdminController.uploadTrending)

router.route('/mbrisis/article/:id')
  .get(isLoggedIn,AdminController.getTrendingArticle)
  //.post(upload.array('images'), AdminController.editTrending)

router.route('/edit-profile')
  .get(isLoggedIn, AdminController.getEditProfile)
  .post(AdminController.editProfile)

router.route('/edit-profile-image')
  .get(isLoggedIn, AdminController.getEditProfileImage)
  .post(upload.single('image'),AdminController.editProfileImage)

router.route('/mbrisis/admin/delete-article/:id')
  .get(isLoggedIn, AdminController.deleteArticle)

router.route('/mbrisis/admin/delete-job/:id')
  .get(isLoggedIn, AdminController.deleteJob)

router.route('/mbrisis/admin/delete-advert/:id')
  .get(isLoggedIn, AdminController.deleteAdvert)

router.route('/mbrisis/admin/delete-dir/:id')
  .get(isLoggedIn, AdminController.deleteDir)

router.route('/mbrisis/admin/delete-accommodation/:id')
  .get(isLoggedIn, AdminController.deleteHouse)

router.route('/trend/admin/mbrisis')
  .get(isLoggedIn,AdminController.getAdmin)

router.route('/trend/admin/user_password_resets')
  .get(isLoggedIn,AdminController.getAdminPasswords)

router.route('/admin/trend/socials-upload')
  .get(isLoggedIn,AdminController.getSocials)
  .post(AdminController.uploadSocials)

router.route('/admin/trend/socials-update')
    .post(AdminController.updateSocials)

router.route('/admin/trend/live-upload')
  .get(isLoggedIn,AdminController.getLive)
  .post(upload.single('image'), AdminController.uploadLive)

router.route('/admin/trend/live-update')
    .post(upload.single('image'), AdminController.updateLive)

router.route('/admin/trend/subcribers')
  .get(isLoggedIn,AdminController.getSubs)

router.route('/admin/trend/upload-admin')
  .get(isLoggedIn,AdminController.getAdminUpload)
  .post(upload.single('image'), AdminController.adminUploadTrending)

router.route('/trend/admin/disable/:id')
  .get(AdminController.disableTrender)

router.route('/trend/admin/activate/:id')
  .get(AdminController.activateTrender)

router.route('/admin/trend/jobs')
  .get(isLoggedIn,AdminController.getJobs)

router.route('/admin/trend/adverts')
  .get(isLoggedIn,AdminController.getAdverts)

router.route('/admin/trend/directories')
  .get(isLoggedIn,AdminController.getDirectories)

router.route('/admin/trend/accommodation')
  .get(isLoggedIn,AdminController.getAcco)

router.route('/admin/trend/customer-care')
  .get(isLoggedIn,AdminController.getCustomerCare)
/*End Dashboards*/

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/signin')
 }

  function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}
