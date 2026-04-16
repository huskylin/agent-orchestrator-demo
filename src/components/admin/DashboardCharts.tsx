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
import { DailyActiveUser, GameByCategory } from '../../data/adminMockData';

interface DashboardChartsProps {
  dailyActiveUsers: DailyActiveUser[];
  gamesByCategory: GameByCategory[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  dailyActiveUsers,
  gamesByCategory,
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
    </div>
  );
};

export default DashboardCharts;
