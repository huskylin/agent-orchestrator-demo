import React from 'react'

interface GameCardProps {
  id: string
  title: string
  coverUrl: string
  category: string
  rating: number
  isFree: boolean
}

const GameCard: React.FC<GameCardProps> = ({ title, coverUrl, category, rating, isFree }) => {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-150 hover:scale-[1.03]">
      {/* 16:9 cover image */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <img
          src={coverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {isFree && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            FREE
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-gray-900">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
            {category}
          </span>
          <span className="text-xs text-yellow-500 font-medium">
            ★ {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameCard
