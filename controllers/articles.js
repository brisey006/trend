const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Article = require('../models/article');
const Subscription = require('../models/subs');
const Social = require('../models/socials');
const Trending = require('../models/trending');
const Live = require('../models/live');
const fs = require('fs');

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      const article = await Article.find({});
      const authors = await User.find({});
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

/*Start Trending*/

      var adverts = [];
      var fbi = [];
      var latest = [];
      var videos = [];
      var health = [];
      var weekly = [];
      var popular = [];
      var events = [];
      var breaking = [];
      var coronavirus = [];
      var food = [];
      for (var i = 0; i < article.length; i++) {
        if (article[i].category == "Advert") {
          adverts.push(article[i]);
        }
        else if (article[i].category == "Finance & Business") {
          fbi.push(article[i]);
        }
        else if (article[i].category == "Covid19") {
          coronavirus.push(article[i]);
        }
        else if (article[i].category == "Food") {
          food.push(article[i]);
        }
        else if (article[i].category == "Latest") {
          latest.push(article[i]);
        }
        else if (article[i].category == "Video") {
          videos.push(article[i]);
        }
        else if (article[i].category == "Health") {
          health.push(article[i]);
        }
        else if (article[i].category == "Weekly") {
          weekly.push(article[i]);
        }
        else if (article[i].category == "Popular") {
          popular.push(article[i]);
        }
        else if (article[i].category == "Events") {
          events.push(article[i]);
        }
        else if (article[i].category == "Breaking") {
          breaking.push(article[i]);
        }
      }

/*End Trending*/
      var trending = await Article.find({});

      for (var i = 0; i < trending.length; i++) {
        var user = await User.findById(trending[i].author);
        trending[i].author_name = user.firstname + " " + user.lastname;
        trending[i].author_image = user.profile_image;
      }

      for (var i = 0; i < weekly.length; i++) {
        var user = await User.findById(weekly[i].author);
        weekly[i].author_name = user.firstname + " " + user.lastname;
        weekly[i].author_image = user.profile_image;
      }

      const lives =  await Live.find({});
      var live;

      for (var i = 0; i < lives.length; i++) {
        live = lives[i]
      }

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }


      res.render('news', {
        articles: article.reverse(),
        trending: trending.slice((trending.length - 10)).reverse(),
        food: food.reverse(),
        topcorona: coronavirus.slice((coronavirus.length - 1)).reverse(),
        coronavirus: coronavirus.slice((coronavirus.length - 8),(coronavirus.length - 2)).reverse(),
        adverts: adverts.reverse(),
        fbiF: fbi.slice((fbi.length - 2)).reverse(),
        fbiS: fbi.slice((fbi.length - 5),(fbi.length - 2)),
        latestF: latest.slice(latest.length - 1),
        latestS: latest.slice((latest.length - 5), (latest.length - 1)).reverse(),
        breaking: breaking.reverse(),
        videos: videos.slice((videos.length - 9)).reverse(),
        health: health.reverse(),
        weekly: weekly.slice((weekly.length - 9)).reverse(),
        jobs: jobs.slice((jobs.length - 8)).reverse(),
        authors: users.slice((users.length - 3)).reverse(),
        popular: popular.reverse(),
        events: events.reverse(),
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
        social: social,
        live: live
      }
    );
  } catch (err) {
      next(err)
    }
  },


  /*Trending Routes */

  getTrendingArticle: async (req, res, next) => {
    try {
      const articleId = req.params.id;
      const articles = await Article.find({});

      const related = await Article.find({});

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

      /*Start Trending*/
        var popular = [];
        var events = [];
        for (var i = 0; i < articles.length; i++) {
          if (articles[i].category == "Popular") {
            popular.push(articles[i]);
          }
          else if (articles[i].category == "Events") {
            events.push(articles[i]);
          }
        }

      /*End Trending*/


      const article = await Article.findById(articleId);

      const author = await User.findById(article.author);

      const ids = article.comments;
      const comments = [];
      for (var i = 0; i < ids.length; i++) {
        const comment = await Comments.findById(ids[i]);
        comments.push(comment);
      }
      article.views++;
      await article.save();
      const news_images = article.news_images;

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      const userId = article.author;
      const user = await User.findById(userId);

      const articleIds = user.articles;
      const myarticles = [];
      for (var i = 0; i < articleIds.length; i++) {
        const article = await Article.findById(articleIds[i]);
        myarticles.push(article);
      }

      res.render('article',
       {
        article: article,
        myarticles: myarticles.slice((myarticles.length - 4)).reverse(),
        author: author,
        related: related.slice((related.length - 8)).reverse(),
        events: events.reverse(),
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
        comments : comments,
        news_images: news_images,
        social: social
       }
     );
    } catch (err) {
      next(err)
    }
  },

  addTrendingComment: async (req, res, next) => {
    try {
      const articleId = req.params.id
      const article = await Article.findById(articleId);
      const {name, comment} = req.body;
      const date = Date.now();
      const created_at = new Date(date).toDateString();
      var image;

      if (!req.file) {
        image = "";
      }
      else{
        image = req.file.filename;
      }

      const newComment = new Comments({
        name: name,
        comment: comment,
        image: image,
        date: created_at
      });

      await newComment.save();
      article.comments.push(newComment);
      article.comments_count++;
      await article.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },


  getArticles: async (req, res, next) => {
    try {
      const articles = await Article.find({});
      const jobs =  await Job.find({});

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

      /*Start Trending*/
        var popular = [];
        var events = [];
        for (var i = 0; i < articles.length; i++) {
          if (articles[i].category == "Popular") {
            popular.push(articles[i]);
          }
          else if (articles[i].category == "Events") {
            events.push(articles[i]);
          }
        }

      /*End Trending*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('articles',
       {
        articles: articles.reverse(),
        popular: popular,
        jobs: jobs.slice((jobs.length - 8)).reverse(),
        culture: culture.slice((culture.length - 3)).reverse(),
        science: science.slice((science.length - 3)).reverse(),
        travel: travel.slice((travel.length - 3)).reverse(),
        covid: covid.slice((covid.length - 3)).reverse(),
        events: events.reverse(),
        world: world.slice((world.length - 3)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 3)).reverse(),
        sport: sport.slice((sport.length - 3)).reverse(),
        technology: technology.slice((technology.length - 3)).reverse(),
        fashion: fashion.slice((fashion.length - 3)).reverse(),
        politics: politics.slice((politics.length - 3)).reverse(),
        business: business.slice((business.length - 3)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 3)).reverse(),
        social: social
       }
     );
    } catch (err) {
      next(err)
    }
  },

  /* Search Algorithm*/

  searchArticles: async (req, res, next) => {
    try {
      const articles = await Article.find({});
      const jobs = await Job.find({});
      const searchInput = req.body.searchInput;

      var searchResult = [];
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].title.toLowerCase().includes(searchInput.toLowerCase())) {
          searchResult.push(articles[i])
        }
        else if (articles[i].description.toLowerCase().includes(searchInput.toLowerCase())) {
          searchResult.push(articles[i])
        }
        else if (articles[i].tag.toLowerCase().includes(searchInput.toLowerCase())) {
          searchResult.push(articles[i])
        }
        else if (articles[i].author_name.toLowerCase().includes(searchInput.toLowerCase())) {
          searchResult.push(articles[i])
        }

      }

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

      /*Start Trending*/
        var popular = [];
        var events = [];
        for (var i = 0; i < articles.length; i++) {
          if (articles[i].category == "Popular") {
            popular.push(articles[i]);
          }
          else if (articles[i].category == "Events") {
            events.push(articles[i]);
          }
        }

      /*End Trending*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      res.render('search',
       {
        articles: searchResult.reverse(),
        popular: popular,
        jobs: jobs.slice((jobs.length - 8)).reverse(),
        culture: culture.slice((culture.length - 3)).reverse(),
        science: science.slice((science.length - 3)).reverse(),
        travel: travel.slice((travel.length - 3)).reverse(),
        covid: covid.slice((covid.length - 3)).reverse(),
        events: events.reverse(),
        world: world.slice((world.length - 3)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 3)).reverse(),
        sport: sport.slice((sport.length - 3)).reverse(),
        technology: technology.slice((technology.length - 3)).reverse(),
        fashion: fashion.slice((fashion.length - 3)).reverse(),
        politics: politics.slice((politics.length - 3)).reverse(),
        business: business.slice((business.length - 3)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 3)).reverse(),
        social: social
       }
     );
    } catch (err) {
      next(err)
    }
  },

  /* End */

  addSubs: async (req, res, next) => {
    try {
      const email = req.body.email;

      const date = Date.now();
      const created_at = new Date(date).toDateString();

      if (email != "") {
        const subscription = new Subscription({
          email: email,
          date: created_at
        });

        subscription.save();
        res.render('thank');
      }
      else {
        return res.redirect('/');
      }
    } catch (err) {
      next(err)
    }
  },


  getAuthor: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      const articleIds = user.articles;
      const articless = [];
      for (var i = 0; i < articleIds.length; i++) {
        const article = await Article.findById(articleIds[i]);
        articless.push(article);
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

      res.render('author',
       {
         user: user,
         articles: articless.reverse(),
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

  getAuthors: async (req, res, next) => {
    try {
      const users = await User.find({});
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

      var trenders = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].is_trender) {
          trenders.push(users[i]);
        }
      }

      res.render('authors',
       {
         authors: trenders.reverse(),
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
       }
     );
    } catch (err) {
      next(err)
    }
  },

  getTiles: async (req, res, next) => {
    try {
      const users = await User.find({});
      const articles = await Article.find({});
      const authors = await User.find({});

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

      /*Routes*/
      var routeId = req.route.path;
      var routesArticles;

      if (routeId == "/world-news") {
        routesArticles = world;
      }
      else if (routeId == "/covid-19") {
        routesArticles = covid;
      }
      else if (routeId == "/travel") {
        routesArticles = travel;
      }
      else if (routeId == "/sport-news") {
        routesArticles = sport;
      }
      else if (routeId == "/fashion") {
        routesArticles = fashion;
      }
      else if (routeId == "/tech-news") {
        routesArticles = technology;
      }
      else if (routeId == "/science") {
        routesArticles = science;
      }
      else if (routeId == "/lifestyle") {
        routesArticles = lifestyle;
      }
      else if (routeId == "/business-news") {
        routesArticles = business;
      }
      else if (routeId == "/politics") {
        routesArticles = politics;
      }
      else if (routeId == "/entertainment") {
        routesArticles = entertainment;
      }
      else if (routeId == "/culture") {
        routesArticles = culture;
      }

      /*End Routes*/

      /*var trending = await Article.find({});

      for (var i = 0; i < trending.length; i++) {
        var user = await User.findById(trending[i].author);
        trending[i].author_name = user.firstname + " " + user.lastname;
        trending[i].author_image = user.profile_image;
      }*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      const coronavirus = await Article.find({});

      res.render('articles', {
        articles: routesArticles.reverse(),
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
      }
    );
  } catch (err) {
      next(err)
    }
  },

  getTags: async (req, res, next) => {
    try {
      const newsId = req.params.id;
      const news = await Article.find({});
      const jobs = await Job.find({});
      const tag = await Article.findById(newsId);

      var tags = [];
      for (var i = 0; i < news.length; i++) {
        if (news[i].tag == tag.tag) {
          tags.push(news[i]);
        }
      }

      const articles = await Article.find({});

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

      res.render('articles',
       {
         articles: tags.reverse(),
         social: social,
         jobs: jobs.slice((jobs.length - 8)).reverse(),
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
  }
}
