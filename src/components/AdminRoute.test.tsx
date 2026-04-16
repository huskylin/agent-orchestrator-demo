import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi } from 'vitest'
import AdminRoute from './AdminRoute'
import * as AuthContextModule from '../context/AuthContext'
import type { User } from '../context/AuthContext'

function makeUser(role: string): User {
  return { id: '1', email: 'test@test.com', username: 'test', role, avatarUrl: '' }
}

function renderAdminRoute(user: User | null, isLoading = false) {
  vi.spyOn(AuthContextModule, 'useAuthContext').mockReturnValue({
    user,
    isLoading,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  })

  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<div>Admin Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AdminRoute', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders child route for admin users', () => {
    renderAdminRoute(makeUser('admin'))
    expect(screen.getByText('Admin Page')).toBeInTheDocument()
  })

  it('redirects non-admin users to home', () => {
    renderAdminRoute(makeUser('user'))
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByText('Admin Page')).not.toBeInTheDocument()
  })

  it('redirects unauthenticated users to home', () => {
    renderAdminRoute(null)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByText('Admin Page')).not.toBeInTheDocument()
  })

  it('renders nothing while auth is loading', () => {
    const { container } = renderAdminRoute(null, true)
    expect(container.firstChild).toBeNull()
  })
})
