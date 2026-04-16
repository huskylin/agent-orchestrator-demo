import React from 'react';

export interface StatCardProps {
  label: string;
  value: number;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
    {icon && <span className="text-2xl">{icon}</span>}
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</span>
  </div>
);

export default StatCard;
