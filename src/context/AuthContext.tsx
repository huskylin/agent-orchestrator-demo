import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface User {
  id: string
  email: string
  username: string
  role: string
  avatarUrl: string
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, username: string, password: string) => Promise<void>
}

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const storedUser = localStorage.getItem(AUTH_USER_KEY)
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string): Promise<void> => {
    // Mock JWT login — replace with real API call when backend is ready
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      username: email.split('@')[0],
      role: 'user',
      avatarUrl: '',
    }
    const mockToken = btoa(JSON.stringify({ email, iat: Date.now() }))
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    setUser(null)
  }

  const register = async (email: string, username: string, _password: string): Promise<void> => {
    // Mock registration — replace with real API call when backend is ready
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      username,
      role: 'user',
      avatarUrl: '',
    }
    const mockToken = btoa(JSON.stringify({ email, iat: Date.now() }))
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mockUser))
    setUser(mockUser)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return ctx
}
