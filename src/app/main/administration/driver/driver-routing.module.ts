import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from 'app/main/administration/driver/component/driver-list/driver.component';

const routes: Routes = [
    {
        path: '',
        component: DriverComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DriverRoutingModule { }
