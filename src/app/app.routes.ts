import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ParentComponent } from './dashboards/parent/parent.component';
import { authGuard } from './core/guards/auth.guard';
import { ChildComponent } from './dashboards/child/child.component';
import { AdminComponent } from './dashboards/admin/admin.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'dashboard/parent',
        component: ParentComponent,
        // canActivate: [authGuard],
        // data: { roles: ['parent'] }
    },
    {
        path: 'dashboard/child',
        component: ChildComponent,
        canActivate: [authGuard],
        data: { roles: ['child'] }
    },
    {
        path: 'dashboard/admin',
        component: AdminComponent,
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    }
];
