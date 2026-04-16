import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { games } from '../data/games'

// Mock developer mapping since it's not in the Game interface yet
const developerMap: Record<string, string> = {
  '1': 'Dark Realm Studios',
  '2': 'Neon Pulse Games',
  '3': 'Eternal Worlds Inc.',
  '4': 'Dragon Forge Interactive',
  '5': 'Apex Entertainment',
  '6': 'Void Technologies',
  '7': 'Empire Interactive',
  '8': 'Tower Logic Studios',
  '9': 'Garden Games Co.',
  '10': 'Cosmic Match Ltd.',
  '11': 'Iron Castle Games',
  '12': 'Mystic Arts Studio',
}

// Mock system requirements since they're not in the Game interface yet
const systemRequirementsMap: Record<string, { minimum: string[]; recommended: string[] }> = {
  default: {
    minimum: [
      'OS: Windows 10 64-bit',
      'CPU: Intel Core i5-8400 / AMD Ryzen 5 1600',
      'RAM: 8 GB',
      'GPU: NVIDIA GTX 1060 / AMD RX 580',
      'Storage: 30 GB',
    ],
    recommended: [
      'OS: Windows 11 64-bit',
      'CPU: Intel Core i7-10700K / AMD Ryzen 7 3700X',
      'RAM: 16 GB',
      'GPU: NVIDIA RTX 3070 / AMD RX 6700 XT',
      'Storage: 30 GB SSD',
    ],
  },
}

const categoryLabels: Record<string, string> = {
  action: 'Action',
  rpg: 'RPG',
  shooter: 'Shooter',
  strategy: 'Strategy',
  casual: 'Casual',
}

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const game = games.find((g) => g.id === id)

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
        <p className="text-gray-400 mb-8">The game you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const developer = developerMap[game.id] ?? 'Unknown Developer'
  const sysReq = systemRequirementsMap[game.id] ?? systemRequirementsMap['default']
  const category = categoryLabels[game.category] ?? game.category

  const handlePlayNow = () => {
    // Placeholder: in a real app this would launch/redirect to the game
    alert(`Launching ${game.title}...`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero cover image */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            {game.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: main info */}
          <div className="flex-1 min-w-0">
            {/* Basic info row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Category badge */}
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {category}
              </span>

              {/* Price badge */}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  game.isFree
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {game.isFree ? 'Free to Play' : 'Paid'}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-lg">★</span>
                <span className="text-white font-semibold">{game.rating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">/ 5.0</span>
              </div>
            </div>

            {/* Developer */}
            <div className="mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Developer</span>
              <p className="text-white text-base mt-1 font-medium">{developer}</p>
            </div>

            {/* Published date */}
            <div className="mb-6">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Published</span>
              <p className="text-white text-base mt-1">{game.publishedAt}</p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Tags</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">About This Game</h2>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </div>

            {/* System Requirements */}
            <div>
              <h2 className="text-xl font-bold mb-4">System Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Minimum */}
                <div className="bg-gray-800 rounded-xl p-5">
                  <h3 className="text-base font-semibold text-gray-200 mb-3">Minimum</h3>
                  <ul className="space-y-2">
                    {sysReq.minimum.map((req) => (
                      <li key={req} className="text-gray-400 text-sm flex gap-2">
                        <span className="text-blue-400 mt-0.5 shrink-0">›</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Recommended */}
                <div className="bg-gray-800 rounded-xl p-5">
                  <h3 className="text-base font-semibold text-gray-200 mb-3">Recommended</h3>
                  <ul className="space-y-2">
                    {sysReq.recommended.map((req) => (
                      <li key={req} className="text-gray-400 text-sm flex gap-2">
                        <span className="text-blue-400 mt-0.5 shrink-0">›</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: sticky action panel */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-gray-800 rounded-2xl p-6 lg:sticky lg:top-8">
              <img
                src={game.coverUrl}
                alt={game.title}
                className="w-full rounded-xl mb-5 object-cover aspect-video"
              />
              <h2 className="text-lg font-bold mb-1">{game.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{developer}</p>

              <div className="flex items-center gap-2 mb-5">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="font-semibold text-white">{game.rating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">rating</span>
                <span
                  className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${
                    game.isFree
                      ? 'bg-green-700 text-green-100'
                      : 'bg-gray-600 text-gray-200'
                  }`}
                >
                  {game.isFree ? 'Free' : 'Paid'}
                </span>
              </div>

              <button
                onClick={handlePlayNow}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors text-base"
              >
                立即遊玩
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetailPage
