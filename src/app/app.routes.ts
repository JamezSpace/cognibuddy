import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ParentComponent } from './dashboards/parent/parent.component';
import { authGuard } from './core/guards/auth.guard';
import { ChildComponent } from './dashboards/child/child.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { ParentOverviewComponent } from './dashboards/parent-overview/parent-overview.component';
import { MyChildrenComponent } from './dashboards/my-children/my-children.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { ChildDashboardHomepageComponent } from './dashboards/child-dashboard-homepage/child-dashboard-homepage.component';
import { NumberTrailComponent } from './games/number-trail/number-trail.component';
import { EmotionMatchComponent } from './games/emotion-match/emotion-match.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'dashboard/parent',
        component: ParentComponent,
        canActivate: [authGuard],
        data: { roles: ['parent'] },
        children: [
            {
                path: '',
                component: ParentOverviewComponent
            },
            {
                path: 'children',
                component: MyChildrenComponent
            }
        ]
    },
    {
        path: 'dashboard/child',
        component: ChildComponent,
        canActivate: [authGuard],
        data: { roles: ['child'] },
        children: [
            {
                path: '',
                component: ChildDashboardHomepageComponent
            },
            {
                path: 'games/memory',
                component: MemoryGameComponent
            },
            {
                path: 'games/number-trail',
                component: NumberTrailComponent
            },
            {
                path: 'games/emotion-match',
                component: EmotionMatchComponent
            }
        ]
    },
    {
        path: 'dashboard/admin',
        component: AdminComponent,
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    }
];
