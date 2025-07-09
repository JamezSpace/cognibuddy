import { Component, OnInit, signal } from '@angular/core';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
    selector: 'parent-settings',
    imports: [ReactiveFormsModule, MatInputModule],
    templateUrl: './parent-settings.component.html',
    styleUrl: './parent-settings.component.css',
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class ParentSettingsComponent implements OnInit {
    constructor(private parentDashboardService: ParentDashboardService) {}

    get children() {
        return this.parentDashboardService.children();
    }

    limitForm = new FormGroup({
        session_limit: new FormControl(0)
    })

    restrictedGames = signal<string[]>([]);
    allGames = ['memory', 'emotion-match', 'number-trail'];

    async ngOnInit() {
        await this.loadGameLimits();
    }

    childSelectedId = signal('')
    childSelected(event: any) {
        this.childSelectedId.set(event.target.value);         
    }

    async loadGameLimits() {
        const result = await this.parentDashboardService.fetchGameLimit();

        console.log("Result from game limit", result);
        
        if (result.data) {
            this.limitForm.patchValue({ session_limit: result.data.session_limit });
            this.restrictedGames.set(result.data.restricted_games || []);
        }
    }

    toggleGameRestriction(game: string, event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        if (checked && !this.restrictedGames().includes(game)) {
            this.restrictedGames.update(games => [...games, game]);
        } else if (!checked) {
            this.restrictedGames.update(games => games.filter(g => g !== game));
        }
    }

    limitSaved = signal(false)
    async submitLimits() {
        const payload = {
            session_limit: this.limitForm.value.session_limit ?? null,
            restricted_games: this.restrictedGames()
        };
        await this.parentDashboardService.setGameLimit(this.childSelectedId(), payload);
        this.limitSaved.set(true);
    }
}
