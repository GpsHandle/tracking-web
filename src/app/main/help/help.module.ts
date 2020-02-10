import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage/usage.component';
import { HelpRoutingModule } from 'app/main/help/help-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HelpComponent } from './help.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule,
        MatListModule,
        MatSidenavModule
    ],
    declarations: [
        UsageComponent,
        HelpComponent
    ]
})
export class HelpModule { }
