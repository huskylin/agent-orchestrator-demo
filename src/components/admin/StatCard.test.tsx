import { render, screen } from '@testing-library/react';
import StatCard from './StatCard';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="活躍用戶" value={1243} />);
    expect(screen.getByText('活躍用戶')).toBeInTheDocument();
    expect(screen.getByText((1243).toLocaleString())).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<StatCard label="遊戲數" value={210} icon="🎮" />);
    expect(screen.getByText('🎮')).toBeInTheDocument();
  });

  it('does not render icon element when icon is not provided', () => {
    const { container } = render(<StatCard label="評論數" value={18340} />);
    expect(container.querySelector('span.text-2xl')).not.toBeInTheDocument();
  });

  it('formats large numbers with locale string', () => {
    render(<StatCard label="評論數" value={18340} />);
    expect(screen.getByText((18340).toLocaleString())).toBeInTheDocument();
  });
});
