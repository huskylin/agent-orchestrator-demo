import React from 'react';
import { SummaryStats } from '../../data/adminMockData';

interface DashboardStatsProps {
  stats: SummaryStats;
}

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</span>
  </div>
);

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard label="今日活躍" value={stats.todayActive} />
      <StatCard label="本月新增用戶" value={stats.monthNewUsers} />
      <StatCard label="遊戲總數" value={stats.totalGames} />
      <StatCard label="評論總數" value={stats.totalComments} />
    </div>
  );
};

export default DashboardStats;
