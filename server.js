/*
These are the main modules needed for the server to run.
We use the 'require' keyword/function, to import the modules.
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//this line is commented out because this module will be used if we allow users
//to register/login
// const passport = require('passport');


//===========DATABASE CONNECTION and CONFIGURATION =========================

//this is the database url that is in the cloud ... i created it... nothing
//for you to do on your end. I can show how to set your own up if you'd like! :)
var dbUrl = "mongodb://students:letscode1@ds243728.mlab.com:43728/letscodejs";

//Some configuration options and requirements
mongoose.Promise = require('bluebird');
var options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};
//start the connection
mongoose.connect(dbUrl, options);

//If the database successfully connected, print out to the terminal that we connected.
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+dbUrl);
});
//===========DATABASE CONNECTION and CONFIGURATION END =========================

//setup express app to drive the server
/*
Express allows us to use certain keywords like 'use' and 'listen'
'Use' tells the server, we want to use this object or resource.
*/
const app = express();

//import the routes from the route.js file ... remember module.exports = router;
const todo = require('./routes/routes');

//setup the port to connect to... defaults to port 3000
const port = process.env.PORT || 3000;


//====================== HTTP CONFIGURATION AND SECURITY STUFF =====================

//Don't worry about the stuff in this section
var bodyOptions = {
  limit: '50mb'
}
app.use(bodyParser.json(bodyOptions));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS Middleware
app.use(cors());
 //====================== CONFIGURATION AND SECURITY STUFF END =====================


//This is commented out because it's only needed if we allow users to register
//or login
//Initialize passport
// require('./config/passport')(passport);



//Prefix all of our routes with '/todo'
app.use('/todo', todo);

//Tell the server to run on port --- defaults to 3000.
app.listen(port);

console.log('Server is up and running on port: '+port);
