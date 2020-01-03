import {Component, Inject, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../../../application-context";
import {Account} from "../../../../../models/account";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../../../../services/account.service";
import {AccountRequest} from "../../../../../models/request/account.request";

@Component({
    selector: 'app-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
    password: string;
    re_password: string;
    constructor(private applicationContext: ApplicationContext,
                private accountService: AccountService,
                public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
    }

    onSave() {
        const acct = new AccountRequest();
        acct.id = this.data.id;
        acct.password = this.data.password;
        this.data.password = this.password;
        this.accountService.update(this.data.id, acct).subscribe(
            data => {
                this.applicationContext.info("Password was updated successful");
                this.dialogRef.close();
            }
        );
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
