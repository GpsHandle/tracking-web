import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from 'app/application-context';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private context: ApplicationContext) { }

  ngOnInit() {
      this.context.logout();
      this.context.navigate(['admin', 'login']);
  }
}
