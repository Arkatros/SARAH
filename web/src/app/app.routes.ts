import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/not-found/not-found';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { MidwifeDashboard } from './features/midwife/pages/midwife-dashboard/midwife-dashboard';

export const routes: Routes = [
    { path: "", component: Home },
    { path: '**', component: NotFound } ,
    { path: 'admin', component: AdminDashboard },
    { path: 'midwife', component: MidwifeDashboard }
];
