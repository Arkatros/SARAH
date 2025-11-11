import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { ANRQ } from '../pages/tests/anrq/anrq';
import { EPDS } from '../pages/tests/epds/epds';
import { PASS } from '../pages/tests/pass/pass';
import { NotFound } from '../pages/not-found/not-found';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { MidwifeDashboard } from './features/midwife/pages/midwife-dashboard/midwife-dashboard';
import { Roles } from '../core/models/roles';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { Login } from './features/auth/pages/login/login';
import { About } from '../pages/about/about';
import { PatientRegisterComponent } from '../pages/patient/patient-register.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "tests/anrq", component: ANRQ },
    { path: "tests/epds", component: EPDS },
    { path: "tests/pass", component: PASS },
    { path: 'admin', component: AdminDashboard,  canActivate: [authGuard, roleGuard], data: { requiredRole: Roles.ADMIN } },
    { path: 'midwife', component: MidwifeDashboard, canActivate: [authGuard, roleGuard], data: { requiredRole: Roles.MIDWIFE } },
    { path: 'login', component: Login},
    { path: "about", component: About },
    { path: "patient/register", component: PatientRegisterComponent },
    { path: '**', component: NotFound } // <---- Si van a registrar rutas, esta DEBE SER LA ULTIMA EN LA LISTA SIEMPRE
];
