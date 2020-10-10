import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, registerLocaleData} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {MaterialShared} from './shared/material-shared';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {ApplicationContext} from './application-context';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {SpinnerComponent} from './pages/spinner/spinner.component';
import {ErrorComponent} from './layouts/error/error.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {RegisterComponent} from './pages/register/register.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {DemoComponent} from './pages/demo/demo.component';
import {RootStoreModule} from './stores/root-store.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UniversalInterceptor} from "./interceptors/universal-interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import {CustomDirectivesModule} from "./directives/custom-directives.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        SpinnerComponent,
        ErrorComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        LogoutComponent,
        DemoComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialShared,
        AppRoutingModule,
        StoreModule.forRoot({}, {
            metaReducers: !environment.production ? [storeFreeze] : []
        }),
        EffectsModule.forRoot([]),
        CustomDirectivesModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25 // Retains last 25 states
        }),
        RootStoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        ReactiveFormsModule
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
        // WINDOW_PROVIDERS
    ],
    entryComponents: [
        SpinnerComponent
    ],

    bootstrap: [AppComponent],
})
export class AppModule {
}
