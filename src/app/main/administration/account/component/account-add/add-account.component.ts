import { Component, OnInit } from '@angular/core';
import {ApplicationContext} from "../../../../../application-context";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {SmtpProperties} from "../../../../../models/smtp-properties";
import {AccountRequest} from "../../../../../models/request/account.request";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    account: Account;
    password: string;
    rePassword: string;
    privilegeList: Array<Privilege>;
    statusControl: FormControl = new FormControl();
    filteredStatus: Observable<string[]>;
    aNewSmtpServer: SmtpProperties;
    columnsToDisplay = ['host', 'port'];
    expandedElement: SmtpProperties | null;
    isAddNewSmtp: boolean;

    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService) { }

    ngOnInit() {
        this.account = new Account();
        this.privilegeList = this.applicationContext.getPrivileges();
        this.filteredStatus = this.statusControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                return this.applicationContext.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
            })
        );
    }

    newSmtpServer() {
        this.isAddNewSmtp = true;
        this.aNewSmtpServer = {} as SmtpProperties;
    }

    saveNewSmtpServer() {

    }

    cancelNewSmtpServer() {

    }

    save() {
        const accountr = new AccountRequest(this.account);
        this.accountService.create(accountr).subscribe(
            data => {
                console.log('data', data);
                this.applicationContext.info("An account was created successfully!");
                this.applicationContext.navigate(['/main/admin/account']);
            },
            error => {
                this.applicationContext.error(error);
            },
            () => {
            }
        );
    }
}
