(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*export function sayHello(compiler: string) {
  console.log(`Hello from ${compiler}`);
}*/
function sayHello(name) {
  return "Say Hello from " + name;
}
exports.sayHello = sayHello;

},{}],2:[function(require,module,exports){
"use strict";
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

Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
/*function sayHello(name: string) {
  return `Hello from ${name}`;
}*/
//sayHello("TypeScript");
//console.log(sayHello("TypeScript"));
function showHello(divName, name) {
  var elt = document.getElementById(divName);
  elt.innerText = app_component_1.sayHello(name);
}
showHello("greeting", "TypeScript 1.0.4");
//console.log('Hello boot...');

},{"./app.component":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHlwZXNjcmlwdC9hcHAuY29tcG9uZW50LnRzIiwic3JjL3R5cGVzY3JpcHQvYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLEFBRUc7OztBQUNILGtCQUF5QixBQUFZO0FBQ25DLEFBQU0sU0FBQyxvQkFBa0IsQUFBTSxBQUFDLEFBQ2xDO0FBQUM7QUFGRCxtQkFFQzs7OztBQ0xELEFBZUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVGLDhCQUEyQztBQUMzQyxBQUVHOzs7QUFDSCxBQUF5QjtBQUN6QixBQUFzQztBQUV0QyxtQkFBbUIsQUFBZSxTQUFFLEFBQVk7QUFDOUMsTUFBTSxBQUFHLE1BQUcsQUFBUSxTQUFDLEFBQWMsZUFBQyxBQUFPLEFBQUMsQUFBQztBQUM3QyxBQUFHLE1BQUMsQUFBUyxZQUFHLGdCQUFRLFNBQUMsQUFBSSxBQUFDLEFBQUMsQUFDakM7QUFBQztBQUNELEFBQVMsVUFBQyxBQUFVLFlBQUUsQUFBa0IsQUFBQyxBQUFDO0FBRTFDLEFBQStCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKGNvbXBpbGVyOiBzdHJpbmcpIHtcbiAgY29uc29sZS5sb2coYEhlbGxvIGZyb20gJHtjb21waWxlcn1gKTtcbn0qL1xuZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKG5hbWU6IHN0cmluZykge1xuICByZXR1cm4gYFNheSBIZWxsbyBmcm9tICR7bmFtZX1gO1xufSIsIi8qXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2FtcGxlLWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnPGgxPkhlbGxvLi48L2gxPidcbn0pXG5cbmNsYXNzIEFwcENvbXBvbmVudCB7XG5cbn1cblxuXG5ib290c3RyYXAoQXBwQ29tcG9uZW50KTtcbiovXG5cbmltcG9ydCB7IHNheUhlbGxvIH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuLypmdW5jdGlvbiBzYXlIZWxsbyhuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGBIZWxsbyBmcm9tICR7bmFtZX1gO1xufSovXG4vL3NheUhlbGxvKFwiVHlwZVNjcmlwdFwiKTtcbi8vY29uc29sZS5sb2coc2F5SGVsbG8oXCJUeXBlU2NyaXB0XCIpKTtcblxuZnVuY3Rpb24gc2hvd0hlbGxvKGRpdk5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGVsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpdk5hbWUpO1xuICBlbHQuaW5uZXJUZXh0ID0gc2F5SGVsbG8obmFtZSk7XG59XG5zaG93SGVsbG8oXCJncmVldGluZ1wiLCBcIlR5cGVTY3JpcHQgMS4wLjRcIik7XG5cbi8vY29uc29sZS5sb2coJ0hlbGxvIGJvb3QuLi4nKTsiXX0=
