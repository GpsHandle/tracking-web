import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {ApplicationContext} from "../../../../../application-context";
import {FormControl} from "@angular/forms";
import {MailProperties} from "../../../../../models/mail-properties";
import {animate, state, style, transition, trigger} from "@angular/animations";
import * as _ from 'lodash';
import {AccountRequest} from "../../../../../models/request/account.request";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
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

    aNewSmtpServer: MailProperties;
    columnsToDisplay = ['host', 'port'];
    expandedElement: MailProperties | null;
    smtpServers: FormControl;
    smtpServerList: Array<MailProperties>;
    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService,
                private dialog: MatDialog) { }

    ngOnInit() {
        this.account = new Account();
        this.smtpServers = new FormControl();
        this.privilegeList = this.applicationContext.getPrivileges();
        this.statusControl.disable()
        this.filteredStatus = this.statusControl.valueChanges.pipe(
                startWith(''),
                map(value => {
                    return this.applicationContext.statusList.filter(opt => _.lowerCase(opt).indexOf(_.lowerCase(value)) === 0);
                })
            );

        this.route.params.pipe(
            switchMap(params => {
                this.accountId = params['id'];
                return this.accountService.getById(this.accountId)
            })
        ).subscribe(data => {
            this.account = data;
            this.statusControl.setValue(this.account.status);
        });

        this.accountService.getAllSmtpServer().subscribe(
            data => {
                console.log('Data', data);
                this.smtpServerList = data;
            }
        )
    }

    addNewSmtpServer() {
        this.aNewSmtpServer = new MailProperties();
        this.isAddNewSmtp = true;
    }

    saveNewSmtpServer() {
        console.log('a new smtp server', this.aNewSmtpServer);
        this.aNewSmtpServer.accountId = this.accountId;
        this.accountService.createNewSmtp(this.accountId, this.aNewSmtpServer).subscribe(data => {
            console.log(data);
        })
    }

    cancelNewSmtpServer() {
        this.isAddNewSmtp = false;
        this.aNewSmtpServer = null;
    }

    editThisAccount() {
        this.isEditing = true;
        this.statusControl.enable();
    }

    saveEditedAccount() {
        this.account.status = this.statusControl.value;
        const accountR = new AccountRequest(this.account);
        this.accountService.update(this.accountId, accountR).subscribe(
            data => {
                this.applicationContext.info("An account was updated successfully!");
                this.applicationContext.navigate(['/main/admin/account'])
            },
            error => {},
            () => {}
        )
    }

    cancelEditedAccount() {
        this.isEditing = false;
        this.statusControl.disable();
    }

    openChangePasswdDialog() {
        const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
            width: '350px',
            disableClose: true,
            data: this.account
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //this.create(result);
            }
        });
    }
}
