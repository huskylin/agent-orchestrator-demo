import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

export type UserRole = 'user' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'disabled';

export interface AdminUser {
  id: string;
  email: string;
  nickname: string;
  role: UserRole;
  registeredAt: string;
  status: UserStatus;
}

interface AdminUserTableProps {
  users: AdminUser[];
  onViewDetail: (userId: string) => void;
  onToggleStatus: (userId: string, currentStatus: UserStatus) => void;
  onChangeRole: (userId: string, currentRole: UserRole) => void;
}

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-yellow-100 text-yellow-800',
  user: 'bg-blue-100 text-blue-800',
};

const columnHelper = createColumnHelper<AdminUser>();

const AdminUserTable: React.FC<AdminUserTableProps> = ({
  users,
  onViewDetail,
  onToggleStatus,
  onChangeRole,
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        globalFilter === '' ||
        user.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
        user.nickname.toLowerCase().includes(globalFilter.toLowerCase());
      const matchesRole = roleFilter === '' || user.role === roleFilter;
      const matchesStatus = statusFilter === '' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, globalFilter, roleFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => <span className="text-sm text-gray-900">{info.getValue()}</span>,
      }),
      columnHelper.accessor('nickname', {
        header: '暱稱',
        cell: (info) => <span className="text-sm text-gray-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor('role', {
        header: '角色',
        cell: (info) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_BADGE_STYLES[info.getValue()]}`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('registeredAt', {
        header: '註冊日期',
        cell: (info) => (
          <span className="text-sm text-gray-600">
            {new Date(info.getValue()).toLocaleDateString('zh-TW')}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        header: '狀態',
        cell: (info) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              info.getValue() === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {info.getValue() === 'active' ? '啟用' : '停用'}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '操作',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetail(row.original.id)}
              className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              查看詳情
            </button>
            <button
              onClick={() => onToggleStatus(row.original.id, row.original.status)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                row.original.status === 'active'
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {row.original.status === 'active' ? '停用' : '啟用'}
            </button>
            <button
              onClick={() => onChangeRole(row.original.id, row.original.role)}
              className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
            >
              修改角色
            </button>
          </div>
        ),
      }),
    ],
    [onViewDetail, onToggleStatus, onChangeRole]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="搜尋 email 或暱稱..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | '')}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">所有角色</option>
          <option value="user">user</option>
          <option value="moderator">moderator</option>
          <option value="admin">admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | '')}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">所有狀態</option>
          <option value="active">啟用</option>
          <option value="disabled">停用</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  無符合條件的用戶
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-400">
        共 {filteredData.length} 筆結果（總計 {users.length} 位用戶）
      </div>
    </div>
  );
};

export default AdminUserTable;
