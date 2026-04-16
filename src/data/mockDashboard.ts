export interface DashboardStat {
  id: string;
  label: string;
  value: number;
}

export const dashboardStats: DashboardStat[] = [
  { id: 'activeUsers', label: '活躍用戶', value: 1243 },
  { id: 'newUsers', label: '新增用戶', value: 5820 },
  { id: 'totalGames', label: '遊戲數', value: 210 },
  { id: 'totalComments', label: '評論數', value: 18340 },
];
