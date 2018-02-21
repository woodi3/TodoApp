import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroceryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grocery',
  templateUrl: 'grocery.html',
})
export class GroceryPage {

  todos: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AllPage');
  }
  ionViewWillEnter(){
    this.todos = this.navParams.get('todos');
    console.log(this.todos);
  }

}
