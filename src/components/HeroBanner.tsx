import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface SlideItem {
  title: string
  subtitle: string
  backgroundUrl: string
  ctaLabel: string
  onCtaClick: () => void
}

interface HeroBannerProps {
  slides?: SlideItem[]
  autoPlayInterval?: number
  // Legacy single-slide props (backward compatibility)
  title?: string
  subtitle?: string
  backgroundUrl?: string
  ctaLabel?: string
  onCtaClick?: () => void
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  autoPlayInterval = 5000,
  title,
  subtitle,
  backgroundUrl,
  ctaLabel,
  onCtaClick,
}) => {
  const resolvedSlides: SlideItem[] = slides ?? (backgroundUrl
    ? [{
        title: title ?? '',
        subtitle: subtitle ?? '',
        backgroundUrl,
        ctaLabel: ctaLabel ?? '',
        onCtaClick: onCtaClick ?? (() => {}),
      }]
    : [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = resolvedSlides.length

  const goTo = useCallback((index: number) => {
    setCurrentIndex(((index % total) + total) % total)
  }, [total])

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  useEffect(() => {
    if (total <= 1 || isHovered) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((c) => (c + 1) % total)
    }, autoPlayInterval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [total, isHovered, autoPlayInterval])

  if (!total) return null

  const slide = resolvedSlides[currentIndex]

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '400px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <div
        data-testid="hero-background"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          textAlign: 'center',
          color: '#ffffff',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0 0 16px',
          }}
        >
          {slide.title}
        </h1>
        <p style={{ fontSize: '1.25rem', margin: '0 0 32px' }}>
          {slide.subtitle}
        </p>
        <button
          onClick={slide.onCtaClick}
          style={{
            background: 'transparent',
            color: '#ffffff',
            border: '2px solid #ffffff',
            borderRadius: '4px',
            padding: '12px 32px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          {slide.ctaLabel}
        </button>
      </div>

      {/* Prev / Next arrows (only when multiple slides) */}
      {total > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &#8249;
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &#8250;
          </button>
        </>
      )}

      {/* Indicator dots (only when multiple slides) */}
      {total > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            gap: '8px',
          }}
        >
          {resolvedSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background: i === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroBanner
