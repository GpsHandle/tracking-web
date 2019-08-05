import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    isEditting: boolean;

    accountId: number;
    accountName: string;
    access_token: string;
    token_type: string;
    jti: string;
    scope: string;
    firstPageUrl: string;
    authorities: Array<string>;
    redirectURL: string
    expires_in: number;


    constructor(private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.isEditting = false;

        this.accountId      = this.applicationContext.accountId;
        this.accountName    = this.applicationContext.accountName;
        this.firstPageUrl   = this.applicationContext.firstPageUrl;
        this.access_token   = this.applicationContext.access_token;
        this.token_type     = this.applicationContext.token_type;
        this.jti            = this.applicationContext.jti;
        this.scope          = this.applicationContext.scope;
        this.authorities    = this.applicationContext.authorities;
        this.redirectURL    = this.applicationContext.redirectURL;
        this.expires_in     = this.applicationContext.expires_in;
    }

}
