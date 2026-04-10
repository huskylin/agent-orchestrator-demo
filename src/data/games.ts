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
  // action (3)
  {
    id: 'action-001',
    title: 'Shadow Strike',
    coverUrl: 'https://picsum.photos/seed/shadow-strike/400/600',
    category: 'action',
    rating: 4.5,
    isFree: false,
    description:
      'A fast-paced action game where you fight through waves of enemies using stealth and combat skills. Master dozens of weapons and abilities to become the ultimate shadow warrior. Every level introduces new challenges that test your reflexes and strategy.',
    tags: ['stealth', 'combat', 'singleplayer'],
    publishedAt: '2024-03-15',
  },
  {
    id: 'action-002',
    title: 'Iron Fist Rising',
    coverUrl: 'https://picsum.photos/seed/iron-fist/400/600',
    category: 'action',
    rating: 3.8,
    isFree: true,
    description:
      'Battle hordes of mechanical enemies in this explosive action platformer. Upgrade your exosuit and unlock powerful combo attacks to dominate the battlefield. A thrilling free-to-play experience with regular content updates.',
    tags: ['platformer', 'sci-fi', 'upgrades'],
    publishedAt: '2023-11-20',
  },
  {
    id: 'action-003',
    title: 'Neon Blades',
    coverUrl: 'https://picsum.photos/seed/neon-blades/400/600',
    category: 'action',
    rating: 4.2,
    isFree: false,
    description:
      'A cyberpunk hack-and-slash set in a sprawling neon-lit city. Combine blade techniques with hacking abilities to take down corrupt corporations. Stunning visuals and a pulse-pounding soundtrack make every fight unforgettable.',
    tags: ['cyberpunk', 'hack-and-slash', 'story-rich'],
    publishedAt: '2024-07-01',
  },

  // rpg (3)
  {
    id: 'rpg-001',
    title: 'Ember Throne',
    coverUrl: 'https://picsum.photos/seed/ember-throne/400/600',
    category: 'rpg',
    rating: 4.8,
    isFree: false,
    description:
      'An epic open-world RPG with a deeply branching narrative and hundreds of hours of content. Build your character from scratch and shape the fate of an entire kingdom through your choices. Rich lore and memorable companions await at every turn.',
    tags: ['open-world', 'story-rich', 'fantasy'],
    publishedAt: '2023-09-05',
  },
  {
    id: 'rpg-002',
    title: 'Wandering Souls',
    coverUrl: 'https://picsum.photos/seed/wandering-souls/400/600',
    category: 'rpg',
    rating: 3.5,
    isFree: true,
    description:
      'A charming mobile-style RPG where you collect and train spirit companions on a quest to restore a shattered world. Turn-based battles reward thoughtful team composition and careful planning. Free to play with optional cosmetic purchases.',
    tags: ['turn-based', 'collect', 'companions'],
    publishedAt: '2024-01-18',
  },
  {
    id: 'rpg-003',
    title: 'Crimson Legacy',
    coverUrl: 'https://picsum.photos/seed/crimson-legacy/400/600',
    category: 'rpg',
    rating: 4.1,
    isFree: false,
    description:
      'Step into a gothic dark fantasy world filled with ancient curses and political intrigue. Every decision carries weight as you navigate alliances between warring noble houses. A mature narrative experience with tactical real-time combat.',
    tags: ['dark-fantasy', 'tactical', 'narrative'],
    publishedAt: '2024-05-22',
  },

  // shooter (3)
  {
    id: 'shooter-001',
    title: 'Void Protocol',
    coverUrl: 'https://picsum.photos/seed/void-protocol/400/600',
    category: 'shooter',
    rating: 4.6,
    isFree: false,
    description:
      'A tactical first-person shooter where teamwork and precise communication determine victory. Maps are designed for competitive play with multiple strategic routes and dynamic objectives. Ranked seasons and seasonal cosmetics keep the meta fresh.',
    tags: ['tactical', 'competitive', 'multiplayer'],
    publishedAt: '2023-06-10',
  },
  {
    id: 'shooter-002',
    title: 'Galaxy Rangers',
    coverUrl: 'https://picsum.photos/seed/galaxy-rangers/400/600',
    category: 'shooter',
    rating: 3.2,
    isFree: true,
    description:
      'Jump into chaotic space battles as one of many unique rangers, each with a signature weapon set. Fast respawn times and short match lengths make it perfect for quick sessions. A great free entry point into the hero-shooter genre.',
    tags: ['hero-shooter', 'sci-fi', 'casual'],
    publishedAt: '2023-02-14',
  },
  {
    id: 'shooter-003',
    title: 'Outbreak Zero',
    coverUrl: 'https://picsum.photos/seed/outbreak-zero/400/600',
    category: 'shooter',
    rating: 4.0,
    isFree: false,
    description:
      'A co-op survival shooter set in a post-apocalyptic city overrun by mutant creatures. Scavenge for supplies, fortify safe houses, and complete missions before the infection spreads further. Four-player co-op with cross-platform support.',
    tags: ['co-op', 'survival', 'horror'],
    publishedAt: '2024-02-28',
  },

  // strategy (2)
  {
    id: 'strategy-001',
    title: 'Empire Reborn',
    coverUrl: 'https://picsum.photos/seed/empire-reborn/400/600',
    category: 'strategy',
    rating: 4.3,
    isFree: false,
    description:
      'Build and expand your civilization across procedurally generated continents in this turn-based grand strategy game. Manage diplomacy, economics, and military campaigns to achieve dominance. Modding support and an active community ensure endless replayability.',
    tags: ['turn-based', 'grand-strategy', 'civilization'],
    publishedAt: '2023-08-30',
  },
  {
    id: 'strategy-002',
    title: 'Tower of Ages',
    coverUrl: 'https://picsum.photos/seed/tower-of-ages/400/600',
    category: 'strategy',
    rating: 2.9,
    isFree: true,
    description:
      'A tower-defense strategy game with a unique mechanic: towers evolve through historical eras as enemies grow stronger. Experiment with different era combinations to find the perfect defensive layout. Free to play with no pay-to-win mechanics.',
    tags: ['tower-defense', 'historical', 'free-to-play'],
    publishedAt: '2023-12-05',
  },

  // casual (3)
  {
    id: 'casual-001',
    title: 'Garden Bliss',
    coverUrl: 'https://picsum.photos/seed/garden-bliss/400/600',
    category: 'casual',
    rating: 4.4,
    isFree: true,
    description:
      'Grow and customize your dream garden in this relaxing puzzle game with hundreds of levels. Trade plants with friends and participate in seasonal events to unlock rare decorations. Perfect for short play sessions or long lazy afternoons.',
    tags: ['puzzle', 'relaxing', 'social'],
    publishedAt: '2024-04-10',
  },
  {
    id: 'casual-002',
    title: 'Word Wizard',
    coverUrl: 'https://picsum.photos/seed/word-wizard/400/600',
    category: 'casual',
    rating: 3.7,
    isFree: true,
    description:
      'A daily word puzzle game that challenges your vocabulary with magical spellcasting themes. Complete the daily challenge and compare scores on global leaderboards. Simple to learn but surprisingly deep once you chase high scores.',
    tags: ['word', 'puzzle', 'daily-challenge'],
    publishedAt: '2023-10-01',
  },
  {
    id: 'casual-003',
    title: 'Cookie Craze',
    coverUrl: 'https://picsum.photos/seed/cookie-craze/400/600',
    category: 'casual',
    rating: 4.7,
    isFree: false,
    description:
      'Run your own cookie empire by matching ingredients, fulfilling orders, and unlocking new recipes. Dozens of themed worlds keep the gameplay fresh with new mechanics introduced gradually. A delightful game for all ages with charming hand-drawn art.',
    tags: ['match-3', 'cooking', 'family-friendly'],
    publishedAt: '2024-06-15',
  },
]

export function getFeaturedGames(): Game[] {
  return games
    .filter((game) => game.rating >= 4.0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
}
