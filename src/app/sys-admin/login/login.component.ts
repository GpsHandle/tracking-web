import { Component, OnInit } from '@angular/core';
import { AuthResponse } from 'app/models/auth.response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'app/services/auth.service';
import { ApplicationContext } from 'app/application-context';

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
                this.applicationContext.spin(false);
                this.applicationContext.store(result);
                this.applicationContext.navigate(['admin', 'sys', 'dashboard']);
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
