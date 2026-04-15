import React from 'react'
import { useNavigate } from 'react-router-dom'

interface FavoriteButtonProps {
  gameId: string
  isFavorited: boolean
  onToggle: () => void
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId: _gameId, isFavorited, onToggle }) => {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('auth_token')

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    onToggle()
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorited ? '取消收藏' : '加入收藏'}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
        isFavorited
          ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
          : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
      }`}
    >
      <span className="text-base">{isFavorited ? '\u2665' : '\u2661'}</span>
      {isFavorited ? '已收藏' : '收藏'}
    </button>
  )
}

export default FavoriteButton
