import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from './CategoryFilter'

describe('CategoryFilter', () => {
  describe('renders all category tabs', () => {
    it('shows all six category labels', () => {
      render(<CategoryFilter selected="all" onChange={() => {}} />)
      expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Action' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'RPG' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Shooter' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Strategy' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Casual' })).toBeInTheDocument()
    })
  })

  describe('active state reflects selected prop', () => {
    it('marks "All" tab as selected when selected="all"', () => {
      render(<CategoryFilter selected="all" onChange={() => {}} />)
      expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true')
    })

    it('marks "Action" tab as selected when selected="action"', () => {
      render(<CategoryFilter selected="action" onChange={() => {}} />)
      expect(screen.getByRole('tab', { name: 'Action' })).toHaveAttribute('aria-selected', 'true')
    })

    it('marks "RPG" tab as selected when selected="rpg"', () => {
      render(<CategoryFilter selected="rpg" onChange={() => {}} />)
      expect(screen.getByRole('tab', { name: 'RPG' })).toHaveAttribute('aria-selected', 'true')
    })

    it('does not mark other tabs as selected when one is active', () => {
      render(<CategoryFilter selected="action" onChange={() => {}} />)
      const inactiveTabs = ['All', 'RPG', 'Shooter', 'Strategy', 'Casual']
      inactiveTabs.forEach((label) => {
        expect(screen.getByRole('tab', { name: label })).toHaveAttribute('aria-selected', 'false')
      })
    })
  })

  describe('onChange fires when tab is clicked', () => {
    it('calls onChange with "action" when Action tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="all" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'Action' }))
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('action')
    })

    it('calls onChange with "rpg" when RPG tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="all" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'RPG' }))
      expect(handleChange).toHaveBeenCalledWith('rpg')
    })

    it('calls onChange with "all" when All tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="action" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'All' }))
      expect(handleChange).toHaveBeenCalledWith('all')
    })

    it('calls onChange with "shooter" when Shooter tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="all" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'Shooter' }))
      expect(handleChange).toHaveBeenCalledWith('shooter')
    })

    it('calls onChange with "strategy" when Strategy tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="all" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'Strategy' }))
      expect(handleChange).toHaveBeenCalledWith('strategy')
    })

    it('calls onChange with "casual" when Casual tab is clicked', () => {
      const handleChange = vi.fn()
      render(<CategoryFilter selected="all" onChange={handleChange} />)
      fireEvent.click(screen.getByRole('tab', { name: 'Casual' }))
      expect(handleChange).toHaveBeenCalledWith('casual')
    })
  })

  describe('scrollable container for mobile', () => {
    it('renders a tablist with aria-label', () => {
      render(<CategoryFilter selected="all" onChange={() => {}} />)
      expect(screen.getByRole('tablist', { name: 'Game categories' })).toBeInTheDocument()
    })
  })
})
