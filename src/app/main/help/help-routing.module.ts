import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsageComponent} from "./usage/usage.component";
import {HelpComponent} from "./help.component";

const routes: Routes = [
    { path: '', component: HelpComponent, pathMatch: 'full' },
    { path: 'usage', component: UsageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HelpRoutingModule { }
