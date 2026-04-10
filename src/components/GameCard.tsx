import React from 'react'
import { useNavigate } from 'react-router-dom'

interface GameCardProps {
  id: string
  title: string
  coverUrl: string
  category: string
  rating: number // 1–5
  isFree: boolean
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  coverUrl,
  category,
  rating,
  isFree,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className="group relative w-full overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-150 ease-out hover:scale-[1.03] cursor-pointer"
      onClick={() => navigate(`/game/${id}`)}
    >
      {/* Cover image — 16:9 aspect ratio */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover"
        />

        {/* Free badge — top-right */}
        {isFree && (
          <span className="absolute right-2 top-2 rounded bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
            FREE
          </span>
        )}

        {/* Bottom overlay for badges */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-2">
          {/* Category badge — bottom-left */}
          <span className="rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
            {category}
          </span>

          {/* Rating — bottom-right */}
          <span className="text-sm font-semibold text-yellow-400 drop-shadow">
            {'★'.repeat(Math.round(rating))}
            {'☆'.repeat(5 - Math.round(rating))}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-900">
          {title}
        </p>
      </div>
    </div>
  )
}

export default GameCard
