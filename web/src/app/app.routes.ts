import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { TestRunnerComponent } from '../pages/tests/test-runner.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "tests/:code", component: TestRunnerComponent },
];
