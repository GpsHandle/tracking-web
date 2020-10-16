import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './layout/content/account.component';
import {LogoutComponent} from "./logout/logout.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ActivateComponent} from "./activate/activate.component";

const routes: Routes = [
    { path: '', redirectTo: 'c/register', pathMatch: 'full' },
    { path: 'c', component: AccountComponent,
        children: [
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, pathMatch: 'full' },
            { path: 'activate', component: ActivateComponent },
            { path: 'res',  pathMatch: 'full', component: ForgotPasswordComponent },
        ]
    },
    { path: '**', redirectTo: 'c/login' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
