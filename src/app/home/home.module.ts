import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContentComponent } from './home-content/home-content.component';
import {MaterialShared} from "../shared/material-shared";
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TosComponent } from './tos/tos.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, HomeContentComponent, AboutComponent, PrivacyPolicyComponent, TosComponent, HelpComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialShared
  ]
})
export class HomeModule { }
