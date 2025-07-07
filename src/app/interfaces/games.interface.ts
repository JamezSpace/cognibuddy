export interface GameHistory {
  game: string;
  score: number;
  date_played: string;
}

export interface GameSummary {
  game: string;
  latestScore: number;
  averageScore: number;
  badges: string[];
}