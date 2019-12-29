import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {AccountService} from "../../../../../services/account.service";
import {Account} from "../../../../../models/account";
import {Privilege} from "../../../../../models/privilege";
import {ApplicationContext} from "../../../../../application-context";
import {FormControl} from "@angular/forms";

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
    privilegeList: Array<Privilege>;

    statusControl: FormControl = new FormControl();
    filteredStatus: Observable<string[]>;

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
                const accountId = params['id'];
                return this.accountService.getById(accountId)
            })
        ).subscribe(data => {
            this.account = data;
            this.statusControl.setValue(this.account.status);
        });
    }
}
