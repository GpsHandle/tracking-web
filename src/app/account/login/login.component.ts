import { Component, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from "../../core/services/auth.service";
import {ApplicationContext} from "../../application-context";
import {AuthResponse} from "../../models/auth.response";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  lang: string;
  constructor(private auth: AuthService,
              private appCtx: ApplicationContext) {}

  ngOnInit() {
    // if (environment.production) {
    //   if (this.appCtx.isLoggedIn()) {
    //     const redirectUrl = this.appCtx.getRedirectURL();
    //     this.appCtx.navigate([redirectUrl]);
    //   } else {
    //     this.lang = this.appCtx.getLang();
    //     this.appCtx.navigate(['/account/c/login']);
    //   }
    // } else if (this.appCtx.isLoggedIn()) {
    //   const redirectUrl = this.appCtx.getRedirectURL();
    //   this.appCtx.navigate([redirectUrl]);
    // }
  }

  login(): void {
    this.appCtx.spin(true);
    this.auth.login(this.model.username, this.model.password).subscribe(
        (result: AuthResponse) => {
          this.appCtx.spin(false);
          this.appCtx.store(result);
          const redirectUrl = this.appCtx.getRedirectURL();
          console.log('redirectUrl', redirectUrl);
          this.appCtx.navigate([redirectUrl]);
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.appCtx.error(err.error.error_description || err.message);
          } else {
            this.appCtx.error(err);
          }

          this.appCtx.spin(false);
        },
        () => {}
    );
  }
}
