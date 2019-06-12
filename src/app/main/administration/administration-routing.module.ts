import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { AdministrationComponent} from "./administration.component";
import { AuthGuard} from 'app/guards/auth.guard';
import { SysAdminGuard } from 'app/guards/sys-admin.guard';
const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            {
                path: '_account',
                loadChildren: () => import('app/main/administration/account/account.module').then(m => m.AccountModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_company',
                loadChildren: () => import('app/main/administration/company/company.module').then(m => m.CompanyModule),
                canActivate: [SysAdminGuard],
                canLoad: [SysAdminGuard]
            },
            {
                path: 'contact',
                loadChildren: () => import('app/main/administration/contact/contact.module').then(m => m.ContactModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_device',
                loadChildren: () => import('app/main/administration/device/device.module').then(m => m.DeviceModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_driver',
                loadChildren: () => import('app/main/administration/driver/driver.module').then(m => m.DriverModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_geozone',
                loadChildren: () => import('app/main/administration/geozone/geozone.module').then(m => m.GeozoneModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_alert',
                loadChildren: () => import('app/main/administration/alert-profile/alert-profile.module').then(m => m.AlertProfileModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'unknown-device',
                loadChildren: () => import('app/main/administration/unknown-device/unknown-device.module').then(m => m.UnknownDeviceModule),
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
