import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'app/main/administration/account/component/account-list/account.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
