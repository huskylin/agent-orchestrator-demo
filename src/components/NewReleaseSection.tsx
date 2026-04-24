import React from 'react'
import GameCard from './GameCard'
import { Game } from '../data/games'

interface NewReleaseSectionProps {
  games: Game[]
}

const NewReleaseSection: React.FC<NewReleaseSectionProps> = ({ games }) => {
  return (
    <section aria-label="最新上架">
      <h2 className="text-xl font-bold text-gray-900 mb-4">最新上架</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
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
    </section>
  )
}

export default NewReleaseSection
