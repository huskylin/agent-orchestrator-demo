import React from 'react';
import { RecentComment } from '../../data/adminMockData';

interface RecentCommentsProps {
  recentComments: RecentComment[];
  onDeleteComment: (id: string) => void;
}

const RecentComments: React.FC<RecentCommentsProps> = ({ recentComments, onDeleteComment }) => {
  return (
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
  );
};

export default RecentComments;
