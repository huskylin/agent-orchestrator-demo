import { useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import GameForm, { GameFormData } from '../../components/admin/GameForm'
import { games } from '../../data/games'

export default function GameFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const existingGame = useMemo(() => {
    if (!id) return undefined
    return games.find((g) => g.id === id)
  }, [id])

  const initialData: Partial<GameFormData> | undefined = existingGame
    ? {
        title: existingGame.title,
        coverUrl: existingGame.coverUrl,
        category: existingGame.category,
        rating: existingGame.rating,
        isFree: existingGame.isFree,
        description: existingGame.description,
        tags: existingGame.tags.join(', '),
        publishedAt: existingGame.publishedAt,
      }
    : undefined

  function handleSubmit(data: GameFormData) {
    setIsSubmitting(true)
    // Mock async save
    setTimeout(() => {
      console.log(isEdit ? `[mock] 更新遊戲 id=${id}` : '[mock] 新增遊戲', data)
      setIsSubmitting(false)
      setSuccessMessage(isEdit ? '遊戲資料已更新' : '遊戲已新增')
      setTimeout(() => navigate('/admin/games'), 1200)
    }, 800)
  }

  if (isEdit && !existingGame) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">找不到遊戲 (id: {id})</p>
          <button
            onClick={() => navigate('/admin/games')}
            className="text-blue-600 hover:underline text-sm"
          >
            返回遊戲列表
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導覽 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/games')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="返回"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {isEdit ? `編輯遊戲：${existingGame?.title}` : '新增遊戲'}
          </h1>
        </div>
      </header>

      {/* 主內容 */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {successMessage && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {successMessage}，正在跳轉…
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <GameForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </div>
  )
}
