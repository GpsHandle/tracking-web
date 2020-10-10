import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GeozoneComponent} from "./geozone.component";
const routes: Routes = [
    {
        path: '',
        component: GeozoneComponent,
        children:[
            // { path: 'list',         component: ListGeozoneComponent,    canActivate: [AuthGuard] },
            // { path: 'add-edit',     component: AddEditGeozoneComponent,    canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GeozoneRoutingModule { }
