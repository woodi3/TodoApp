const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


//'todo/api/add'
router.post('/api/add', (req, res, next) => {
  console.log(req.body);

  //After you show the content sent from the ionic app do this
  let newTodo = new Todo(req.body);
  Todo.addTodo(newTodo, (err, todo) => {
    if(err){
      return res.json({success: false, msg: "Error with db"});
    }
    else {
      return res.json({success: true});
    }
  });

});

router.get('/api/get/all', (req, res, next) => {

  Todo.find({}, (err, todos) =>{
    if(err){
      console.log(err);
      return res.json({success: false, msg:"Error when getting todos"});
    }
    if(!todos){
        console.log(err);
        return res.json({success: false, msg:"Error when getting todos"});
    }
    else{
      return res.json({success: true, todos: todos.reverse()});
    }
  });


});


module.exports = router;
