import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
    { path: 'login', loadComponent: () => import('./user/componnents/login/login.component').then(c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import('./user/componnents/register/register.component').then(c => c.RegisterComponent) },
    { path: 'logout', loadComponent: () => import('./user/componnents/logout/logout.component').then(c => c.LogoutComponent) },
    { path: 'recipies', loadChildren: () => import('./recipe/recipe.module').then(c => c.RecipeModule) },
    { path: '**', component: NotFoundComponent }

];
