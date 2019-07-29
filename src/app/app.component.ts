import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationContext} from './application-context';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent implements OnInit {

    constructor(private context: ApplicationContext) {}

    ngOnInit(): void {
        
    }
}
