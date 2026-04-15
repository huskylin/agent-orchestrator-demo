import React, { useState } from 'react'

interface GameImageCarouselProps {
  images: string[]
}

const GameImageCarousel: React.FC<GameImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0)

  if (!images.length) return null

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <img
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl hover:bg-black/70 transition"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl hover:bg-black/70 transition"
          >
            &#8250;
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition ${
                  i === current ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default GameImageCarousel
