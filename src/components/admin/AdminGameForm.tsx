import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { Game } from '../../data/games'

const CATEGORIES = ['action', 'rpg', 'shooter', 'strategy', 'casual'] as const

const AVAILABLE_TAGS = [
  'dark fantasy',
  'combat',
  'open world',
  'cyberpunk',
  'brawler',
  'upgrade',
  'mmorpg',
  'fantasy',
  'multiplayer',
  'crafting',
  'dragons',
  'empire building',
  'tactical',
  'competitive',
  'fps',
  'sci-fi',
  'survival',
  'procedural',
  'grand strategy',
  'historical',
  '4x',
  'tower defense',
  'wave survival',
  'puzzle',
  'relaxing',
  'casual',
  'match-3',
  'leaderboard',
  'defense',
  'tactics',
  'medieval',
  'story-rich',
  'emotional',
  'award-winning',
]

const gameFormSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()),
  isFree: z.boolean(),
  coverFile: z.instanceof(File).optional(),
})

export type GameFormData = z.infer<typeof gameFormSchema> & {
  coverUrl: string
}

interface AdminGameFormProps {
  initialData?: Game
  onSubmit: (data: GameFormData) => void
}

// Mock presigned URL upload — returns a local object URL
function mockUploadToPresignedUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function AdminGameForm({ initialData, onSubmit }: AdminGameFormProps) {
  const isEditMode = !!initialData
  const [coverPreview, setCoverPreview] = useState<string>(
    initialData?.coverUrl ?? ''
  )
  const [coverUrl, setCoverUrl] = useState<string>(initialData?.coverUrl ?? '')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      category: initialData?.category ?? 'action',
      tags: initialData?.tags ?? [],
      isFree: initialData?.isFree ?? false,
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = mockUploadToPresignedUrl(file)
    setCoverPreview(url)
    setCoverUrl(url)
  }

  function handleFormSubmit(data: z.infer<typeof gameFormSchema>) {
    onSubmit({ ...data, coverUrl })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        {isEditMode ? 'Edit Game' : 'Add New Game'}
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Game title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describe the game (at least 20 characters)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label
          htmlFor="coverFile"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cover Image
        </label>
        <input
          id="coverFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {coverPreview && (
          <div className="mt-3">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="h-40 w-full object-cover rounded-md border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          {...register('category')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </span>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const checked = field.value.includes(tag)
                return (
                  <label
                    key={tag}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          field.onChange(field.value.filter((t) => t !== tag))
                        } else {
                          field.onChange([...field.value, tag])
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {tag}
                  </label>
                )
              })}
            </div>
          )}
        />
      </div>

      {/* Publish Status (toggle) */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Publish Status
        </span>
        <Controller
          name="isFree"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <button
                type="button"
                role="switch"
                aria-checked={field.value}
                onClick={() => field.onChange(!field.value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  field.value ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    field.value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">
                {field.value ? 'Free to Play' : 'Paid'}
              </span>
            </label>
          )}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {isEditMode ? 'Save Changes' : 'Add Game'}
        </button>
      </div>
    </form>
  )
}
