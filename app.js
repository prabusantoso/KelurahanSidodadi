var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session =  require('express-session')

var dataFile = require('./data/data.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visimisiRouter = require('./routes/visimisi')
var kegiatanrtsRouter = require('./routes/kegiatanrts');
var kontakRouter = require('./routes/kontak');
var chatRouter = require('./routes/chat');
var agendaRouter = require('./routes/agendas');
var pengumumanRouter = require('./routes/pengumumans');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 
app.set('appData', dataFile);

app.locals.siteTitle = 'Kelurahan Sidodadi';
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret : 'keyboard cat', cookie: { },resave: true,saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visimisi', visimisiRouter);
app.use('/kegiatanrts', kegiatanrtsRouter);
app.use('/kontak', kontakRouter);
app.use('/chat', chatRouter);
app.use('/agendas', agendaRouter);
app.use('/pengumumans', pengumumanRouter);

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
