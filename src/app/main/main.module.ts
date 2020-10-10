import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomDirectivesModule} from "../directives/custom-directives.module";
import {ProfileComponent} from "./profile/profile.component";
import {MaterialShared} from "../shared/material-shared";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomDirectivesModule,
        MaterialShared,
        MainRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
    ],
    declarations: [
        MainComponent,
        ProfileComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class MainModule { }
