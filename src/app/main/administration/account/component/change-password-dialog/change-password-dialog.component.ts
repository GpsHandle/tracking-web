import {Component, Inject, OnInit} from '@angular/core';
import {ApplicationContext} from '../../../../../application-context';
import {Account} from "../../../../../models/account";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from '../../../../../core/services/account.service';
import {ChangePasswdRequest} from '../../../../../models/change-passwd.request';

@Component({
    selector: 'app-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
    password: string;
    re_password: string;
    constructor(private appCtx: ApplicationContext,
                private accountService: AccountService,
                public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
    }

    onSave() {
        const request = new ChangePasswdRequest();
        request.id = this.data.id;
        request.password = this.password;
        request.rePassword = this.re_password;
        this.accountService.changePassword(request).subscribe(
            data => {
                this.appCtx.info("Password was updated successful");
                this.dialogRef.close();
            }
        );
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
