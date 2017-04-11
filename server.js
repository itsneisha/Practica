// all dependicies are to be moved into the server file
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport'); // the chunk of code that will authenticate the users when they come to the site 
var flash    = require('connect-flash');

var morgan       = require('morgan'); // a way of printing out your error log to the terminal
var cookieParser = require('cookie-parser'); //takes a cookie and allows u to say "q pasa con esa galleta".
var bodyParser   = require('body-parser'); //when u send out a request via url , i tpulls info back. this will allow to take peices apart and examine (body /head) .
var session      = require('express-session'); 

var configDB = require('./config/database.js');


mongoose.connect(configDB.url); //connect to our database


 require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth )
app.use(bodyParser()); // get info from html forms

app.set('view engine', 'ejs'); //set up for ejs templating 

//required for passport 
app.use(session({ secret: 'kendrickandhiphop'})); //session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes.js')(app, passport); /*load our routes and pass in our app and fully configured passport*/

//launch
app.listen(port);
console.log('Listening on port' + port);
console.log(configDB.url);

