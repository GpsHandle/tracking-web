import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertProfileComponent } from 'app/main/administration/alert-profile/component/alert-profile-list/alert-profile.component';
import {AlertProfileEditComponent} from "./component/alert-profile-edit/alert-profile-edit.component";
import {AuthGuard} from "../../../guards/auth.guard";
import {AlertProfileAddComponent} from "./component/alert-profile-add/alert-profile-add.component";

const routes: Routes = [
    {
        path: '',
        component: AlertProfileComponent,
        children:[
        ]
    },
    { path: 'add', component: AlertProfileAddComponent, canActivate: [AuthGuard] },
    { path: ':id', component: AlertProfileEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertProfileRoutingModule { }
