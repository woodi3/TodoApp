const mongoose = require('mongoose');
// Todo Schema
const TodoSchema = mongoose.Schema(
  {
    title: {type: String, required: true, max: 100},
    creator: {type: String, max: 100},
    description: {type: String},
    type: {type: String, required: true},
    status: {type: Boolean, default: false} //is the todo finished or not?
  } , { timestamps: { createdAt: 'created_at' } });

const Todo = module.exports = mongoose.model('Todo', TodoSchema);

module.exports.getTodoById = function(id, callback){
  Todo.findById(id, callback);
}

module.exports.addTodo = function(newTodo, callback){
  console.log(newTodo);
  newTodo.save(callback);
}
