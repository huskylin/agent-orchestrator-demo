import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminGuard from './AdminGuard'

describe('AdminGuard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('renders children when role is admin', () => {
    localStorage.setItem('role', 'admin')
    render(
      <MemoryRouter>
        <AdminGuard>
          <div>Admin Content</div>
        </AdminGuard>
      </MemoryRouter>
    )
    expect(screen.getByText('Admin Content')).toBeTruthy()
  })

  it('redirects to / when role is not admin', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AdminGuard>
          <div>Admin Content</div>
        </AdminGuard>
      </MemoryRouter>
    )
    expect(screen.queryByText('Admin Content')).toBeNull()
  })
})
