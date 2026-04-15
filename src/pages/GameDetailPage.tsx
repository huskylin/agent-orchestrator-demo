import { useParams } from 'react-router-dom'

const GameDetailPage = () => {
  const { id } = useParams()
  return <h1>Game Detail Page – showing details for game {id}</h1>
}

export default GameDetailPage
