import { Component, OnInit} from '@angular/core';

import { AuthService } from 'app/services/auth.service';
import { ApplicationContext} from 'app/application-context';
import { AuthResponse } from 'app/models/auth.response';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    lang: string;
    constructor(private auth: AuthService,
                private applicationContext: ApplicationContext) {}

    ngOnInit() {
        if (environment.production) {
            if (this.applicationContext.isLoggedIn()) {
                const redirectUrl = this.applicationContext.getRedirectURL();
                this.applicationContext.navigate([redirectUrl]);
            } else {
                this.lang = this.applicationContext.getLang();
                this.applicationContext.navigate([this.lang, 'login']);
            }
        } else if (this.applicationContext.isLoggedIn()) {
            const redirectUrl = this.applicationContext.getRedirectURL();
            this.applicationContext.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.applicationContext.spin(true);
        this.auth.login(this.model.username, this.model.password).subscribe(
            (result: AuthResponse) => {
                this.applicationContext.spin(false);
                this.applicationContext.store(result);
                const redirectUrl = this.applicationContext.getRedirectURL();
                this.applicationContext.navigate([redirectUrl]);
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
}
