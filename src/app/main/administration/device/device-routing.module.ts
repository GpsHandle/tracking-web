import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from 'app/main/administration/device/component/device-list/device.component';
import {AuthGuard} from "../../../guards/auth.guard";
import {DeviceAddComponent} from "./component/device-add/device-add.component";
import {DeviceViewEditComponent} from "./component/device-view-edit/device-view-edit.component";

const routes: Routes = [
    {
        path: '',
        component: DeviceComponent,
        children:[
        ]
    },
    { path: 'add', component: DeviceAddComponent, canActivate: [AuthGuard] },
    { path: ':id', component: DeviceViewEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceRoutingModule { }
