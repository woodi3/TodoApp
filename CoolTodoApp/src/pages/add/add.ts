import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  title: string = "";
  description: string = "";
  type: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public todoProvider: TodoProvider) {}

  ionViewDidLoad() {
  }
  addTodo(){
    let todoItem = {
      title: this.title,
      description: this.description,
      type: this.type
    };
    this.todoProvider.saveTodo(todoItem).subscribe((data) =>{
      //Do some stuff
      if(data.success){
        this.navCtrl.pop();
      }
      else {
        console.log(data.msg);
      }
    });
  }

}
