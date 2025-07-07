export interface EmotionCard {
  id: number;
  label: string;        // e.g., "Happy"
  type: 'label' | 'image';
  value: string;        // either emoji or label
  matched: boolean;
  flipped: boolean;
}