import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  DailyActiveUser,
  GameByCategory,
  TopGame,
  RecentComment,
} from '../../data/adminMockData';

interface DashboardChartsProps {
  dailyActiveUsers: DailyActiveUser[];
  gamesByCategory: GameByCategory[];
  topGames: TopGame[];
  recentComments: RecentComment[];
  onDeleteComment: (id: string) => void;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  dailyActiveUsers,
  gamesByCategory,
  topGames,
  recentComments,
  onDeleteComment,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Line chart: daily active users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">近 30 天每日活躍用戶</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={dailyActiveUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(v: string) => v.slice(5)}
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart: games by category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">各分類遊戲數量</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={gamesByCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 games table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">熱門遊戲 Top 10</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">遊戲名稱</th>
              <th className="py-2">瀏覽次數</th>
            </tr>
          </thead>
          <tbody>
            {topGames.map((game, index) => (
              <tr key={game.id} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-4 text-gray-400">{index + 1}</td>
                <td className="py-2 pr-4 font-medium text-gray-800">{game.title}</td>
                <td className="py-2 text-gray-600">{game.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent comments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">最近評論</h2>
        <ul className="flex flex-col gap-3">
          {recentComments.map((comment) => (
            <li
              key={comment.id}
              className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">
                  <span className="font-medium text-gray-600">{comment.user}</span> ·{' '}
                  {comment.gameTitle} ·{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
              <button
                onClick={() => onDeleteComment(comment.id)}
                className="shrink-0 text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded px-2 py-1 transition-colors"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCharts;
