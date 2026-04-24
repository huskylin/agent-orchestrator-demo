import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NewReleaseSection from './NewReleaseSection'
import { Game } from '../data/games'

const mockGames: Game[] = [
  {
    id: '1',
    title: 'Latest Game',
    coverUrl: 'https://picsum.photos/seed/test1/640/360',
    category: 'action',
    rating: 4.5,
    isFree: false,
    description: 'A test game',
    tags: ['test'],
    publishedAt: '2024-07-01',
  },
  {
    id: '2',
    title: 'Second Game',
    coverUrl: 'https://picsum.photos/seed/test2/640/360',
    category: 'rpg',
    rating: 3.8,
    isFree: true,
    description: 'Another test game',
    tags: ['test'],
    publishedAt: '2024-06-15',
  },
]

function renderSection(games = mockGames) {
  return render(
    <MemoryRouter>
      <NewReleaseSection games={games} />
    </MemoryRouter>,
  )
}

describe('NewReleaseSection', () => {
  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByRole('heading', { name: '最新上架' })).toBeInTheDocument()
  })

  it('renders a GameCard for each game', () => {
    renderSection()
    expect(screen.getByText('Latest Game')).toBeInTheDocument()
    expect(screen.getByText('Second Game')).toBeInTheDocument()
  })

  it('renders nothing when games array is empty', () => {
    renderSection([])
    expect(screen.getByRole('heading', { name: '最新上架' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
