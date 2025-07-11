import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
    providedIn: 'root'
})
export class ChildDashboardService {

    constructor(private router: Router, private dialog: MatDialog) { }

    readonly username: string = localStorage.getItem('user_name') || 'Child';
    readonly _id: string = localStorage.getItem('user_id') || '';
    private access_token = localStorage.getItem('access_token') || '';

    async forceReload(route: string) {
        await this.router.navigateByUrl('/reload', { skipLocationChange: true });
        await this.router.navigate([route]);
    }

    goBack(): void {
        if (this.dialog.openDialogs.length > 0) {
            this.dialog.closeAll();

            this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/child']);
            });
        } else {
            this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/child']);
            });
        }
    }




    restriction = signal<{ session_limit: number | null, restricted_games: string[] }>({ session_limit: null, restricted_games: [] });

    async fetchGameRestrictions() {
        const res = await fetch(`${environment.backend.base_url}/games/limits/${this._id}`, {
            headers: { Authorization: `Bearer ${this.access_token}` }
        });

        const result = await res.json();
        if (result.status === 'success') {
            this.restriction.set(result.data);
        }
    }

    async checkGameAccess(game: string): Promise<{ allowed: boolean; reason?: string }> {
        const res1 = await fetch(`${environment.backend.base_url}/games/limits/${this._id}`, {
            headers: { Authorization: `Bearer ${this.access_token}` }
        });

        const restrictionResult = await res1.json();
        const { restricted_games = [], session_limit = null } = restrictionResult.data || {};
        console.log("Resticted games", restricted_games);
        console.log("Game", game);


        // 2. Check if the game is restricted
        if (restricted_games.includes(game)) {
            return { allowed: false, reason: 'Game is restricted for you.' };
        }

        // 3. Check session limit
        if (session_limit !== null) {
            const res2 = await fetch(`${environment.backend.base_url}/games/${game}/today-count`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });

            const countResult = await res2.json();
            const timesPlayedToday = countResult.count || 0;

            if (timesPlayedToday >= session_limit) {
                return { allowed: false, reason: 'You have reached today’s session limit.' };
            }
        }

        return { allowed: true };
    }


}
