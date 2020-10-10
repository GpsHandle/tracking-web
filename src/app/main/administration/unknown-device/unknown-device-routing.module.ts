import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnknownDeviceComponent} from "./unknown-device.component";

const routes: Routes = [
    {
        path: '',
        component: UnknownDeviceComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnknownDeviceRoutingModule { }
