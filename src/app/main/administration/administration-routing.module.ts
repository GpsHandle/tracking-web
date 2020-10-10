import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { AdministrationComponent} from "./layout/administration.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            {
                path: 'account',
                loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
                canActivate: [AuthGuard],
                data: {
                    authorities: [],
                    pageTitle: 'account.title'
                }
            },
            {
                path: 'device',
                loadChildren: () => import('./device/device.module').then(m => m.DeviceModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'driver',
                loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'geozone',
                loadChildren: () => import('./geozone/geozone.module').then(m => m.GeozoneModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'alert',
                loadChildren: () => import('./alert-profile/alert-profile.module').then(m => m.AlertProfileModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'unknown-device',
                loadChildren: () => import('./unknown-device/unknown-device.module').then(m => m.UnknownDeviceModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
