import React, { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PlayRecord {
  id: number
  gameName: string
  playedAt: string
}

interface FavoriteGame {
  id: number
  gameName: string
  coverUrl: string
}

const mockPlayRecords: PlayRecord[] = [
  { id: 1, gameName: 'Cyber Odyssey', playedAt: '2026-04-14 20:30' },
  { id: 2, gameName: 'Dragon Quest XI', playedAt: '2026-04-13 15:00' },
  { id: 3, gameName: 'Starfield', playedAt: '2026-04-10 09:45' },
  { id: 4, gameName: 'Elden Ring', playedAt: '2026-04-08 22:10' },
]

const mockFavorites: FavoriteGame[] = [
  { id: 1, gameName: 'Cyber Odyssey', coverUrl: 'https://placehold.co/120x80?text=Cyber+Odyssey' },
  { id: 2, gameName: 'Starfield', coverUrl: 'https://placehold.co/120x80?text=Starfield' },
  { id: 3, gameName: 'Elden Ring', coverUrl: 'https://placehold.co/120x80?text=Elden+Ring' },
]

const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [nickname, setNickname] = useState(user?.username ?? '')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null)
  const [pendingNickname, setPendingNickname] = useState(user?.username ?? '')
  const [pendingAvatar, setPendingAvatar] = useState<string | null>(user?.avatarUrl ?? null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleEditStart = () => {
    setPendingNickname(nickname)
    setPendingAvatar(avatarPreview)
    setIsEditing(true)
  }

  const handleSave = () => {
    setNickname(pendingNickname)
    setAvatarPreview(pendingAvatar)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setPendingNickname(nickname)
    setPendingAvatar(avatarPreview)
    setIsEditing(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const localUrl = URL.createObjectURL(file)
      setPendingAvatar(localUrl)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar */}
        <div className="relative">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 select-none">
              {nickname.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>

        {/* User Info */}
        <div>
          <h1 className="text-2xl font-bold">{nickname}</h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
          {!isEditing && (
            <button
              onClick={handleEditStart}
              className="mt-3 px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              編輯資料
            </button>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mb-8 p-5 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">編輯資料</h2>

          {/* Avatar Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">頭像</label>
            <div className="flex items-center gap-4">
              {pendingAvatar ? (
                <img
                  src={pendingAvatar}
                  alt="preview"
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 select-none">
                  {pendingNickname.charAt(0).toUpperCase() || '?'}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                選擇圖片
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Nickname */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">暱稱</label>
            <input
              type="text"
              value={pendingNickname}
              onChange={(e) => setPendingNickname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              儲存
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Play Records */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">遊玩紀錄</h2>
        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {mockPlayRecords.map((record) => (
            <li key={record.id} className="flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50">
              <span className="font-medium">{record.gameName}</span>
              <span className="text-sm text-gray-500">{record.playedAt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Favorites */}
      <section>
        <h2 className="text-xl font-semibold mb-4">收藏清單</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {mockFavorites.map((fav) => (
            <div key={fav.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <img
                src={fav.coverUrl}
                alt={fav.gameName}
                className="w-full h-24 object-cover"
              />
              <p className="px-3 py-2 text-sm font-medium truncate">{fav.gameName}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
