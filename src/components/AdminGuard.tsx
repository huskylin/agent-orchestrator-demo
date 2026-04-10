import { Navigate } from 'react-router-dom'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const role = localStorage.getItem('role')

  if (role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
