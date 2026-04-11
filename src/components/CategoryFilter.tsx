import React from 'react'

export type Category = 'all' | 'action' | 'rpg' | 'shooter' | 'strategy' | 'casual'

interface CategoryFilterProps {
  selected: Category
  onChange: (category: Category) => void
}

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'action', label: 'Action' },
  { value: 'rpg', label: 'RPG' },
  { value: 'shooter', label: 'Shooter' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'casual', label: 'Casual' },
]

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        className="flex min-w-max border-b border-gray-200"
        role="tablist"
        aria-label="Game categories"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={selected === cat.value}
            onClick={() => onChange(cat.value)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              selected === cat.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
