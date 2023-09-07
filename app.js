var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


const Data =[
  {
    name:"sahitya",
    class:"ece",
  },
  {
    name: "honey",
    class: "ece",
  }
]


app.get('/api/v1/:name',(req,res)=>{

  let flag = true;
  let {name} = req.params;
  Data.forEach((ele)=>{
    if(ele.name === `${name}`) {
      res.status(200).json({...ele});
      flag = false;
    }

  })
  if (flag) res.status(404).send("Not Found!!!");
})

//Routes

app.get("/",(req,res)=>{
  // console.log("req: ",req
  console.log("headers: ",req.headers);
  // console.log("res: ",res.headers);
  res.send("Jai Mata Di ");
})

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
