import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function AdminRoute() {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return null
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
