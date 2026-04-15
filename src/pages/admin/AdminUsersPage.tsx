import React, { useState, useMemo } from 'react'

type UserRole = 'admin' | 'moderator' | 'user'
type UserStatus = 'active' | 'inactive' | 'banned'

interface AdminUser {
  id: string
  email: string
  nickname: string
  role: UserRole
  status: UserStatus
}

const mockUsers: AdminUser[] = [
  { id: 'u1', email: 'alice@example.com', nickname: 'Alice', role: 'admin', status: 'active' },
  { id: 'u2', email: 'bob@example.com', nickname: 'BobGamer', role: 'user', status: 'active' },
  { id: 'u3', email: 'carol@example.com', nickname: 'CarolMod', role: 'moderator', status: 'active' },
  { id: 'u4', email: 'dave@example.com', nickname: 'Dave99', role: 'user', status: 'inactive' },
  { id: 'u5', email: 'eve@example.com', nickname: 'EvePlayer', role: 'user', status: 'banned' },
  { id: 'u6', email: 'frank@example.com', nickname: 'FrankAdmin', role: 'admin', status: 'active' },
  { id: 'u7', email: 'grace@example.com', nickname: 'GraceQ', role: 'user', status: 'active' },
  { id: 'u8', email: 'henry@example.com', nickname: 'HenryX', role: 'moderator', status: 'inactive' },
  { id: 'u9', email: 'iris@example.com', nickname: 'IrisGamer', role: 'user', status: 'active' },
  { id: 'u10', email: 'jake@example.com', nickname: 'JakeZ', role: 'user', status: 'banned' },
  { id: 'u11', email: 'kate@example.com', nickname: 'KateMod', role: 'moderator', status: 'active' },
  { id: 'u12', email: 'leo@example.com', nickname: 'LeoPlayer', role: 'user', status: 'active' },
]

const ROLE_LABELS: Record<UserRole, string> = {
  admin: '管理員',
  moderator: '版主',
  user: '一般用戶',
}

const STATUS_LABELS: Record<UserStatus, string> = {
  active: '啟用',
  inactive: '停用',
  banned: '封鎖',
}

const ROLE_BADGE_CLASSES: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-800',
  moderator: 'bg-blue-100 text-blue-800',
  user: 'bg-gray-100 text-gray-700',
}

const STATUS_BADGE_CLASSES: Record<UserStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-yellow-100 text-yellow-700',
  banned: 'bg-red-100 text-red-700',
}

const AdminUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all')

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return mockUsers.filter((u) => {
      const matchesSearch =
        !query ||
        u.email.toLowerCase().includes(query) ||
        u.nickname.toLowerCase().includes(query)
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [searchQuery, roleFilter, statusFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">用戶管理</h1>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="搜尋 Email 或暱稱..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="all">所有角色</option>
          <option value="admin">管理員</option>
          <option value="moderator">版主</option>
          <option value="user">一般用戶</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="all">所有狀態</option>
          <option value="active">啟用</option>
          <option value="inactive">停用</option>
          <option value="banned">封鎖</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-3">共 {filteredUsers.length} 位用戶</p>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                暱稱
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                角色
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                狀態
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-400">
                  找不到符合條件的用戶
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.nickname}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${ROLE_BADGE_CLASSES[user.role]}`}
                    >
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_BADGE_CLASSES[user.status]}`}
                    >
                      {STATUS_LABELS[user.status]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsersPage
