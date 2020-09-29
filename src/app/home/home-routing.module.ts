import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import {AboutComponent} from "./about/about.component";
import {HelpComponent} from "./help/help.component";
import {TosComponent} from "./tos/tos.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      children: [
        { path: 'about', component: AboutComponent, pathMatch: 'full'},
        { path: 'privacy', component: PrivacyPolicyComponent, pathMatch: 'full'},
        { path: 'tos', component: TosComponent, pathMatch: 'full'},
        { path: 'help', component: HelpComponent, pathMatch: 'full'},
      ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
