// Stub for useAuth — will be replaced by feat/issue-30 (AuthContext implementation)

export interface AuthUser {
  id: string
  email: string
  username: string
  role: string
  avatarUrl?: string
}

export interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, username: string, password: string) => Promise<void>
}

// Placeholder — the real implementation lives in src/context/AuthContext.tsx (issue #30)
export const useAuth = (): AuthContextValue => {
  throw new Error('useAuth must be used within an AuthProvider')
}
