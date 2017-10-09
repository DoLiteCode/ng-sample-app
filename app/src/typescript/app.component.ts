//export function sayHello(name: string) {
//  return `Hello from ${name}`;
//}

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent  { name = 'Angular'; }
