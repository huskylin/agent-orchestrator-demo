import { useParams } from 'react-router-dom'

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800">Game Detail Page - Showing details for game #{id}</h1>
    </div>
  )
}
