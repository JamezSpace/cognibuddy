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
}
