/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent} from "./pages/not-found/not-found.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ErrorComponent} from "./layouts/error/error.component";
import {EmailConfirmationGuard} from "./core/guards/email-confirmation.guard";

const routes: Routes = [
    { path: '', redirectTo: 'web', pathMatch: 'full'},
    { path: 'web', loadChildren: () => import('./webw/home.module').then(m => m.HomeModule) },
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard, EmailConfirmationGuard],
        canActivateChild: [AuthGuard]
    },
    { path: 'error',            pathMatch: 'full', component: ErrorComponent },
    { path: 'not-found',        pathMatch: 'full', component: NotFoundComponent },
    // { path: '**',               pathMatch: 'full', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled',
        enableTracing: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
