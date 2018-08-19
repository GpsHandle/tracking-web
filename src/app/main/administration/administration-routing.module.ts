import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { AdministrationComponent} from "./administration.component";
import { AuthGuard} from 'app/guards/auth.guard';
import { AccountComponent} from "./account/account.component";
import { DeviceComponent} from "./device/device.component";
import { CompanyComponent } from 'app/main/administration/company/company.component';
import { SysAdminGuard } from 'app/guards/sys-admin.guard';
const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            {
                path: '_account',
                component: AccountComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '_company',
                component: CompanyComponent,
                canActivate: [SysAdminGuard],
                canLoad: [SysAdminGuard]
            },
            {
                path: 'contact',
                loadChildren: 'app/main/administration/contact/contact.module#ContactModule',
                canActivate: [AuthGuard]
            },
            {
                path: '_device',
                loadChildren: 'app/main/administration/device/device.module#DeviceModule',
                canActivate: [AuthGuard]
            },
            {
                path: '_driver',
                loadChildren: 'app/main/administration/driver/driver.module#DriverModule',
                canActivate: [AuthGuard]
            },
            {
                path: '_geozone',
                loadChildren: 'app/main/administration/geozone/geozone.module#GeozoneModule',
                canActivate: [AuthGuard]
            },
            {
                path: '_alert',
                loadChildren: 'app/main/administration/alert-profile/alert-profile.module#AlertProfileModule',
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
