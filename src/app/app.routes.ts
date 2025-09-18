import { Routes } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';
import { moviesRoutes } from './movies/movies.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: adminRoutes
  },
  {
    path: 'movies',
    children: moviesRoutes,
  },

  {
    path: '**',
    redirectTo: 'movies'
  }
];
