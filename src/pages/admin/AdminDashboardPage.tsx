import React from 'react';
import StatCard from '../../components/admin/StatCard';
import { dashboardStats } from '../../data/mockDashboard';

const icons: Record<string, string> = {
  activeUsers: '👥',
  newUsers: '🆕',
  totalGames: '🎮',
  totalComments: '💬',
};

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">管理後台</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={icons[stat.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
