 // LAST HAND OS - Mock Data
 // Simulating blockchain state and off-chain game data
 
 import { GameCard, Player, Match, UserProfile, SessionWallet } from './gameTypes';
 
 // Card deck - would be NFTs on Sui in production
 export const CARD_DECK: GameCard[] = [
   // Attack Cards
   { id: 'atk-1', type: 'ATTACK', name: 'STRIKE', power: 20, description: 'Direct damage to opponent' },
   { id: 'atk-2', type: 'ATTACK', name: 'SLASH', power: 25, description: 'Heavy attack, risky' },
   { id: 'atk-3', type: 'ATTACK', name: 'PIERCE', power: 15, description: 'Bypasses some defense' },
   
   // Defense Cards
   { id: 'def-1', type: 'DEFENSE', name: 'BLOCK', power: 20, description: 'Reduce incoming damage' },
   { id: 'def-2', type: 'DEFENSE', name: 'SHIELD', power: 30, description: 'Strong defense' },
   { id: 'def-3', type: 'DEFENSE', name: 'PARRY', power: 15, description: 'Counter if attacked' },
   
   // Trick Cards
   { id: 'trk-1', type: 'TRICK', name: 'FEINT', power: 10, description: 'Reveal opponent card' },
   { id: 'trk-2', type: 'TRICK', name: 'STEAL', power: 0, description: 'Take opponent health' },
   { id: 'trk-3', type: 'TRICK', name: 'MIRROR', power: 0, description: 'Copy opponent move' },
   
   // Special Cards
   { id: 'spc-1', type: 'SPECIAL', name: 'HEAL', power: 25, description: 'Restore health' },
   { id: 'spc-2', type: 'SPECIAL', name: 'DOUBLE', power: 0, description: 'Double next attack' },
   { id: 'spc-3', type: 'SPECIAL', name: 'VOID', power: 0, description: 'Cancel all actions' },
 ];
 
 // Get random cards for a player
 export function getRandomCards(count: number): GameCard[] {
   const shuffled = [...CARD_DECK].sort(() => Math.random() - 0.5);
   return shuffled.slice(0, count);
 }
 
 // Mock players in lobby
 export const MOCK_PLAYERS: Player[] = [
   { id: 'p1', ensName: 'viper.eth', displayName: 'VIPER', health: 100, maxHealth: 100, cards: [], isConnected: true },
   { id: 'p2', ensName: 'shadow.eth', displayName: 'SHADOW', health: 100, maxHealth: 100, cards: [], isConnected: true },
   { id: 'p3', ensName: 'nova.eth', displayName: 'NOVA', health: 100, maxHealth: 100, cards: [], isConnected: true },
   { id: 'p4', ensName: 'phantom.eth', displayName: 'PHANTOM', health: 100, maxHealth: 100, cards: [], isConnected: false },
 ];
 
 // Mock matches
 export const MOCK_MATCHES: Match[] = [
   {
     id: 'm1',
     entryFee: 10,
     prizePool: 40,
     players: MOCK_PLAYERS.slice(0, 2),
     minPlayers: 4,
     maxPlayers: 8,
     currentRound: 0,
     totalRounds: 5,
     status: 'WAITING',
     roundTimeLimit: 15,
     createdAt: new Date(),
   },
   {
     id: 'm2',
     entryFee: 25,
     prizePool: 150,
     players: MOCK_PLAYERS.slice(0, 4),
     minPlayers: 4,
     maxPlayers: 6,
     currentRound: 2,
     totalRounds: 5,
     status: 'IN_PROGRESS',
     roundTimeLimit: 12,
     createdAt: new Date(Date.now() - 300000),
   },
 ];
 
 // Mock user profile
 export const MOCK_USER_PROFILE: UserProfile = {
   id: 'user-1',
   ensName: 'player.eth',
   displayName: 'PLAYER_ONE',
   totalMatches: 47,
   wins: 23,
   losses: 24,
   totalEarnings: 1250,
   totalSpent: 980,
   spendLimit: 500,
   preferences: {
     autoFold: true,
     soundEnabled: true,
     notifications: true,
   },
   pastMatches: [],
 };
 
 // Mock session wallet
 export const createMockSession = (userId: string, amount: number): SessionWallet => ({
   id: `session-${Date.now()}`,
   userId,
   lockedAmount: amount,
   balance: amount,
   permissions: ['PLAY_CARDS', 'AUTO_FOLD', 'RECEIVE_REWARDS'],
   status: 'ACTIVE',
   createdAt: new Date(),
   expiresAt: new Date(Date.now() + 3600000), // 1 hour
 });
 
 // Simulate blockchain delay
 export const simulateBlockchainDelay = (ms: number = 500): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms));
 };
 
 // Mock Sui PTB settlement
 export const mockSuiSettlement = async (matchId: string, winnerId: string, amount: number) => {
   await simulateBlockchainDelay(1000);
   return {
     txId: `0x${Math.random().toString(16).slice(2, 18)}`,
     matchId,
     winnerId,
     amount,
     timestamp: Date.now(),
     // In production: actual Sui PTB digest
   };
 };
 
 // Mock ENS resolver
 export const resolveENS = async (name: string): Promise<string> => {
   await simulateBlockchainDelay(200);
   // In production: would query ENS resolver contract
   return `0x${name.replace('.eth', '').padEnd(40, '0')}`;
 };