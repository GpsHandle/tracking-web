import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UniversalInterceptor} from "./core/interceptors/universal-interceptor";

@NgModule({
    imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule
],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
