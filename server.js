//Modules that are needed to run the Server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('passport');
const mongoose = require('mongoose');

// Connect To Database Code Begin
var dbUrl = "mongodb://students:letscode1@ds243728.mlab.com:43728/letscodejs";
mongoose.Promise = require('bluebird');
var options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};
mongoose.connect(dbUrl, options);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+dbUrl);
});
// Connect To Database Code End

//setup express app to drive the server
const app = express();

//initialize the routes
const todo = require('./routes/routes');

//setup the port to connect to
const port = process.env.PORT || 3000;


// Body Parser Middleware
var bodyOptions = {
  limit: '50mb'
}
app.use(bodyParser.json(bodyOptions));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS Middleware
app.use(cors());
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//    res.setHeader('Access-Control-Allow-Origin', '*');
//
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true);
//
//    // Pass to next layer of middleware
//    next();
// });

//Initialize passport
// require('./config/passport')(passport);

app.use('/todo', todo);


app.listen(port);
console.log('Server is up and running on port: '+port);
