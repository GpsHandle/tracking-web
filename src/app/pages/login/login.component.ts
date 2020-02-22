import { Component, OnInit} from '@angular/core';

import { AuthService } from 'app/services/auth.service';
import { ApplicationContext} from 'app/application-context';
import { AuthResponse } from 'app/models/auth.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(private auth: AuthService,
                private applicationContext: ApplicationContext) {}

    ngOnInit() {
        if (this.applicationContext.isLoggedIn()) {
            const redirectUrl = this.applicationContext.getRedirectURL();
            this.applicationContext.navigate([redirectUrl]);
        }
    }

    hl(lang: string): void {
        this.applicationContext.navigate(['/login'], {queryParams: {hl: lang}});
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
