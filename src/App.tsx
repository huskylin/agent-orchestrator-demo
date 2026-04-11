import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminGuard from './components/AdminGuard'
import AdminLayout from './components/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminGamesPage from './pages/admin/AdminGamesPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="games" element={<AdminGamesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
