import { Component, OnInit } from '@angular/core';
import {ApplicationContext} from "../../../../../application-context";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MailProperties} from "../../../../../models/mail-properties";
import {AccountRequest} from "../../../../../models/request/account.request";
import {map, startWith} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {SmtpDialogComponent} from "../smtp-dialog/smtp-dialog.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import * as _ from "lodash";

@Component({
    selector: 'app-add-account',
    templateUrl: './account-update.component.html',
    styleUrls: ['./account-update.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class AccountUpdateComponent implements OnInit {
    account: Account;
    password: string;
    rePassword: string;
    privilegeList: Array<Privilege>;
    statusControl: FormControl = new FormControl();
    filteredStatus: Observable<string[]>;

    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService,
                private dialog: MatDialog) { }

    ngOnInit() {
        this.account = new Account();
        this.account.mailProperties.protocol = 'smtp';

        this.privilegeList = this.applicationContext.getPrivileges();
        this.filteredStatus = this.statusControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                return this.applicationContext.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
            })
        );
    }

    save() {
        this.account.status = this.statusControl.value;
        const accountreq = new AccountRequest(this.account);
        this.accountService.create(accountreq).subscribe(
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
