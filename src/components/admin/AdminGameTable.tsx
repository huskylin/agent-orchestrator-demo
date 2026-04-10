import React from 'react';

interface Game {
  id: number;
  title: string;
  genre: string;
  status: 'active' | 'inactive';
}

interface AdminGameTableProps {
  games: Game[];
}

const AdminGameTable: React.FC<AdminGameTableProps> = ({ games }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Genre</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game.id}>
            <td>{game.id}</td>
            <td>{game.title}</td>
            <td>{game.genre}</td>
            <td>{game.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminGameTable;
