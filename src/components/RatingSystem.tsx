import React, { useState } from 'react'

interface RatingSystemProps {
  average: number
  count: number
  userRating?: number
  onRate?: (n: number) => void
}

const RatingSystem: React.FC<RatingSystemProps> = ({ average, count, userRating, onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const isLoggedIn = !!localStorage.getItem('auth_token')

  const displayRating = hovered ?? userRating ?? 0

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={!isLoggedIn || !onRate}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => isLoggedIn && setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            className={`text-2xl leading-none transition ${
              isLoggedIn && onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } ${star <= displayRating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            &#9733;
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {average.toFixed(1)} / 5 &middot; {count} 評分
      </p>
    </div>
  )
}

export default RatingSystem
