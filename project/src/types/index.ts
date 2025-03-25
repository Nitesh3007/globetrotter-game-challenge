export interface Destination {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

export interface GameState {
  currentDestination: Destination | null;
  score: number;
  totalPlayed: number;
  username: string | null;
  inviterId: string | null;
  inviterScore: number | null;
  setUsername: (username: string) => void;
  incrementScore: () => void;
  incrementTotalPlayed: () => void;
  setCurrentDestination: (destination: Destination) => void;
  setInviterInfo: (id: string, score: number) => void;
}

export interface ShareCardProps {
  username: string;
  score: number;
  totalPlayed: number;
  playerId: string;
}