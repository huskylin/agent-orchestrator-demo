import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterPanel, { Filters } from './FilterPanel'

const defaultFilters: Filters = {
  categories: [],
  minRating: 1,
  isFree: false,
  sort: 'newest',
}

function renderFilterPanel(filters = defaultFilters, onChange = vi.fn()) {
  return render(<FilterPanel filters={filters} onFilterChange={onChange} />)
}

describe('FilterPanel', () => {
  it('renders all category checkboxes', () => {
    renderFilterPanel()
    expect(screen.getByLabelText('動作')).toBeInTheDocument()
    expect(screen.getByLabelText('RPG')).toBeInTheDocument()
    expect(screen.getByLabelText('射擊')).toBeInTheDocument()
    expect(screen.getByLabelText('策略')).toBeInTheDocument()
    expect(screen.getByLabelText('休閒')).toBeInTheDocument()
  })

  it('toggles a category on when checked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderFilterPanel(defaultFilters, onChange)

    await user.click(screen.getByLabelText('動作'))

    expect(onChange).toHaveBeenCalledWith({
      ...defaultFilters,
      categories: ['action'],
    })
  })

  it('toggles a category off when already selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const filters: Filters = { ...defaultFilters, categories: ['action'] }
    renderFilterPanel(filters, onChange)

    await user.click(screen.getByLabelText('動作'))

    expect(onChange).toHaveBeenCalledWith({
      ...filters,
      categories: [],
    })
  })

  it('renders the rating slider with correct value', () => {
    const filters: Filters = { ...defaultFilters, minRating: 3 }
    renderFilterPanel(filters)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('3')
  })

  it('calls onFilterChange when rating slider changes', () => {
    const onChange = vi.fn()
    renderFilterPanel(defaultFilters, onChange)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '4' } })

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, minRating: 4 })
  })

  it('renders the free checkbox unchecked by default', () => {
    renderFilterPanel()
    expect(screen.getByLabelText('僅顯示免費遊戲')).not.toBeChecked()
  })

  it('renders the free checkbox checked when isFree is true', () => {
    renderFilterPanel({ ...defaultFilters, isFree: true })
    expect(screen.getByLabelText('僅顯示免費遊戲')).toBeChecked()
  })

  it('calls onFilterChange with isFree true when free checkbox is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderFilterPanel(defaultFilters, onChange)

    await user.click(screen.getByLabelText('僅顯示免費遊戲'))

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, isFree: true })
  })

  it('renders the sort dropdown with all options', () => {
    renderFilterPanel()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '最新' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '最熱門' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '評分最高' })).toBeInTheDocument()
  })

  it('calls onFilterChange when sort option changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderFilterPanel(defaultFilters, onChange)

    await user.selectOptions(screen.getByRole('combobox'), 'top-rated')

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, sort: 'top-rated' })
  })
})
