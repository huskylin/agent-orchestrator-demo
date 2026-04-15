export interface User {
  id: string
  email: string
  username: string
  role: 'user' | 'admin'
  avatarUrl: string
}

export interface AuthTokenPayload {
  email: string
  userId: string
  role: 'user' | 'admin'
  iat: number
  exp: number
}
