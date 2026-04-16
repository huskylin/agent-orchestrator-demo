import { render, screen } from '@testing-library/react';
import AdminDashboardPage from './AdminDashboardPage';
import { dashboardStats } from '../../data/mockDashboard';

describe('AdminDashboardPage', () => {
  it('renders the page heading', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('管理後台');
  });

  it('renders all four stat card labels', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('活躍用戶')).toBeInTheDocument();
    expect(screen.getByText('新增用戶')).toBeInTheDocument();
    expect(screen.getByText('遊戲數')).toBeInTheDocument();
    expect(screen.getByText('評論數')).toBeInTheDocument();
  });

  it('displays the correct stat values from mockDashboard', () => {
    render(<AdminDashboardPage />);
    for (const stat of dashboardStats) {
      expect(screen.getByText(stat.value.toLocaleString())).toBeInTheDocument();
    }
  });

  it('renders an icon for each stat card', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('🆕')).toBeInTheDocument();
    expect(screen.getByText('🎮')).toBeInTheDocument();
    expect(screen.getByText('💬')).toBeInTheDocument();
  });
});
