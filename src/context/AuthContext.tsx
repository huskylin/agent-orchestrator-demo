import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, AuthTokenPayload } from '../types/user'

// Re-export User so existing imports from this module keep working
export type { User }

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, username: string, password: string) => Promise<void>
}

// Cookie helpers — simulate httpOnly cookie behaviour.
// In production the server sets the token as a real httpOnly cookie;
// here we write it via document.cookie so the shape matches exactly
// (the only missing attribute would be HttpOnly, which only the server can add).
const COOKIE_NAME = 'auth_token'

function setCookie(name: string, value: string, maxAgeSeconds = 7 * 24 * 60 * 60): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Strict`
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`
}

function buildToken(email: string, userId: string, role: User['role']): string {
  const payload: AuthTokenPayload = {
    email,
    userId,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  }
  // Base64-encode to mimic a (unsigned) JWT — NOT cryptographically secure,
  // intended only as a client-side mock until the real API is wired up.
  return btoa(JSON.stringify(payload))
}

function parseToken(token: string): AuthTokenPayload | null {
  try {
    const payload = JSON.parse(atob(token)) as AuthTokenPayload
    if (payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from the cookie on mount
  useEffect(() => {
    const token = getCookie(COOKIE_NAME)
    if (token) {
      const payload = parseToken(token)
      if (payload) {
        setUser({
          id: payload.userId,
          email: payload.email,
          username: payload.email.split('@')[0],
          role: payload.role,
          avatarUrl: '',
        })
      } else {
        // Token expired or invalid — clean up
        deleteCookie(COOKIE_NAME)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string): Promise<void> => {
    // Mock JWT login — replace with real API call when backend is ready.
    // The real endpoint would return a Set-Cookie header with HttpOnly; Secure.
    const id = crypto.randomUUID()
    const mockUser: User = {
      id,
      email,
      username: email.split('@')[0],
      role: 'user',
      avatarUrl: '',
    }
    setCookie(COOKIE_NAME, buildToken(email, id, 'user'))
    setUser(mockUser)
  }

  const logout = (): void => {
    deleteCookie(COOKIE_NAME)
    setUser(null)
  }

  const register = async (email: string, username: string, _password: string): Promise<void> => {
    // Mock registration — replace with real API call when backend is ready.
    const id = crypto.randomUUID()
    const mockUser: User = {
      id,
      email,
      username,
      role: 'user',
      avatarUrl: '',
    }
    setCookie(COOKIE_NAME, buildToken(email, id, 'user'))
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
