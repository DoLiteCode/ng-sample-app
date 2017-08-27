/*
import {Component} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'sample-app',
  templateUrl: '<h1>Hello..</h1>'
})

class AppComponent {

}


bootstrap(AppComponent);
*/

import { sayHello } from "./app.component";
/*function sayHello(name: string) {
  return `Hello from ${name}`;
}*/
//sayHello("TypeScript");
//console.log(sayHello("TypeScript"));

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}
showHello("greeting", "TypeScript 1.0.4");

//console.log('Hello boot...');