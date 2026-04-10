import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import CategoryFilter, { Category } from '../components/CategoryFilter'
import GameCard from '../components/GameCard'
import { games, getFeaturedGames } from '../data/games'

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  // Use first featured game (highest rated) for the hero banner
  const featuredGames = getFeaturedGames()
  const heroGame = featuredGames[0] ?? games[0]

  const filteredGames =
    selectedCategory === 'all'
      ? games
      : games.filter((g) => g.category === selectedCategory)

  return (
    <div>
      {heroGame && (
        <HeroBanner
          title={heroGame.title}
          subtitle={heroGame.description}
          backgroundUrl={heroGame.coverUrl}
          ctaLabel="Play Now"
          onCtaClick={() => {}}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* RWD grid: 1 col mobile / 2 col tablet / 3 col desktop */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              coverUrl={game.coverUrl}
              category={game.category}
              rating={game.rating}
              isFree={game.isFree}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
