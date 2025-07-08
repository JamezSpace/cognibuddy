export interface Child {
    _id: string;
    name: string;
    age?: number;
    games_played?: number;
    best_score?: number;
    average_score?: number;
    badges?: string[];
}