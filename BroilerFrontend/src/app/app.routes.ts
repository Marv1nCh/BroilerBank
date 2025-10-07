import { Routes } from '@angular/router';

export const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./pages/users/users').then(
            (m) => m.Users
        )
    }
},
{
    path: 'products',
    loadComponent: () => {
        return import('./pages/products/products').then(
            (m) => m.Products
        )
    }
},
{
    path: 'purchases',
    loadComponent: () => {
        return import('./pages/purchases/purchases').then(
            (m) => m.Purchases
        )
    }
},
{
    path: 'leaderboard',
    loadComponent: () => {
        return import('./pages/leaderboard/leaderboardPage').then(
            (m) => m.LeaderboardPage
        )
    }
}];