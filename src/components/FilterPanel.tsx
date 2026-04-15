import React from 'react'

export type SortOption = 'newest' | 'hottest' | 'top-rated'

export interface Filters {
  categories: string[]
  minRating: number
  isFree: boolean
  sort: SortOption
}

interface FilterPanelProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

const CATEGORIES = [
  { value: 'action', label: '動作' },
  { value: 'rpg', label: 'RPG' },
  { value: 'shooter', label: '射擊' },
  { value: 'strategy', label: '策略' },
  { value: 'casual', label: '休閒' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: '最新' },
  { value: 'hottest', label: '最熱門' },
  { value: 'top-rated', label: '評分最高' },
]

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const toggleCategory = (value: string) => {
    const next = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value]
    onFilterChange({ ...filters, categories: next })
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg text-sm">
      {/* Category checkboxes */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">分類</p>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.value)}
                onChange={() => toggleCategory(cat.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-600">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating range slider */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">
          最低評分：<span className="text-blue-600">{filters.minRating}</span>
        </p>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={filters.minRating}
          onChange={(e) =>
            onFilterChange({ ...filters, minRating: Number(e.target.value) })
          }
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>5</span>
        </div>
      </div>

      {/* Is free checkbox */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">免費</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isFree}
            onChange={(e) => onFilterChange({ ...filters, isFree: e.target.checked })}
            className="accent-blue-600"
          />
          <span className="text-gray-600">僅顯示免費遊戲</span>
        </label>
      </div>

      {/* Sort dropdown */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">排序</p>
        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterPanel
