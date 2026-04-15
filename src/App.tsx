import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import GameDetailPage from './pages/GameDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
