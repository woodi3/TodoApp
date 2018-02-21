/*
We require the mongoose module which will allow
us to talk to our Mongo database.
*/
const mongoose = require('mongoose');

// Todo Schema
/*
This sets up the Todo Schema. In Mongo, our objects are stored in collections of
"documents". Each document is equivalent to a JSON object. This schema will
outline what our Todo objects are stored like.

We call 'mongoose.Schema' function to indicate we are creating a Mongo Schema.
*/
const TodoSchema = mongoose.Schema(
  {
    //title attribute will be type String, required, and max length 100
    title: {type: String, required: true, max: 100},

    //creator attribute will be type String and max length 100 ... not required
    //if the user doesn't specify a creator, the DB will set it to 'Anonymous'
    creator: {type: String, max: 100, default: "Anonymous"},

    //description attribute will be type String and not required
    description: {type: String},

    //type attribute will be type String and required
    type: {type: String, required: true},

    //status attribute will be type Boolean and default to 'false'.. not requried
    status: {type: Boolean, default: false}

    //Don't pay much mind to the timestamps stuff
  } , { timestamps: { createdAt: 'created_at' } });

/*
1st we create a Todo variable.
2nd we use the 'module.exports' to all the Todo variable to be used in other files.
3rd we call the 'mongoose.model' function which will create our collection
model for the Mongo DB using the identifier 'Todo' and the Schema 'TodoSchema'.
*/
const Todo = module.exports = mongoose.model('Todo', TodoSchema);

/*
Remember 'module.exports' allows things to be used in other files...

Since we set "Todo = module.exports", when we say:
'module.exports.getTodoById = function(){}' it attaches the function 'getTodoById'
to the 'Todo' variable... This is like declaring functions in a java class for a
Player. These functions will only be used by the 'Todo' variable.
*/

/*
the function 'getTodoById' takes in 2 parameters: id (string), callback (lambda function).
We then use the Todo variable and call 'findById' which takes in an 'id' to find in the
database. The function uses the callback and returns a Todo object from the database
if the specified 'id' matches an id in the database. The returned Todo object will
be used in our callback. If an error is returned, it will be used in our callback.

The callbacks will be in the route.js file.
*/
module.exports.getTodoById = function(id, callback){
  Todo.findById(id, callback);
}

/*
the function 'addTodo' takes in 2 parameters: newTodo (Todo), callback (lambda function).
We then use newTodo variable and call 'save' function which saves our newTodo object to the
database. The 'save' function uses the callback and returns the newly saved Todo object.
The returned Todo object will be used in our callback. If an error is returned,
it will be used in our callback.

The callbacks will be in the route.js file.
*/

module.exports.addTodo = function(newTodo, callback){
  //print the newTodo out to the terminal
  console.log(newTodo);
  //save the todo object to the database
  newTodo.save(callback);
}
