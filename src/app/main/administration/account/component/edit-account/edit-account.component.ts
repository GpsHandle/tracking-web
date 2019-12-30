import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {ApplicationContext} from "../../../../../application-context";
import {FormControl} from "@angular/forms";
import {SmtpProperties} from "../../../../../models/smtp-properties";

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

    isEditing: boolean;
    password: string;
    rePassword: string;
    account: Account;
    accountId: number;
    privilegeList: Array<Privilege>;

    statusControl: FormControl = new FormControl();
    filteredStatus: Observable<string[]>;

    isAddNewSmtp: boolean;
    aNewSmtpServer: SmtpProperties;

    smtpDisplayedColumns = ['host', 'port'];
    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService) { }

    ngOnInit() {
        this.account = new Account();
        this.privilegeList = this.applicationContext.getPrivileges();
        this.filteredStatus = this.statusControl.valueChanges
            .pipe(
                startWith(''),
                map(value => {
                    return this.applicationContext.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                })
            );

        this.route.params.pipe(
            switchMap(params => {
                console.log("params", params);
                this.accountId = params['id'];
                return this.accountService.getById(this.accountId)
            })
        ).subscribe(data => {
            this.account = data;
            this.statusControl.setValue(this.account.status);
        });
    }

    addNewSmtpServer() {
        this.aNewSmtpServer = new SmtpProperties();
        this.isAddNewSmtp = true;
    }

    saveNewSmtpServer() {
        console.log('a new smtp server', this.aNewSmtpServer);
        this.aNewSmtpServer.accountId = this.accountId;
        this.accountService.addSmtpToAccount(this.accountId, this.aNewSmtpServer).subscribe(data => {
            console.log(data);
        })
    }

    cancelNewSmtpServer() {
        this.isAddNewSmtp = false;
        this.aNewSmtpServer = null;
    }
}
