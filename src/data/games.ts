export interface Game {
  id: string
  title: string
  coverUrl: string
  category: 'action' | 'rpg' | 'shooter' | 'strategy' | 'casual'
  rating: number
  isFree: boolean
  description: string
  tags: string[]
  publishedAt: string
}

export const games: Game[] = [
  {
    id: '1',
    title: 'Shadow Realm Chronicles',
    coverUrl: 'https://picsum.photos/seed/game1/640/360',
    category: 'action',
    rating: 4.5,
    isFree: false,
    description: 'An epic action game set in a dark fantasy world. Battle demons, uncover ancient secrets, and forge your legend across vast, hand-crafted environments.',
    tags: ['dark fantasy', 'combat', 'open world'],
    publishedAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Neon Blitz',
    coverUrl: 'https://picsum.photos/seed/game2/640/360',
    category: 'action',
    rating: 3.8,
    isFree: true,
    description: 'Fast-paced cyberpunk brawler with vibrant neon aesthetics. Fight through neon-lit streets, upgrade your cyber-implants, and take down the corporate overlords.',
    tags: ['cyberpunk', 'brawler', 'upgrade'],
    publishedAt: '2024-05-20',
  },
  {
    id: '3',
    title: 'Eternal Quest Online',
    coverUrl: 'https://picsum.photos/seed/game3/640/360',
    category: 'rpg',
    rating: 4.7,
    isFree: false,
    description: 'A massive online RPG with hundreds of hours of content. Choose your class, build your character, and explore a living world filled with quests and adventure.',
    tags: ['mmorpg', 'fantasy', 'multiplayer'],
    publishedAt: '2023-11-01',
  },
  {
    id: '4',
    title: 'Dragon Forge',
    coverUrl: 'https://picsum.photos/seed/game4/640/360',
    category: 'rpg',
    rating: 4.2,
    isFree: true,
    description: 'Craft weapons, tame dragons, and build your empire in this sprawling RPG. An engaging story with rich lore and deep character customization awaits.',
    tags: ['crafting', 'dragons', 'empire building'],
    publishedAt: '2024-01-10',
  },
  {
    id: '5',
    title: 'Apex Strike',
    coverUrl: 'https://picsum.photos/seed/game5/640/360',
    category: 'shooter',
    rating: 4.4,
    isFree: true,
    description: 'Competitive tactical shooter with hero abilities and fast-paced gameplay. Master unique agents, coordinate with your team, and climb the ranked ladder.',
    tags: ['tactical', 'competitive', 'fps'],
    publishedAt: '2023-08-22',
  },
  {
    id: '6',
    title: 'Void Hunter',
    coverUrl: 'https://picsum.photos/seed/game6/640/360',
    category: 'shooter',
    rating: 3.5,
    isFree: false,
    description: 'Survive the void in this intense sci-fi shooter. Hunt alien creatures across procedurally generated planets and collect rare resources to upgrade your arsenal.',
    tags: ['sci-fi', 'survival', 'procedural'],
    publishedAt: '2024-02-14',
  },
  {
    id: '7',
    title: 'Empire Architect',
    coverUrl: 'https://picsum.photos/seed/game7/640/360',
    category: 'strategy',
    rating: 4.6,
    isFree: false,
    description: 'Build and manage a thriving empire across thousands of years of history. Manage resources, lead armies, conduct diplomacy, and leave a lasting legacy.',
    tags: ['grand strategy', 'historical', '4x'],
    publishedAt: '2023-12-05',
  },
  {
    id: '8',
    title: 'Tower Command',
    coverUrl: 'https://picsum.photos/seed/game8/640/360',
    category: 'strategy',
    rating: 3.2,
    isFree: true,
    description: 'Classic tower defense reimagined with modern mechanics. Place towers, upgrade defenses, and survive relentless waves of increasingly powerful enemies.',
    tags: ['tower defense', 'wave survival', 'upgrade'],
    publishedAt: '2024-04-01',
  },
  {
    id: '9',
    title: 'Puzzle Garden',
    coverUrl: 'https://picsum.photos/seed/game9/640/360',
    category: 'casual',
    rating: 4.1,
    isFree: true,
    description: 'A relaxing puzzle game with beautiful garden themes. Solve hundreds of hand-crafted puzzles at your own pace and decorate your virtual garden oasis.',
    tags: ['puzzle', 'relaxing', 'casual'],
    publishedAt: '2024-06-10',
  },
  {
    id: '10',
    title: 'Star Match Fever',
    coverUrl: 'https://picsum.photos/seed/game10/640/360',
    category: 'casual',
    rating: 2.9,
    isFree: true,
    description: 'Addictive match-three puzzle game with a cosmic twist. Collect stars, unlock new galaxies, and challenge friends on weekly leaderboards.',
    tags: ['match-3', 'puzzle', 'leaderboard'],
    publishedAt: '2024-07-04',
  },
  {
    id: '11',
    title: 'Iron Fortress',
    coverUrl: 'https://picsum.photos/seed/game11/640/360',
    category: 'action',
    rating: 3.9,
    isFree: false,
    description: 'Defend your fortress against relentless siege attacks. Combine action combat with real-time tactics to repel invaders and strengthen your stronghold.',
    tags: ['defense', 'tactics', 'medieval'],
    publishedAt: '2024-03-28',
  },
  {
    id: '12',
    title: 'Mystic Journey',
    coverUrl: 'https://picsum.photos/seed/game12/640/360',
    category: 'rpg',
    rating: 4.8,
    isFree: false,
    description: 'Embark on a breathtaking journey through mystical lands. This award-winning RPG features a deeply emotional story, stunning visuals, and memorable characters.',
    tags: ['story-rich', 'emotional', 'award-winning'],
    publishedAt: '2023-09-18',
  },
]

export function getFeaturedGames(): Game[] {
  return games
    .filter((g) => g.rating >= 4.0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
}
