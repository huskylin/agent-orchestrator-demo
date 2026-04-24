import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import HeroBanner, { SlideItem } from './HeroBanner'

const makeSlides = (count: number): SlideItem[] =>
  Array.from({ length: count }, (_, i) => ({
    title: `Title ${i + 1}`,
    subtitle: `Subtitle ${i + 1}`,
    backgroundUrl: `https://example.com/img${i + 1}.jpg`,
    ctaLabel: `CTA ${i + 1}`,
    onCtaClick: vi.fn(),
  }))

describe('HeroBanner', () => {
  describe('legacy single-slide props', () => {
    it('renders title, subtitle, and CTA button', () => {
      const onClick = vi.fn()
      render(
        <HeroBanner
          title="My Game"
          subtitle="Epic adventure"
          backgroundUrl="https://example.com/bg.jpg"
          ctaLabel="Play Now"
          onCtaClick={onClick}
        />,
      )
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Game')
      expect(screen.getByText('Epic adventure')).toBeInTheDocument()
      const btn = screen.getByRole('button', { name: 'Play Now' })
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not render indicator dots or arrows for single slide', () => {
      render(
        <HeroBanner
          title="Solo"
          subtitle="desc"
          backgroundUrl="https://example.com/bg.jpg"
          ctaLabel="Go"
          onCtaClick={() => {}}
        />,
      )
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Go to slide 1')).not.toBeInTheDocument()
    })
  })

  describe('multi-slide carousel', () => {
    it('renders the first slide content initially', () => {
      const slides = makeSlides(3)
      render(<HeroBanner slides={slides} />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 1')
    })

    it('renders indicator dots equal to slide count', () => {
      const slides = makeSlides(4)
      render(<HeroBanner slides={slides} />)
      for (let i = 1; i <= 4; i++) {
        expect(screen.getByLabelText(`Go to slide ${i}`)).toBeInTheDocument()
      }
    })

    it('shows prev and next arrow buttons', () => {
      render(<HeroBanner slides={makeSlides(3)} />)
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('advances to next slide when Next button is clicked', () => {
      const slides = makeSlides(3)
      render(<HeroBanner slides={slides} />)
      fireEvent.click(screen.getByLabelText('Next slide'))
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 2')
    })

    it('wraps around to last slide when Prev is clicked on first', () => {
      const slides = makeSlides(3)
      render(<HeroBanner slides={slides} />)
      fireEvent.click(screen.getByLabelText('Previous slide'))
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 3')
    })

    it('jumps to slide when indicator dot is clicked', () => {
      const slides = makeSlides(5)
      render(<HeroBanner slides={slides} />)
      fireEvent.click(screen.getByLabelText('Go to slide 4'))
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 4')
    })

    it('calls onCtaClick of the active slide', () => {
      const slides = makeSlides(3)
      render(<HeroBanner slides={slides} />)
      fireEvent.click(screen.getByRole('button', { name: 'CTA 1' }))
      expect(slides[0].onCtaClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('auto-play', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('automatically advances to next slide after autoPlayInterval', () => {
      render(<HeroBanner slides={makeSlides(3)} autoPlayInterval={5000} />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 1')
      act(() => { vi.advanceTimersByTime(5000) })
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 2')
    })

    it('wraps around from last slide back to first after auto-play', () => {
      render(<HeroBanner slides={makeSlides(3)} autoPlayInterval={5000} />)
      act(() => { vi.advanceTimersByTime(15000) }) // 3 × 5000ms
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 1')
    })

    it('does not auto-advance while hovered', () => {
      const { container } = render(
        <HeroBanner slides={makeSlides(3)} autoPlayInterval={5000} />,
      )
      const wrapper = container.firstChild as HTMLElement
      fireEvent.mouseEnter(wrapper)
      act(() => { vi.advanceTimersByTime(10000) })
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 1')
    })

    it('resumes auto-play after mouse leaves', () => {
      const { container } = render(
        <HeroBanner slides={makeSlides(3)} autoPlayInterval={5000} />,
      )
      const wrapper = container.firstChild as HTMLElement
      fireEvent.mouseEnter(wrapper)
      act(() => { vi.advanceTimersByTime(10000) })
      fireEvent.mouseLeave(wrapper)
      act(() => { vi.advanceTimersByTime(5000) })
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title 2')
    })
  })
})
