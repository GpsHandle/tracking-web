/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard} from "app/guards/auth.guard";
import { NotFoundComponent} from "./pages/not-found/not-found.component";
import { LoginComponent} from "./pages/login/login.component";
import { ErrorComponent } from 'app/layouts/error/error.component';
import { ForgotPasswordComponent } from 'app/pages/forgot-password/forgot-password.component';
import { RegisterComponent } from 'app/pages/register/register.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login',    component: LoginComponent },
    { path: 'logout',   component: LogoutComponent },
    {
        path: 'main',
        loadChildren: () => import('app/main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    { path: 'error',            pathMatch: 'full', component: ErrorComponent },
    { path: 'forgot-password',  pathMatch: 'full', component: ForgotPasswordComponent },
    { path: 'register',         pathMatch: 'full', component: RegisterComponent },
    { path: 'not-found',        pathMatch: 'full', component: NotFoundComponent },
    { path: '**',               pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
