let createError = require('http-errors');
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let helmet = require('helmet');
let expressValidator = require('express-validator');
let cookieSession = require('cookie-session');

// get passport and pass it for configuration: Configuration is done in passport.js
let passport = require('passport');
require('./config/passport')(passport);

let AuthenticateController = require('./controller/authenticate.controller');

//routes
let indexRouter = require('./routes/index');
let protectedRoutes = require('./routes/protectedRoutes');
let Constants = require('./constants');

// ------------------------------------------------------------------------------------------------------------------

let app = express();
app.use(helmet());

//Set up mongoose connection
let mongoose = require('./config/mongoose');
mongoose();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator()); // Hello Future Coder: This must be added after bodyParser
app.use(cookieParser());

// User authentication code
// Production Environment use.
app.use(cookieSession({
    name: 'session',
    secret: Constants.AUTHENTICATION_SECRET_KEY,
    //keys: [/* secret keys */],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Call respective ROUTERS
app.use('/', indexRouter);
app.use('/', AuthenticateController.isLoggedIn, protectedRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
