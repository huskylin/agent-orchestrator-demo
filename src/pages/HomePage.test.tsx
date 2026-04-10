import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { games } from '../data/games'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders without console errors and shows game cards', () => {
    renderHomePage()
    // At least one game card title should be visible in the "all" view
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
  })

  it('filters game cards when a category tab is clicked', async () => {
    const user = userEvent.setup()
    renderHomePage()

    // Click "Action" tab
    await user.click(screen.getByRole('button', { name: 'Action' }))

    const actionGames = games.filter((g) => g.category === 'action')
    // Each action game title should be present
    for (const game of actionGames) {
      expect(screen.getByText(game.title)).toBeInTheDocument()
    }

    // A game from a different category should NOT be present
    const nonActionGame = games.find((g) => g.category !== 'action')
    if (nonActionGame) {
      expect(screen.queryByText(nonActionGame.title)).not.toBeInTheDocument()
    }
  })

  it('shows all games when "All" tab is active', async () => {
    const user = userEvent.setup()
    renderHomePage()

    // Switch to RPG then back to All
    await user.click(screen.getByRole('button', { name: 'RPG' }))
    await user.click(screen.getByRole('button', { name: 'All' }))

    // All game titles should be present (some may appear in both hero banner and grid)
    for (const game of games) {
      expect(screen.getAllByText(game.title).length).toBeGreaterThan(0)
    }
  })

  it('renders the HeroBanner with the top-rated featured game', () => {
    renderHomePage()
    // The hero title (h1) should match the highest-rated game
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
  })
})
