import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import {AboutComponent} from "./about/about.component";
import {HelpComponent} from "./help/help.component";
import {TosComponent} from "./tos/tos.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {HomeContentComponent} from "./home-content/home-content.component";

const routes: Routes = [
  { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
    {
      path: 'pages',
      component: HomeComponent,
      children: [
        { path: 'main', component: HomeContentComponent, pathMatch: 'full'},
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
