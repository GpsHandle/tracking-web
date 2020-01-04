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
    aNewSmtpServer: SmtpProperties;
    columnsToDisplay = ['host', 'port'];
    expandedElement: SmtpProperties | null;
    isAddNewSmtp: boolean;
    smtpServerList: Array<SmtpProperties>;
    smtpServers: FormControl;

    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService,
                private dialog: MatDialog) { }

    ngOnInit() {
        this.account = new Account();
        this.smtpServers = new FormControl();

        this.privilegeList = this.applicationContext.getPrivileges();
        this.filteredStatus = this.statusControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                return this.applicationContext.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
            })
        );

        this.accountService.getAllSmtpServer().subscribe(
            data => {
                console.log('Data', data);
                this.smtpServerList = data;
            }
        )
    }

    newSmtpServer() {
        this.isAddNewSmtp = true;
        this.aNewSmtpServer = {} as SmtpProperties;
    }

    saveNewSmtpServer() {

    }

    cancelNewSmtpServer() {
        this.isAddNewSmtp = false;
        this.aNewSmtpServer = null;
    }

    save() {
        this.account.status = this.statusControl.value;
        const accountr = new AccountRequest(this.account);
        accountr.smtpPropertiesIds = _.map(this.account.smtpProperties, x => x.id);
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

    openDialogNewSmtp(event?: Event) {
        if (event) {
            event.stopPropagation()
        }

        const dialogRef = this.dialog.open(SmtpDialogComponent, {
            width: '800px',
            disableClose: true,
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('result', result);
                const accountId = this.applicationContext.getAccountId();
                this.accountService.createNewSmtp(accountId, result).subscribe(
                    data => {
                        this.applicationContext.info("A SMTP server was created!");
                        this.smtpServerList.push(data);
                    }
                );
            }
        });
    }
}
