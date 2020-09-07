const User = require('../models/user');
const Comments = require('../models/comment');
const Job = require('../models/job');
const Article = require('../models/article');
const Subscription = require('../models/subs');
const Social = require('../models/socials');
const Trending = require('../models/trending');
const Live = require('../models/live');
const Advert = require('../models/advert');
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
        if (article[i].category == "Finance & Business") {
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

      var foundAuthors = [];
      for (var i = 0; i < authors.length; i++) {
         if (authors[i].is_trender) {
          foundAuthors.push(authors[i]);
        }
      }

      var cover = trending[trending.length - 1];
      var cover2 = trending;
      var cover3 = trending;
      var videosF = videos;
      var corona = coronavirus;
      //World
      var worldF = world[world.length - 1];
      var worldS = world;
      var worldT = world;
      //LifeStyle
      var lifestyleF = lifestyle[lifestyle.length - 1];
      var lifestyleS = lifestyle;
      var lifestyleT = lifestyle;
      //Politics
      var politicsF = politics[politics.length - 1];
      var politicsS = politics;
      //Business
      var businessF = business[business.length - 1];
      var businessS = business;
      var businessT = business;
      //Politics
      var techF = technology;
      var techS = technology;

      const adverts = await Advert.find({});

      var ad1 = adverts[adverts.length - 1];
      var ad2 = adverts[adverts.length - 2];
      var ad3 = adverts[adverts.length - 3];

      res.render('news', {
        articles: article.slice((article.length - 20),(article.length - 10)).reverse(),
        cover: cover,
        cover2: cover2.slice((cover2.length - 3),(cover2.length - 1)).reverse(),
        cover3: cover3.slice((cover3.length - 8),(cover3.length - 3)).reverse(),
        worldF: worldF,
        worldS: worldS.slice((worldS.length - 3),(worldS.length - 1)).reverse(),
        worldT: worldT.slice((worldT.length - 6),(worldT.length - 3)).reverse(),
        lifestyleF: lifestyleF,
        lifestyleS: lifestyleS.slice((lifestyleS.length - 3),(lifestyleS.length - 1)).reverse(),
        lifestyleT: lifestyleT.slice((lifestyleT.length - 6),(lifestyleT.length - 3)).reverse(),
        politicsF: politicsF,
        politicsS: politicsS.slice((politicsS.length - 5),(politicsS.length - 1)).reverse(),
        businessF: businessF,
        businessS: businessS.slice((businessS.length - 3),(businessS.length - 1)).reverse(),
        businessT: businessT.slice((businessT.length - 6),(businessT.length - 3)).reverse(),
        techF: techF.slice((techF.length - 2)).reverse(),
        techS: techS.slice((techS.length - 7),(techS.length - 3)).reverse(),
        corona: corona.slice((corona.length - 10)).reverse(),
        adverts: adverts.reverse(),
        fbiF: fbi.slice((fbi.length - 1)).reverse(),
        fbiS: fbi.slice((fbi.length - 5),(fbi.length - 2)),
        latest: latest.slice((latest.length - 10)).reverse(),
        breaking: breaking.slice((breaking.length - 3)).reverse(),
        videosF: videosF.slice((videosF.length - 10)).reverse(),
        food: food.slice((food.length - 3)).reverse(),
        weekly: weekly.slice((weekly.length - 3)).reverse(),
        authors: foundAuthors.slice((foundAuthors.length - 3)).reverse(),
        popular: popular.reverse(),
        events: events.reverse(),
        culture: culture.slice((culture.length - 5)).reverse(),
        science: science.slice((science.length - 5)).reverse(),
        covid: covid.slice((covid.length - 5)).reverse(),
        world: world.slice((world.length - 5)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
        sport: sport.slice((sport.length - 5)).reverse(),
        technology: technology.slice((technology.length - 5)).reverse(),
        fashion: fashion.slice((fashion.length - 5)).reverse(),
        politics: politics.slice((politics.length - 5)).reverse(),
        business: business.slice((business.length - 5)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
        social: social,
        live: live,
        ad1,ad2,ad3
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
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < articles.length; i++) {
          if (articles[i].category == "Breaking") {
            breaking.push(articles[i]);
          }
          else if (articles[i].category == "Latest") {
            latest.push(articles[i]);
          }
          else {
            trending.push(articles[i]);
          }
        }

      /*End Trending*/


      const article = await Article.findById(articleId);

      if (!article) {
        return res.redirect('/page-not-found');
      }

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
        trending: trending.slice((trending.length - 3)).reverse(),
        latest: latest.slice((latest.length - 3)).reverse(),
        breaking: breaking.slice((breaking.length - 3)).reverse(),
        author: author,
        related: related.slice((related.length - 6)).reverse(),
        culture: culture.slice((culture.length - 5)).reverse(),
        science: science.slice((science.length - 5)).reverse(),
        travel: travel.slice((travel.length - 5)).reverse(),
        covid: covid.slice((covid.length - 5)).reverse(),
        world: world.slice((world.length - 5)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
        sport: sport.slice((sport.length - 5)).reverse(),
        technology: technology.slice((technology.length - 5)).reverse(),
        fashion: fashion.slice((fashion.length - 5)).reverse(),
        politics: politics.slice((politics.length - 5)).reverse(),
        business: business.slice((business.length - 5)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
        comments : comments.reverse(),
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

      const newComment = new Comments({
        name: name,
        comment: comment,
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

      const auts = await Article.find({});

      /*Start Trending*/
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < auts.length; i++) {
          if (auts[i].category == "Breaking") {
            breaking.push(auts[i]);
          }
          else if (auts[i].category == "Latest") {
            latest.push(auts[i]);
          }
          else {
            trending.push(auts[i]);
          }
        }

      /*End Trending*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      var articlesF = articles[articles.length - 1];
      var articlesS = articles;
      var articlesT = articles;
      var allArticles = "All Articles";

      res.render('articles',
       {
        articlesF: articlesF,
        articlesS: articlesS.slice((articlesS.length - 3),(articlesS.length - 1)).reverse(),
        articlesT: articlesT,
        allArticles: allArticles,
        trending: trending.slice((trending.length - 3)).reverse(),
        latest: latest.slice((latest.length - 3)).reverse(),
        breaking: breaking.slice((breaking.length - 3)).reverse(),
        culture: culture.slice((culture.length - 5)).reverse(),
        science: science.slice((science.length - 5)).reverse(),
        travel: travel.slice((travel.length - 5)).reverse(),
        covid: covid.slice((covid.length - 5)).reverse(),
        world: world.slice((world.length - 5)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
        sport: sport.slice((sport.length - 5)).reverse(),
        technology: technology.slice((technology.length - 5)).reverse(),
        fashion: fashion.slice((fashion.length - 5)).reverse(),
        politics: politics.slice((politics.length - 5)).reverse(),
        business: business.slice((business.length - 5)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
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

      const auts = await Article.find({});

      /*Start Trending*/
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < auts.length; i++) {
          if (auts[i].category == "Breaking") {
            breaking.push(auts[i]);
          }
          else if (auts[i].category == "Latest") {
            latest.push(auts[i]);
          }
          else {
            trending.push(auts[i]);
          }
        }

      /*End Trending*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      var articlesF = searchResult[searchResult.length - 1];
      var articlesS = searchResult;
      var articlesT = searchResult;

      res.render('search',
       {
        articlesF: articlesF,
        searchInput: searchInput,
        articlesS: articlesS.slice((articlesS.length - 3),(articlesS.length - 1)).reverse(),
        articlesT: articlesT,
        trending: trending.slice((trending.length - 3)).reverse(),
        latest: latest.slice((latest.length - 3)).reverse(),
        breaking: breaking.slice((breaking.length - 3)).reverse(),
        culture: culture.slice((culture.length - 5)).reverse(),
        science: science.slice((science.length - 5)).reverse(),
        travel: travel.slice((travel.length - 5)).reverse(),
        covid: covid.slice((covid.length - 5)).reverse(),
        world: world.slice((world.length - 5)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
        sport: sport.slice((sport.length - 5)).reverse(),
        technology: technology.slice((technology.length - 5)).reverse(),
        fashion: fashion.slice((fashion.length - 5)).reverse(),
        politics: politics.slice((politics.length - 5)).reverse(),
        business: business.slice((business.length - 5)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
        social: social
       }
     );
    } catch (err) {
      next(err)
    }
  },

  /* End */


  getAuthor: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.redirect('/page-not-found');
      }

      const articleIds = user.articles;
      const articless = [];
      for (var i = 0; i < articleIds.length; i++) {
        const article = await Article.findById(articleIds[i]);
        articless.push(article);
      }

      const auts = await Article.find({});

      /*Start Trending*/
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < auts.length; i++) {
          if (auts[i].category == "Breaking") {
            breaking.push(auts[i]);
          }
          else if (auts[i].category == "Latest") {
            latest.push(auts[i]);
          }
          else {
            trending.push(auts[i]);
          }
        }

      /*End Trending*/

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
         trending: trending.slice((trending.length - 3)).reverse(),
         latest: latest.slice((latest.length - 3)).reverse(),
         breaking: breaking.slice((breaking.length - 3)).reverse(),
         culture: culture.slice((culture.length - 5)).reverse(),
         science: science.slice((science.length - 5)).reverse(),
         travel: travel.slice((travel.length - 5)).reverse(),
         covid: covid.slice((covid.length - 5)).reverse(),
         world: world.slice((world.length - 5)).reverse(),
         lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
         sport: sport.slice((sport.length - 5)).reverse(),
         technology: technology.slice((technology.length - 5)).reverse(),
         fashion: fashion.slice((fashion.length - 5)).reverse(),
         politics: politics.slice((politics.length - 5)).reverse(),
         business: business.slice((business.length - 5)).reverse(),
         entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
         social: social
      });
    } catch (err) {
      next(err)
    }
  },

  getAuthors: async (req, res, next) => {
    try {
      const users = await User.find({});

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
         social: social
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

      if (routeId == "/world") {
        routesArticles = world;
      }
      else if (routeId == "/covid-19") {
        routesArticles = covid;
      }
      else if (routeId == "/travel") {
        routesArticles = travel;
      }
      else if (routeId == "/sports") {
        routesArticles = sport;
      }
      else if (routeId == "/fashion") {
        routesArticles = fashion;
      }
      else if (routeId == "/technology") {
        routesArticles = technology;
      }
      else if (routeId == "/science") {
        routesArticles = science;
      }
      else if (routeId == "/lifestyle") {
        routesArticles = lifestyle;
      }
      else if (routeId == "/business") {
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

      const auts = await Article.find({});

      /*Start Trending*/
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < auts.length; i++) {
          if (auts[i].category == "Breaking") {
            breaking.push(auts[i]);
          }
          else if (auts[i].category == "Latest") {
            latest.push(auts[i]);
          }
          else {
            trending.push(auts[i]);
          }
        }

      /*End Trending*/

      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      var articlesF = routesArticles[routesArticles.length - 1];
      var articlesS = routesArticles;
      var articlesT = routesArticles;

      res.render('articles', {
        articlesF: articlesF,
        articlesS: articlesS.slice((articlesS.length - 3),(articlesS.length - 1)).reverse(),
        articlesT: articlesT,
        trending: trending.slice((trending.length - 3)).reverse(),
        latest: latest.slice((latest.length - 3)).reverse(),
        breaking: breaking.slice((breaking.length - 3)).reverse(),
        culture: culture.slice((culture.length - 5)).reverse(),
        science: science.slice((science.length - 5)).reverse(),
        travel: travel.slice((travel.length - 5)).reverse(),
        covid: covid.slice((covid.length - 5)).reverse(),
        world: world.slice((world.length - 5)).reverse(),
        lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
        sport: sport.slice((sport.length - 5)).reverse(),
        technology: technology.slice((technology.length - 5)).reverse(),
        fashion: fashion.slice((fashion.length - 5)).reverse(),
        politics: politics.slice((politics.length - 5)).reverse(),
        business: business.slice((business.length - 5)).reverse(),
        entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
        social: social
      }
    );
  } catch (err) {
      next(err)
    }
  },

  getTags: async (req, res, next) => {
    try {
      const news = await Article.find({});

      var tagId = req.params.token;
      var tags = [];
      for (var i = 0; i < news.length; i++) {
        news[i].tags.forEach((tag) => {
          if(tag.toLowerCase().includes(tagId.toLowerCase())){
            tags.push(news[i]);
          }
        });
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

      const auts = await Article.find({});

      /*Start Trending*/
        var trending = [];
        var breaking = [];
        var latest = [];
        for (var i = 0; i < auts.length; i++) {
          if (auts[i].category == "Breaking") {
            breaking.push(auts[i]);
          }
          else if (auts[i].category == "Latest") {
            latest.push(auts[i]);
          }
          else {
            trending.push(auts[i]);
          }
        }

      /*End Trending*/

      /*End Titles*/
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      var articlesF = tags[tags.length - 1];
      var articlesS = tags;
      var articlesT = tags;

      res.render('articles',
       {
         articlesF: articlesF,
         articlesS: articlesS.slice((articlesS.length - 3),(articlesS.length - 1)).reverse(),
         articlesT: articlesT,
         trending: trending.slice((trending.length - 3)).reverse(),
         latest: latest.slice((latest.length - 3)).reverse(),
         breaking: breaking.slice((breaking.length - 3)).reverse(),
         culture: culture.slice((culture.length - 5)).reverse(),
         science: science.slice((science.length - 5)).reverse(),
         travel: travel.slice((travel.length - 5)).reverse(),
         covid: covid.slice((covid.length - 5)).reverse(),
         world: world.slice((world.length - 5)).reverse(),
         lifestyle: lifestyle.slice((lifestyle.length - 5)).reverse(),
         sport: sport.slice((sport.length - 5)).reverse(),
         technology: technology.slice((technology.length - 5)).reverse(),
         fashion: fashion.slice((fashion.length - 5)).reverse(),
         politics: politics.slice((politics.length - 5)).reverse(),
         business: business.slice((business.length - 5)).reverse(),
         entertainment: entertainment.slice((entertainment.length - 5)).reverse(),
         social: social
       }
     );
    } catch (err) {
      next(err)
    }
  }
}
