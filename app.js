var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var actorsRouter = require('./routes/actors');
var membersRouter = require('./routes/members');
var moviesRouter = require('./routes/movies');
var copiesRouter = require('./routes/copies');
var bookingsRouter = require('./routes/bookings');

var app = express();

const jwtKey = "0d5293804f29d39bced0ed6ed6fb0a5d"

// "mongodb://<dbuser?>
const uri = "mongodb://localhost:27017/video-club";
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', () => {
  console.log("Error al conectarse a la base de datos");
});
db.on('open', () => {
  console.log("Base de datos conectada exitosamente");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Middleware que define donde se encuentran todos los recursos estaticos de la app
app.use(express.static(path.join(__dirname, 'public')));

//Validacion de Authenticacion
app.use(expressJwt({
  secret: jwtKey,
  algorithms: ['HS256']
}).unless({
  path: [
    "/login"
  ]
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/actors', actorsRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/copies', copiesRouter);
app.use('/bookings', bookingsRouter);


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
