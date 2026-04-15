import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'

interface RatingData {
  average: number
  count: number
  userRating: number | null
}

interface RatingSystemProps {
  gameId: string
  initialAverage: number
  initialCount: number
}

// Mock API — replace with real endpoints when backend is ready
const fetchRating = async (gameId: string): Promise<RatingData> => {
  const stored = localStorage.getItem(`rating_${gameId}`)
  if (stored) return JSON.parse(stored) as RatingData
  return { average: 0, count: 0, userRating: null }
}

const submitRating = async ({
  gameId,
  star,
  previous,
}: {
  gameId: string
  star: number
  previous: RatingData
}): Promise<RatingData> => {
  const isNewRating = previous.userRating === null
  const oldSum = previous.average * previous.count
  const newCount = isNewRating ? previous.count + 1 : previous.count
  const newSum = isNewRating ? oldSum + star : oldSum - (previous.userRating ?? 0) + star
  const updated: RatingData = {
    average: newCount > 0 ? newSum / newCount : star,
    count: newCount,
    userRating: star,
  }
  localStorage.setItem(`rating_${gameId}`, JSON.stringify(updated))
  return updated
}

const RatingSystem: React.FC<RatingSystemProps> = ({ gameId, initialAverage, initialCount }) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const isLoggedIn = user !== null

  const { data: ratingData } = useQuery({
    queryKey: ['rating', gameId],
    queryFn: () => fetchRating(gameId),
    initialData: { average: initialAverage, count: initialCount, userRating: null },
  })

  const { average, count, userRating } = ratingData

  const mutation = useMutation({
    mutationFn: (star: number) => submitRating({ gameId, star, previous: ratingData }),
    onMutate: async (star: number) => {
      await queryClient.cancelQueries({ queryKey: ['rating', gameId] })
      const previous = queryClient.getQueryData<RatingData>(['rating', gameId]) ?? ratingData
      const isNew = previous.userRating === null
      const oldSum = previous.average * previous.count
      const newCount = isNew ? previous.count + 1 : previous.count
      const newSum = isNew ? oldSum + star : oldSum - (previous.userRating ?? 0) + star
      const optimistic: RatingData = {
        average: newCount > 0 ? newSum / newCount : star,
        count: newCount,
        userRating: star,
      }
      queryClient.setQueryData<RatingData>(['rating', gameId], optimistic)
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['rating', gameId], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rating', gameId] })
    },
  })

  const displayRating = hovered ?? userRating ?? 0
  const canRate = isLoggedIn && !mutation.isPending

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={!canRate}
            onClick={() => canRate && mutation.mutate(star)}
            onMouseEnter={() => canRate && setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            className={`text-2xl leading-none transition ${
              canRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } ${star <= displayRating ? 'text-yellow-400' : 'text-gray-300'} ${
              mutation.isPending ? 'opacity-60' : ''
            }`}
          >
            &#9733;
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {average.toFixed(1)} / 5 &middot; {count} 評分
      </p>
      {!isLoggedIn && (
        <p className="text-xs text-gray-400">登入後即可評分</p>
      )}
    </div>
  )
}

export default RatingSystem
