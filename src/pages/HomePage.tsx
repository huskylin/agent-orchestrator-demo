import GameCard from '../components/GameCard'

const sampleGames = [
  { id: '1', title: 'Game One', coverUrl: 'https://placehold.co/640x360', category: 'Action', rating: 4, isFree: false },
  { id: '2', title: 'Game Two', coverUrl: 'https://placehold.co/640x360', category: 'RPG', rating: 5, isFree: true },
  { id: '3', title: 'Game Three', coverUrl: 'https://placehold.co/640x360', category: 'Strategy', rating: 3, isFree: false },
]

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleGames.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  )
}
