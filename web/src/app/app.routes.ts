import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { ANRQ } from '../pages/tests/anrq/anrq';
import { EPDS } from '../pages/tests/epds/epds';
import { PASS } from '../pages/tests/pass/pass';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "tests/anrq", component: ANRQ },
    { path: "tests/epds", component: EPDS },
    { path: "tests/pass", component: PASS },
];
