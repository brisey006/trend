const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path')
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const validator = require('express-validator');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);


///Express midleware
app.use(express.json());

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
//app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

//Connect to mongodb
mongoose.connect('mongodb://trending_mongo:27017/trending',
 {
   useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log('Mongodb Connected');
})
.catch((err)=> {
  console.log(err);
});
require('./config/passport');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(session({
   secret: "bensecret",
   resave: false,
   saveUninitialized: false,
   store: new MongoStore({mongooseConnection: mongoose.connection}),
   cookie: {maxAge: 365 * 24 * 60 * 60 * 1000}
  }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})
//Import routes
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/index'));

//Catch 404 errors
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    if (err.status == 404) {
      return res.redirect('/page-not-found')
    }
});

//Error Handler Function
app.use((err, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500
    //Respond to client
    if (err.status) {
        return res.redirect('/internal-server-error');
    }
    //Respond to us
    console.error(err);
});

//Start Program
const port = app.get('port') || 5000
app.listen(port, () => {
  console.log(`Server started sir on port ${port}`);
});
