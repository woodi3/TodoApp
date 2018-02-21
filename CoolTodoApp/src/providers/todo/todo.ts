
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  devEp = "http://localhost:3000";

  constructor(public http: Http) {
  }

  saveTodo(todoItem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.devEp+"/todo/api/add",todoItem,{headers: headers})
      .map(res => res.json());
  }

  loadAllTodos(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.devEp+"/todo/api/get/all",{headers: headers})
      .map(res => res.json());
  }

}
