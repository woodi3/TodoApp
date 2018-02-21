/*
we use the 'require' keyword to import the necessary modules or files.
We import the todo.js model file so we can use the Todo schema to handle
functions with the database.
*/
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


/*
router.post is a function call from the express router object that handles
all post requests to a particular URL. In this case the URL is:
'http://localhost:3000/todo/api/add'. In the server.js file, we prefix all of
the routes with 'todo'. The (req,res,next)=> {} is a lambda function that is
ran when a user or the app makes a request to the above url.

'req' stands for request - this is the variable that contains all the info sent
by the app. We are requesting to do something.

'res' stands for response - this is the variable we are going to use to RESPOND to
the app. We send JSON objects back to the app.
*/
router.post('/api/add', (req, res, next) => {
  /*
  console.log(String) just prints out a string to the terminal or web console.
  In our case this will print to the terminal since this file is on the server end.
  The 'req' is a JSON object that contains a 'body' attribute. The body attribute
  contains the data sent from the app.
  */
  console.log(req.body);

  /*
  Let's create a JSON object that has the minimal attributes needed for a Todo object.
  */
  let newTodoObj = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type
  };

  /*
  Using the Todo variable we imported at the beginning of the file, we can create actual Todo objects to save into
  the database. We pass our 'newTodoObj' to the Todo constructor and it will form
  a database object that is now ready to be saved to the database.
  */
  let newTodo = new Todo(newTodoObj);

  /*
  We call the 'addTodo' function that we defined in the todo.js model file.
  The first parameter is the 'newTodo' object we just initialized. The second
  parameter is a lambda function that will be ran after the database saves our
  'newTodo' object to the database. This lambda function has 2 parameters that
  the database will return: error (err) or the new todo object (todo).

  To send information back to the app, we use the 'res' variable. We call the
  'json' function attached to the 'res' variable to send a JSON object back to
  the app.
  */
  Todo.addTodo(newTodo, (err, todo) => {
    /*
    If the 'err' variable is defined, this means the database returned an error.
    If the database returns an error, we use the 'res' variable to send a JSON
    object that has a 'success' attribute which will either be true or false, and
    a 'msg' attribute, that will be a string.
    */
    if(err){
      return res.json({success: false, msg: "Error with db"});
    }
    /*
      The 'err' variable isn't defined, meaning the database did not return an error.
      The 'todo' variable should now be defined and you can send it back to the app if
      you want. We're just going to use the 'res' variable to send a JSON object that
      has a 'success' attribute set to 'true' indicating there wasn't an error so the
      app will continue doing what is planned on doing.
    */
    else {
      return res.json({success: true});
    }
  });
});

/*
router.get is a function call from the express router object that handles
all get requests to a particular URL. In this case the URL is:
'http://localhost:3000/todo/api/get/all'. In the server.js file, we prefix all of
the routes with 'todo'. The (req,res,next)=> {} is a lambda function that is
ran when a user or the app makes a request to the above url.
*/
router.get('/api/get/all', (req, res, next) => {

  /*
  Using the Todo variable we imported at the beginning of the file that contains
  our schema, we can use the built-in 'mongoose' function 'find()'. Mongoose has
  some functions already built-in to use with MongoDB. The 'find' function takes
  in atleast 2 parameters (might take more). The first parameter is a JSON object
  that behaves as a query. An example query could be:

          query = {
            title: "New todo title"
          };
  For our case, this route will return all of the Todo objects in the database.
  To return all items from a Collection in MongoDB (similar to tables in SQL),
  we pass an empty JSON object '{}' as the first parameter. The second parameter
  is a lambda function that will run after the database returns all of the Todo objects.
  This lambda function has 2 parameters that the database will return: 'err' if there's
  an error or 'todos' which is an array with all of our Todo objects.
  */
  Todo.find({}, (err, todos) =>{
    /*
    If the database returns an error, the 'err' variable will be defined.
    If the 'err' variable is defined, then we print the error to the terminal window
    and we use the 'res' variable to send a JSON object back to the app indicating
    that something went wrong. The JSON object will have a 'success' attribute set to
    false and a 'msg' attribute set to an error string.
    */
    if(err){
      console.log(err);
      return res.json({success: false, msg:"Error when getting todos"});
    }
    //This block of code is commented out because we may or may not need it.
    //Will test it later! :)
    // if(!todos){
    //     console.log(err);
    //     return res.json({success: false, msg:"Error when getting todos"});
    // }

    /*
    If the database doesn't return an error, then we have todo objects!!!
    These todo objects will be stored in the 'todos' variable which is an array.
    We use the 'res' variable to send a JSON object to the app that has a
    'success' attribute set to true, and a 'todos' attribute that is set to
    the 'todos' variable (returned from the database) reversed... We want the
    most recent todo to be first.
    */
    else{
      return res.json({success: true, todos: todos.reverse()});
    }
  });
});

//module.exports allows us to use the 'router' variable in different files.
//The 'router' variable will have all of the routes above attached to it.
//We will 'use' the 'router' variable in server.js file.
module.exports = router;
