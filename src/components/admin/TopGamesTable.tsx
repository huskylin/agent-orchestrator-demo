import React from 'react';
import { TopGame } from '../../data/adminMockData';

interface TopGamesTableProps {
  topGames: TopGame[];
}

const TopGamesTable: React.FC<TopGamesTableProps> = ({ topGames }) => {
  return (
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
  );
};

export default TopGamesTable;
