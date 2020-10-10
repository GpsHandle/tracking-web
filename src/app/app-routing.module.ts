/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent} from "./pages/not-found/not-found.component";
import { LoginComponent} from "./pages/login/login.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {AuthGuard} from "./guards/auth.guard";
import {ErrorComponent} from "./layouts/error/error.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {RegisterComponent} from "./pages/register/register.component";


const routes: Routes = [
    { path: '', redirectTo: 'web', pathMatch: 'full'},
    { path: 'web', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'login',    component: LoginComponent },
    { path: 'logout',   component: LogoutComponent },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    { path: 'error',            pathMatch: 'full', component: ErrorComponent },
    { path: 'forgot-password',  pathMatch: 'full', component: ForgotPasswordComponent },
    { path: 'register',         pathMatch: 'full', component: RegisterComponent },
    { path: 'not-found',        pathMatch: 'full', component: NotFoundComponent },
    { path: '**',               pathMatch: 'full', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
