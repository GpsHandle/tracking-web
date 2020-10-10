import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {ApplicationContext} from "../../../../../application-context";
import {FormControl} from "@angular/forms";
import {AccountRequest} from "../../../../../models/request/account.request";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";
import {MailProperties} from "../../../../../models/mail-properties";
import {lowerCase} from 'lodash-es'

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss'],
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

    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private accountService: AccountService,
                private dialog: MatDialog) { }

    ngOnInit() {
        this.account = new Account();
        this.privilegeList = this.applicationContext.getPrivileges();
        this.statusControl.disable();
        this.filteredStatus = this.statusControl.valueChanges.pipe(
                startWith(''),
                map(value => {
                    return this.applicationContext.statusList.filter(opt => lowerCase(opt).indexOf(lowerCase(value)) === 0);
                })
            );

        this.route.params.pipe(
            switchMap(params => {
                this.accountId = params['id'];
                return this.accountService.getById(this.accountId)
            })
        ).subscribe((data: Account) => {
            this.account = data;
            if (this.account.mailProperties == null) {
                this.account.mailProperties = new MailProperties();
            }
            this.statusControl.setValue(this.account.status);
        });
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
