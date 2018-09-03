import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage/usage.component';
import { HelpRoutingModule } from 'app/main/help/help-routing.module';
import { MatListModule, MatSidenavModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule,
        MatListModule,
        MatSidenavModule
    ],
    declarations: [
        UsageComponent
    ]
})
export class HelpModule { }
