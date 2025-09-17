import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const adminRoutes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'dashboard', component: AdminDashboardComponent }
];