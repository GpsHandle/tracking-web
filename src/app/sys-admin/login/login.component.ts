import { Component, OnInit } from '@angular/core';
import { AuthResponse } from 'app/models/auth.response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'app/services/auth.service';
import { ApplicationContext } from 'app/application-context';
import * as _ from 'lodash';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any;

    constructor(private auth: AuthService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.model = {};
        this.applicationContext.logout();
    }

    login(): void {
        this.applicationContext.spin(true);
        this.auth.login(this.model.username, this.model.password).subscribe(
            (result: AuthResponse) => {
                //console.log('result', result);
                this.applicationContext.spin(false);
                this.applicationContext.store(result);

                if (LoginComponent.isSysadmin(result.authorities)) {
                    this.applicationContext.navigate(['admin', 'sys', 'dashboard']);
                } else {
                    const redirectUrl = this.applicationContext.getRedirectURL();
                    this.applicationContext.navigate([redirectUrl]);
                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.applicationContext.error(err.error.error_description || err.message);
                } else {
                    this.applicationContext.error(err);
                }

                this.applicationContext.spin(false);
            },
            () => {}
        );
    }

    static isSysadmin(l: string[]): boolean {
        return (_.includes(l, 'VD5LORD') || _.includes(l, "SYSADMIN"));
    }
}
