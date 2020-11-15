import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {MaterialShared} from './shared/material-shared';
import {AuthInterceptor} from './core/interceptors/auth-interceptor';
import {ApplicationContext} from './application-context';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './core/services/auth.service';
import {AuthGuard} from './core/guards/auth.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {SpinnerComponent} from './shared/spinner/spinner.component';
import {ErrorComponent} from './layouts/error/error.component';
import {DemoComponent} from './pages/demo/demo.component';
import {RootModule} from './stores/root.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UniversalInterceptor} from "./core/interceptors/universal-interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import {CustomDirectivesModule} from "./core/directives/custom-directives.module";

import {QuillModule} from 'ngx-quill';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        SpinnerComponent,
        ErrorComponent,
        DemoComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialShared,
        AppRoutingModule,
        // StoreModule.forRoot({}, {
        //     metaReducers: !environment.production ? [storeFreeze] : []
        // }),
        EffectsModule.forRoot([]),
        CustomDirectivesModule,
        // StoreDevtoolsModule.instrument({
        //     maxAge: 25 // Retains last 25 states
        // }),
        // RootModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        QuillModule.forRoot(),

        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RootModule

    ],
    providers: [
        AuthService,
        AuthGuard,
        ApplicationContext,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UniversalInterceptor,
            multi: true
        },
    ],
    entryComponents: [
        SpinnerComponent
    ],

    bootstrap: [AppComponent],
})
export class AppModule {
}
