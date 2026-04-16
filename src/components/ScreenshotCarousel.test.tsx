import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScreenshotCarousel, { MediaItem } from './ScreenshotCarousel'

const screenshots: MediaItem[] = [
  { type: 'screenshot', url: 'https://picsum.photos/seed/a/640/360' },
  { type: 'screenshot', url: 'https://picsum.photos/seed/b/640/360' },
  { type: 'screenshot', url: 'https://picsum.photos/seed/c/640/360' },
]

const mixedItems: MediaItem[] = [
  { type: 'trailer', url: 'https://example.com/trailer.mp4', thumbnailUrl: 'https://picsum.photos/seed/t/96/54' },
  { type: 'screenshot', url: 'https://picsum.photos/seed/s1/640/360' },
]

describe('ScreenshotCarousel', () => {
  it('renders nothing when items array is empty', () => {
    const { container } = render(<ScreenshotCarousel items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a single screenshot without nav buttons', () => {
    const single: MediaItem[] = [{ type: 'screenshot', url: 'https://picsum.photos/seed/x/640/360' }]
    render(<ScreenshotCarousel items={single} />)
    expect(screen.getByAltText('Screenshot 1')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
  })

  it('shows prev/next buttons and thumbnail strip for multiple items', () => {
    render(<ScreenshotCarousel items={screenshots} />)
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to screenshot 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to screenshot 3' })).toBeInTheDocument()
  })

  it('navigates forward on Next click', async () => {
    const user = userEvent.setup()
    render(<ScreenshotCarousel items={screenshots} />)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
    expect(screen.getByAltText('Screenshot 2')).toBeInTheDocument()
  })

  it('navigates backward on Previous click', async () => {
    const user = userEvent.setup()
    render(<ScreenshotCarousel items={screenshots} />)

    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('wraps around from last to first on Next click', async () => {
    const user = userEvent.setup()
    render(<ScreenshotCarousel items={screenshots} />)

    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('jumps to item when thumbnail is clicked', async () => {
    const user = userEvent.setup()
    render(<ScreenshotCarousel items={screenshots} />)

    await user.click(screen.getByRole('button', { name: 'Switch to screenshot 3' }))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
    expect(screen.getByAltText('Screenshot 3')).toBeInTheDocument()
  })

  it('renders a trailer as a video element', () => {
    render(<ScreenshotCarousel items={mixedItems} />)
    expect(screen.getByLabelText('Game trailer')).toBeInTheDocument()
  })

  it('shows play icon overlay on trailer thumbnail', () => {
    render(<ScreenshotCarousel items={mixedItems} />)
    const trailerThumb = screen.getByRole('button', { name: 'Switch to trailer 1' })
    expect(trailerThumb).toBeInTheDocument()
    // Thumbnail image for trailer
    expect(screen.getByAltText('Trailer 1 thumbnail')).toBeInTheDocument()
  })

  it('switches from trailer to screenshot via thumbnail', async () => {
    const user = userEvent.setup()
    render(<ScreenshotCarousel items={mixedItems} />)

    // Start on trailer (index 0)
    expect(screen.getByLabelText('Game trailer')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Switch to screenshot 2' }))
    expect(screen.getByAltText('Screenshot 2')).toBeInTheDocument()
  })
})
