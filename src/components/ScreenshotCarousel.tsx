import React, { useState } from 'react'

export interface MediaItem {
  type: 'screenshot' | 'trailer'
  url: string
  thumbnailUrl?: string
}

interface ScreenshotCarouselProps {
  items: MediaItem[]
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ items }) => {
  const [current, setCurrent] = useState(0)

  if (!items.length) return null

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  const currentItem = items[current]

  return (
    <div className="flex flex-col gap-3">
      {/* Main viewer */}
      <div
        className="relative w-full bg-black rounded-lg overflow-hidden"
        style={{ paddingTop: '56.25%' }}
      >
        <div className="absolute inset-0">
          {currentItem.type === 'trailer' ? (
            <video
              key={currentItem.url}
              src={currentItem.url}
              controls
              className="w-full h-full object-contain"
              aria-label="Game trailer"
            />
          ) : (
            <img
              src={currentItem.url}
              alt={`Screenshot ${current + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/70 transition"
            >
              &#8249;
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/70 transition"
            >
              &#8250;
            </button>
          </>
        )}

        {/* Counter badge */}
        <div className="absolute bottom-2 right-3 z-10 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
          {current + 1} / {items.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={
                item.type === 'trailer'
                  ? `Switch to trailer ${i + 1}`
                  : `Switch to screenshot ${i + 1}`
              }
              className={`relative flex-shrink-0 w-24 h-14 rounded overflow-hidden border-2 transition-all ${
                i === current
                  ? 'border-blue-500'
                  : 'border-transparent opacity-60 hover:opacity-90 hover:border-white/50'
              }`}
            >
              {item.type === 'trailer' ? (
                <>
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={`Trailer ${i + 1} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                      <span className="text-black text-xs pl-0.5">&#9654;</span>
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.url}
                  alt={`Screenshot ${i + 1} thumbnail`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ScreenshotCarousel
