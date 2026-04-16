import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { games, Game } from '../../data/games'

const columnHelper = createColumnHelper<Game>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('title', {
    header: '遊戲名稱',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: '類型',
    cell: (info) => (
      <span className="capitalize px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('rating', {
    header: '評分',
    cell: (info) => (
      <span className="font-medium text-yellow-600">★ {info.getValue().toFixed(1)}</span>
    ),
  }),
  columnHelper.accessor('isFree', {
    header: '費用',
    cell: (info) =>
      info.getValue() ? (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">免費</span>
      ) : (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">付費</span>
      ),
  }),
  columnHelper.accessor('publishedAt', {
    header: '發布日期',
    cell: (info) => info.getValue(),
  }),
]

export default function AdminGamesPage() {
  const [globalFilter, setGlobalFilter] = useState('')

  const data = useMemo(() => games, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const firstRow = pageIndex * pageSize + 1
  const lastRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">遊戲列表管理</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="搜尋遊戲名稱、類型…"
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                    沒有符合條件的遊戲
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span>
            {totalRows > 0 ? `顯示第 ${firstRow}–${lastRow} 筆，共 ${totalRows} 筆` : '無資料'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              «
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              ‹
            </button>
            <span className="px-2">
              第 {pageIndex + 1} / {table.getPageCount()} 頁
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              ›
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              »
            </button>
            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="ml-2 px-2 py-1 border border-gray-300 rounded bg-white"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  每頁 {size} 筆
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
