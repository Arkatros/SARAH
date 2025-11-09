import { Routes } from '@angular/router';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { MidwifeDashboard } from './features/midwife/pages/midwife-dashboard/midwife-dashboard';

//Después le agrego los guards para restringir el acceso
export const routes: Routes = [
    {
        path: 'admin',
        component: AdminDashboard
    },
    {
        path: 'midwife',
        component: MidwifeDashboard
    }
];
