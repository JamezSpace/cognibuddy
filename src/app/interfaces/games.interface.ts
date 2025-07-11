export interface GameHistory {
    game: string;
    score: number;
    date_played: string;
}

export interface GameSummary {
    game: string;
    recentScore: number;
    averageScore: number;
    bestScore: number;
    timesPlayed: number;
    badges: string[];
    lastPlayed? : string;
}

export interface ChildGameProgress {
    child_id: string;
    name: string;
    progress: GameSummary[];
}