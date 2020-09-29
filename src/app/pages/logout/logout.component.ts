import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from 'app/application-context';

@Component({
  selector: 'logout',
  template: ``,
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(private applicationContext: ApplicationContext) { }

  ngOnInit() {
      this.applicationContext.logout();
      this.applicationContext.navigate(['/home']);
  }

}
