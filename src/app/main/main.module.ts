import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MaterialShared} from 'app/shared/material-shared';
import { ProfileComponent } from 'app/main/profile/profile.component';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomDirectivesModule,
        MaterialShared,
        MainRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
    ],
    declarations: [
        MainComponent,
        ProfileComponent,
        MainNavComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class MainModule { }
