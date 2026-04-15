export interface DailyActiveUser {
  date: string;
  count: number;
}

export interface GameByCategory {
  category: string;
  count: number;
}

export interface TopGame {
  id: string;
  title: string;
  views: number;
}

export interface RecentComment {
  id: string;
  user: string;
  content: string;
  gameTitle: string;
  createdAt: string;
}

export interface SummaryStats {
  todayActive: number;
  monthNewUsers: number;
  totalGames: number;
  totalComments: number;
}

function generateDailyActiveUsers(): DailyActiveUser[] {
  const data: DailyActiveUser[] = [];
  const today = new Date('2026-04-15');
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const count = Math.floor(800 + Math.random() * 400 + Math.sin(i) * 100);
    data.push({ date, count });
  }
  return data;
}

export const dailyActiveUsers: DailyActiveUser[] = generateDailyActiveUsers();

export const gamesByCategory: GameByCategory[] = [
  { category: 'Action', count: 42 },
  { category: 'RPG', count: 35 },
  { category: 'Shooter', count: 28 },
  { category: 'Strategy', count: 21 },
  { category: 'Casual', count: 54 },
  { category: 'Simulation', count: 17 },
  { category: 'Sports', count: 13 },
];

export const topGames: TopGame[] = [
  { id: '1', title: 'Shadow Realm Chronicles', views: 98420 },
  { id: '3', title: 'Eternal Quest Online', views: 87310 },
  { id: '5', title: 'Apex Strike', views: 76540 },
  { id: '12', title: 'Mystic Journey', views: 65230 },
  { id: '7', title: 'Empire Architect', views: 54980 },
  { id: '2', title: 'Neon Blitz', views: 48760 },
  { id: '4', title: 'Dragon Forge', views: 41250 },
  { id: '9', title: 'Puzzle Garden', views: 36800 },
  { id: '11', title: 'Iron Fortress', views: 28430 },
  { id: '6', title: 'Void Hunter', views: 21900 },
];

export const recentComments: RecentComment[] = [
  {
    id: 'c1',
    user: 'player_alex',
    content: 'This game is absolutely amazing! The combat system is so fluid.',
    gameTitle: 'Shadow Realm Chronicles',
    createdAt: '2026-04-15T08:23:00Z',
  },
  {
    id: 'c2',
    user: 'gamer_jane',
    content: 'Love the multiplayer experience. Highly recommend to all RPG fans.',
    gameTitle: 'Eternal Quest Online',
    createdAt: '2026-04-15T07:45:00Z',
  },
  {
    id: 'c3',
    user: 'sniper_bob',
    content: 'Best tactical shooter I have played this year. Balanced and fun.',
    gameTitle: 'Apex Strike',
    createdAt: '2026-04-14T22:10:00Z',
  },
  {
    id: 'c4',
    user: 'quest_master',
    content: 'The story in this game made me cry. 10/10 storytelling.',
    gameTitle: 'Mystic Journey',
    createdAt: '2026-04-14T19:55:00Z',
  },
  {
    id: 'c5',
    user: 'empire_builder',
    content: 'Classic grand strategy done right. Hours just fly by.',
    gameTitle: 'Empire Architect',
    createdAt: '2026-04-14T15:30:00Z',
  },
  {
    id: 'c6',
    user: 'neon_rider',
    content: 'Free to play but feels premium. Great job devs!',
    gameTitle: 'Neon Blitz',
    createdAt: '2026-04-14T12:00:00Z',
  },
  {
    id: 'c7',
    user: 'casual_gamer',
    content: 'Super relaxing game. Perfect for winding down after work.',
    gameTitle: 'Puzzle Garden',
    createdAt: '2026-04-13T21:15:00Z',
  },
  {
    id: 'c8',
    user: 'dragon_tamer',
    content: 'The dragon taming mechanic is super creative!',
    gameTitle: 'Dragon Forge',
    createdAt: '2026-04-13T17:40:00Z',
  },
];

export const summaryStats: SummaryStats = {
  todayActive: 1243,
  monthNewUsers: 5820,
  totalGames: 210,
  totalComments: 18340,
};
