import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ── Types ────────────────────────────────────────────────────────────────────

type UserRole = 'user' | 'moderator' | 'admin'
type AccountStatus = 'active' | 'disabled'

interface AdminUser {
  id: string
  email: string
  username: string
  role: UserRole
  status: AccountStatus
  avatarUrl: string
  joinedAt: string
}

interface PlayRecord {
  id: string
  gameId: string
  gameTitle: string
  playedAt: string
  durationMinutes: number
}

interface UserComment {
  id: string
  gameId: string
  gameTitle: string
  content: string
  createdAt: string
}

interface AuditEntry {
  id: string
  action: string
  performedBy: string
  at: string
}

// ── Mock data helpers ────────────────────────────────────────────────────────

const MOCK_USERS: Record<string, AdminUser> = {
  u1: {
    id: 'u1',
    email: 'player_alex@example.com',
    username: 'player_alex',
    role: 'user',
    status: 'active',
    avatarUrl: '',
    joinedAt: '2025-01-10T09:00:00Z',
  },
  u2: {
    id: 'u2',
    email: 'gamer_jane@example.com',
    username: 'gamer_jane',
    role: 'moderator',
    status: 'active',
    avatarUrl: '',
    joinedAt: '2025-03-22T14:30:00Z',
  },
  u3: {
    id: 'u3',
    email: 'sniper_bob@example.com',
    username: 'sniper_bob',
    role: 'user',
    status: 'disabled',
    avatarUrl: '',
    joinedAt: '2024-11-05T11:20:00Z',
  },
}

const MOCK_PLAY_RECORDS: Record<string, PlayRecord[]> = {
  u1: [
    { id: 'pr1', gameId: '1', gameTitle: 'Shadow Realm Chronicles', playedAt: '2026-04-14T20:00:00Z', durationMinutes: 120 },
    { id: 'pr2', gameId: '3', gameTitle: 'Eternal Quest Online', playedAt: '2026-04-13T18:30:00Z', durationMinutes: 90 },
    { id: 'pr3', gameId: '5', gameTitle: 'Apex Strike', playedAt: '2026-04-12T15:00:00Z', durationMinutes: 60 },
  ],
  u2: [
    { id: 'pr4', gameId: '2', gameTitle: 'Neon Blitz', playedAt: '2026-04-15T10:00:00Z', durationMinutes: 45 },
    { id: 'pr5', gameId: '7', gameTitle: 'Empire Architect', playedAt: '2026-04-14T16:00:00Z', durationMinutes: 200 },
  ],
  u3: [
    { id: 'pr6', gameId: '9', gameTitle: 'Puzzle Garden', playedAt: '2026-04-10T21:00:00Z', durationMinutes: 30 },
  ],
}

const MOCK_COMMENTS: Record<string, UserComment[]> = {
  u1: [
    { id: 'c1', gameId: '1', gameTitle: 'Shadow Realm Chronicles', content: 'This game is absolutely amazing! The combat system is so fluid.', createdAt: '2026-04-15T08:23:00Z' },
    { id: 'c2', gameId: '3', gameTitle: 'Eternal Quest Online', content: 'Love the multiplayer experience. Highly recommend to all RPG fans.', createdAt: '2026-04-13T07:45:00Z' },
  ],
  u2: [
    { id: 'c3', gameId: '5', gameTitle: 'Apex Strike', content: 'Best tactical shooter I have played this year. Balanced and fun.', createdAt: '2026-04-14T22:10:00Z' },
  ],
  u3: [
    { id: 'c4', gameId: '9', gameTitle: 'Puzzle Garden', content: 'Super relaxing game. Perfect for winding down after work.', createdAt: '2026-04-13T21:15:00Z' },
  ],
}

// Simulate API calls ─────────────────────────────────────────────────────────

async function fetchUser(id: string): Promise<AdminUser> {
  await new Promise((r) => setTimeout(r, 300))
  const user = MOCK_USERS[id]
  if (!user) throw new Error(`User ${id} not found`)
  return { ...user }
}

async function fetchPlayRecords(userId: string): Promise<PlayRecord[]> {
  await new Promise((r) => setTimeout(r, 200))
  return MOCK_PLAY_RECORDS[userId] ?? []
}

async function fetchUserComments(userId: string): Promise<UserComment[]> {
  await new Promise((r) => setTimeout(r, 200))
  return MOCK_COMMENTS[userId] ?? []
}

async function updateUserRole(userId: string, role: UserRole): Promise<AdminUser> {
  // Replace with real API call when backend is ready
  await new Promise((r) => setTimeout(r, 400))
  const user = MOCK_USERS[userId]
  if (!user) throw new Error('User not found')
  user.role = role
  return { ...user }
}

async function updateUserStatus(userId: string, status: AccountStatus): Promise<AdminUser> {
  // Replace with real API call when backend is ready
  await new Promise((r) => setTimeout(r, 400))
  const user = MOCK_USERS[userId]
  if (!user) throw new Error('User not found')
  user.status = status
  return { ...user }
}

async function deleteComment(commentId: string): Promise<void> {
  // Replace with real API call when backend is ready
  await new Promise((r) => setTimeout(r, 300))
  for (const list of Object.values(MOCK_COMMENTS)) {
    const idx = list.findIndex((c) => c.id === commentId)
    if (idx !== -1) { list.splice(idx, 1); break }
  }
}

// ── Audit log (in-memory, replace with API) ──────────────────────────────────

const auditLog: AuditEntry[] = []

function appendAudit(action: string) {
  auditLog.unshift({
    id: crypto.randomUUID(),
    action,
    performedBy: 'admin',
    at: new Date().toISOString(),
  })
}

// ── Role badge ───────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<UserRole, string> = {
  user: '一般用戶',
  moderator: '版主',
  admin: '管理員',
}

const ROLE_COLORS: Record<UserRole, string> = {
  user: 'bg-gray-100 text-gray-700',
  moderator: 'bg-blue-100 text-blue-700',
  admin: 'bg-purple-100 text-purple-700',
}

function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[role]}`}>
      {ROLE_LABELS[role]}
    </span>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function UserDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [showAudit, setShowAudit] = useState(false)

  // ── Queries ──────────────────────────────────────────────────────────────

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({ queryKey: ['admin-user', id], queryFn: () => fetchUser(id) })

  const { data: playRecords = [], isLoading: recordsLoading } = useQuery({
    queryKey: ['admin-user-records', id],
    queryFn: () => fetchPlayRecords(id),
    enabled: !!id,
  })

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['admin-user-comments', id],
    queryFn: () => fetchUserComments(id),
    enabled: !!id,
  })

  // ── Mutations ────────────────────────────────────────────────────────────

  const roleMutation = useMutation({
    mutationFn: ({ role }: { role: UserRole }) => updateUserRole(id, role),
    onSuccess: (updated) => {
      queryClient.setQueryData(['admin-user', id], updated)
      const entry = `角色變更為「${ROLE_LABELS[updated.role]}」`
      appendAudit(entry)
      setAuditEntries([...auditLog])
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ status }: { status: AccountStatus }) => updateUserStatus(id, status),
    onSuccess: (updated) => {
      queryClient.setQueryData(['admin-user', id], updated)
      const entry = updated.status === 'disabled' ? '帳號已停用' : '帳號已啟用'
      appendAudit(entry)
      setAuditEntries([...auditLog])
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: (_data, commentId) => {
      queryClient.setQueryData<UserComment[]>(['admin-user-comments', id], (prev) =>
        prev?.filter((c) => c.id !== commentId) ?? []
      )
      appendAudit(`刪除評論 #${commentId}`)
      setAuditEntries([...auditLog])
    },
  })

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      roleMutation.mutate({ role: e.target.value as UserRole })
    },
    [roleMutation]
  )

  const handleToggleStatus = useCallback(() => {
    if (!user) return
    const next: AccountStatus = user.status === 'active' ? 'disabled' : 'active'
    statusMutation.mutate({ status: next })
  }, [user, statusMutation])

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      deleteCommentMutation.mutate(commentId)
    },
    [deleteCommentMutation]
  )

  // ── Render helpers ────────────────────────────────────────────────────────

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        載入中…
      </div>
    )
  }

  if (userError || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">找不到此用戶</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 hover:underline"
        >
          返回上一頁
        </button>
      </div>
    )
  }

  const isBusy =
    roleMutation.isPending || statusMutation.isPending || deleteCommentMutation.isPending

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-semibold text-gray-800">用戶詳情</h1>
        <button
          onClick={() => setShowAudit((v) => !v)}
          className="ml-auto text-xs text-indigo-600 hover:underline"
        >
          {showAudit ? '隱藏操作記錄' : '查看操作記錄'}
          {auditEntries.length > 0 && (
            <span className="ml-1 bg-indigo-100 text-indigo-700 rounded-full px-1.5 py-0.5">
              {auditEntries.length}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Audit log panel */}
        {showAudit && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-yellow-800 mb-3">操作記錄（Audit Log）</h2>
            {auditEntries.length === 0 ? (
              <p className="text-xs text-yellow-600">尚無操作記錄</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {auditEntries.map((entry) => (
                  <li key={entry.id} className="text-xs text-yellow-900 flex gap-2">
                    <span className="text-yellow-500 shrink-0">
                      {new Date(entry.at).toLocaleString('zh-TW')}
                    </span>
                    <span>
                      <span className="font-medium">{entry.performedBy}</span> — {entry.action}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Basic info card */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">基本資料</h2>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-400">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">用戶名稱</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{user.username}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">電子郵件</p>
                <p className="text-sm text-gray-800 mt-0.5">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">用戶 ID</p>
                <p className="text-sm text-gray-500 mt-0.5 font-mono">{user.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">加入時間</p>
                <p className="text-sm text-gray-800 mt-0.5">
                  {new Date(user.joinedAt).toLocaleDateString('zh-TW')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">帳號狀態</p>
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {user.status === 'active' ? '啟用中' : '已停用'}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">角色</p>
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
        </section>

        {/* RBAC + account controls */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">帳號管理</h2>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Role selector */}
            <div className="flex flex-col gap-1">
              <label htmlFor="role-select" className="text-xs text-gray-400">
                修改角色
              </label>
              <select
                id="role-select"
                value={user.role}
                onChange={handleRoleChange}
                disabled={isBusy}
                className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="user">一般用戶</option>
                <option value="moderator">版主</option>
                <option value="admin">管理員</option>
              </select>
              {roleMutation.isPending && (
                <p className="text-xs text-indigo-500">儲存中…</p>
              )}
              {roleMutation.isError && (
                <p className="text-xs text-red-500">更新失敗，請重試</p>
              )}
            </div>

            <div className="sm:ml-auto">
              {/* Enable / disable toggle */}
              <button
                onClick={handleToggleStatus}
                disabled={isBusy}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  user.status === 'active'
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                }`}
              >
                {statusMutation.isPending
                  ? '處理中…'
                  : user.status === 'active'
                  ? '停用帳號'
                  : '啟用帳號'}
              </button>
              {statusMutation.isError && (
                <p className="text-xs text-red-500 mt-1">操作失敗，請重試</p>
              )}
            </div>
          </div>
        </section>

        {/* Play records */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">遊玩紀錄</h2>

          {recordsLoading ? (
            <p className="text-sm text-gray-400">載入中…</p>
          ) : playRecords.length === 0 ? (
            <p className="text-sm text-gray-400">尚無遊玩紀錄</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-400 text-xs">
                    <th className="py-2 pr-4 font-medium">遊戲名稱</th>
                    <th className="py-2 pr-4 font-medium">遊玩時間</th>
                    <th className="py-2 font-medium">時長（分鐘）</th>
                  </tr>
                </thead>
                <tbody>
                  {playRecords.map((record) => (
                    <tr key={record.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2 pr-4 font-medium text-gray-800">{record.gameTitle}</td>
                      <td className="py-2 pr-4 text-gray-500">
                        {new Date(record.playedAt).toLocaleString('zh-TW')}
                      </td>
                      <td className="py-2 text-gray-600">{record.durationMinutes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Comments */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            評論
            {!commentsLoading && (
              <span className="ml-2 text-xs text-gray-400 font-normal">
                ({comments.length} 則)
              </span>
            )}
          </h2>

          {commentsLoading ? (
            <p className="text-sm text-gray-400">載入中…</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-400">尚無評論</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs text-gray-400">
                      <span className="font-medium text-gray-600">{comment.gameTitle}</span>
                      {' · '}
                      {new Date(comment.createdAt).toLocaleString('zh-TW')}
                    </span>
                    <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    disabled={deleteCommentMutation.isPending}
                    className="shrink-0 text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded px-2 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    刪除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
