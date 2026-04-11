import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="flex">
      <nav className="w-48 p-4 border-r border-gray-200">
        <ul className="space-y-2 list-none p-0 m-0">
          <li>
            <NavLink to="/admin" end className="block hover:underline">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/games" className="block hover:underline">Games</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="block hover:underline">Users</NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
