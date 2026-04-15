import React, { useCallback, useRef, useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function debounce<T extends (...args: Parameters<T>) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  // Local state for immediate input display; debounced value is reported to parent
  const [inputValue, setInputValue] = useState(value)
  const debouncedOnChange = useRef(debounce(onChange, 300)).current

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      debouncedOnChange(newValue)
    },
    [debouncedOnChange],
  )

  const handleClear = useCallback(() => {
    setInputValue('')
    onChange('')
  }, [onChange])

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="搜尋遊戲…"
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="清除搜尋"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
