import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { ANRQ } from '../pages/tests/anrq/anrq';
import { EPDS } from '../pages/tests/epds/epds';
import { PASS } from '../pages/tests/pass/pass';
import { NotFound } from '../pages/not-found/not-found';
import { About } from '../pages/about/about';
import { PatientRegisterComponent } from '../pages/patient/patient-register.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "tests/anrq", component: ANRQ },
    { path: "tests/epds", component: EPDS },
    { path: "tests/pass", component: PASS },
    { path: "about", component: About },
    { path: "patient/register", component: PatientRegisterComponent },
    { path: 'admin', component: AdminDashboard },
    { path: 'midwife', component: MidwifeDashboard },
    { path: '**', component: NotFound } // <---- Si van a registrar rutas, esta DEBE SER LA ULTIMA EN LA LISTA SIEMPRE
];
