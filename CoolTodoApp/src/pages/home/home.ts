import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPage } from '../../pages/add/add';
import { AllPage } from '../../pages/all/all';
import { PersonalPage } from '../../pages/personal/personal';
import { GroceryPage } from '../../pages/grocery/grocery';
import { WorkPage } from '../../pages/work/work';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: Array<any> = [
      {
        title: "All Schedule",
        type: "all"
      },
      {
        title: "Personal Errands",
        type: "personal"
      },
      {
        title: "Work Projects",
        type: "work"
      },
      {
        title: "Grocery List",
        type: "grocery"
      }
  ];

  todos: Array<any> = [];

  constructor(public navCtrl: NavController, public todoProvider: TodoProvider) {

  }

  openAddTodoPage(){
    this.navCtrl.push(AddPage);
  }
  openTodoPage(type: string){
    if(type == "all"){
      //display all the todos
      this.navCtrl.push(AllPage, {todos: this.todos});
    }
    else if(type == "personal"){
      let list = [];
      list = this.todos.filter((todo) => todo.type == "personal");
      this.navCtrl.push(PersonalPage, {todos: list});
    }
    else if(type == "work"){
      let list = [];
      list = this.todos.filter((todo) => todo.type == "work");
      this.navCtrl.push(WorkPage, {todos: list});
    }
    else if(type == "grocery"){
      let list = [];
      list = this.todos.filter((todo) => todo.type == "grocery");
      this.navCtrl.push(GroceryPage, {todos: list});
    }

  }

  ionViewDidEnter(){
    this.todoProvider.loadAllTodos().subscribe((data) => {
      if(data.success){
        this.todos = data.todos;
        console.log(this.todos);
      }
      else {
        console.log(data.msg);
      }
    });
  }

}
