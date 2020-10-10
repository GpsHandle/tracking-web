import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DriverAddComponent} from "./component/driver-add/driver-add.component";
import {DriverViewEditComponent} from "./component/driver-view-edit/driver-view-edit.component";
import {DriverComponent} from "./component/driver-list/driver.component";

const routes: Routes = [
    {
        path: '',
        component: DriverComponent,
        children:[
        ]
    },
    { path: 'add', component: DriverAddComponent },
    { path: ':id', component: DriverViewEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DriverRoutingModule { }
