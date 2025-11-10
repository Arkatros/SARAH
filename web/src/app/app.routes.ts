import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/not-found/not-found';
import { ANRQ } from '../pages/tests/anrq/anrq';
import { EPDS } from '../pages/tests/epds/epds';
import { PASS } from '../pages/tests/pass/pass';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "tests/anrq", component: ANRQ },
    { path: "tests/epds", component: EPDS },
    { path: "tests/pass", component: PASS },
    { path: '**', component: NotFound } // <---- Si van a registrar rutas, esta DEBE SER LA ULTIMA EN LA LISTA SIEMPRE
];
