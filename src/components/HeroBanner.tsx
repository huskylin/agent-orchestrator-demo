import React from 'react'

interface HeroBannerProps {
  title: string
  subtitle: string
  backgroundUrl: string
  ctaLabel: string
  onCtaClick: () => void
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  backgroundUrl,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
          position: 'relative',
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
          {title}
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            margin: '0 0 32px',
          }}
        >
          {subtitle}
        </p>
        <button
          onClick={onCtaClick}
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
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

export default HeroBanner
