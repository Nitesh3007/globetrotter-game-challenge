import { create } from 'zustand';
import { GameState } from '../types';

export const useGameStore = create<GameState>((set) => ({
  currentDestination: null,
  score: 0,
  totalPlayed: 0,
  username: null,
  inviterId: null,
  inviterScore: null,
  setUsername: (username) => set({ username }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementTotalPlayed: () => set((state) => ({ totalPlayed: state.totalPlayed + 1 })),
  setCurrentDestination: (destination) => set({ currentDestination: destination }),
  setInviterInfo: (id, score) => set({ inviterId: id, inviterScore: score }),
}));