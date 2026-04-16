import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { Game } from '../../data/games'

type GameCategory = Game['category']

export interface GameFormData {
  title: string
  coverUrl: string
  category: GameCategory
  rating: number
  isFree: boolean
  description: string
  tags: string
  publishedAt: string
}

interface GameFormProps {
  initialData?: Partial<GameFormData>
  onSubmit: (data: GameFormData) => void
  isSubmitting?: boolean
}

const CATEGORIES: { value: GameCategory; label: string }[] = [
  { value: 'action', label: '動作' },
  { value: 'rpg', label: 'RPG' },
  { value: 'shooter', label: '射擊' },
  { value: 'strategy', label: '策略' },
  { value: 'casual', label: '休閒' },
]

const DEFAULT_FORM: GameFormData = {
  title: '',
  coverUrl: '',
  category: 'action',
  rating: 3,
  isFree: false,
  description: '',
  tags: '',
  publishedAt: new Date().toISOString().split('T')[0],
}

export default function GameForm({ initialData, onSubmit, isSubmitting = false }: GameFormProps) {
  const [form, setForm] = useState<GameFormData>({ ...DEFAULT_FORM, ...initialData })
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.coverUrl ?? '')
  const [errors, setErrors] = useState<Partial<Record<keyof GameFormData, string>>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  function validate(): boolean {
    const next: typeof errors = {}
    if (!form.title.trim()) next.title = '請輸入遊戲名稱'
    if (!form.description.trim()) next.description = '請輸入遊戲描述'
    if (!form.publishedAt) next.publishedAt = '請選擇發布日期'
    if (form.rating < 1 || form.rating > 5) next.rating = '評分需介於 1 到 5 之間'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === 'rating') {
      setForm((prev) => ({ ...prev, rating: parseFloat(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name as keyof GameFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      setPreviewUrl(dataUrl)
      setForm((prev) => ({ ...prev, coverUrl: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* 遊戲名稱 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          遊戲名稱 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="請輸入遊戲名稱"
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* 封面圖上傳 (mock) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">封面圖片</label>
        <div className="flex items-start gap-4">
          <div
            className="w-40 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer hover:border-blue-400 transition-colors flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="封面預覽" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-2">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 mt-1">點擊上傳</p>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              選擇圖片
            </button>
            <p className="text-xs text-gray-500">支援 JPG、PNG、GIF，最大 5MB（本地預覽 mock）</p>
            {previewUrl && (
              <button
                type="button"
                onClick={() => { setPreviewUrl(''); setForm((prev) => ({ ...prev, coverUrl: '' })) }}
                className="text-xs text-red-500 hover:underline"
              >
                移除圖片
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* 分類 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">遊戲分類</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* 評分 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          評分（1–5）：<span className="font-semibold">{form.rating}</span>
        </label>
        <input
          type="range"
          name="rating"
          min={1}
          max={5}
          step={0.1}
          value={form.rating}
          onChange={handleChange}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
      </div>

      {/* 免費 */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isFree"
          name="isFree"
          checked={form.isFree}
          onChange={handleChange}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="isFree" className="text-sm font-medium text-gray-700 cursor-pointer">
          免費遊戲
        </label>
      </div>

      {/* 描述 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          遊戲描述 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="請輸入遊戲描述"
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
            errors.description ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      {/* 標籤 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">標籤</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="以逗號分隔，例如：rpg, fantasy, multiplayer"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">多個標籤請以逗號（,）分隔</p>
      </div>

      {/* 發布日期 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          發布日期 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="publishedAt"
          value={form.publishedAt}
          onChange={handleChange}
          className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.publishedAt ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.publishedAt && <p className="mt-1 text-xs text-red-500">{errors.publishedAt}</p>}
      </div>

      {/* 送出 */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '儲存中…' : '儲存'}
        </button>
      </div>
    </form>
  )
}
