import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/not-found/not-found';

export const routes: Routes = [
    { path: "", component: Home },
    { path: '**', component: NotFound } // <---- Si van a registrar rutas, esta DEBE SER LA ULTIMA EN LA LISTA SIEMPRE
];
