import React from 'react';
import type { UserRole } from './AdminUserTable';

interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  role: UserRole;
  registeredAt: string;
}

interface PlayRecord {
  gameId: string;
  gameTitle: string;
  playedAt: string;
  durationMinutes: number;
}

interface UserComment {
  id: string;
  gameTitle: string;
  content: string;
  postedAt: string;
}

// Mock data generators
function getMockProfile(userId: string): UserProfile {
  return {
    id: userId,
    email: `user-${userId}@example.com`,
    nickname: `玩家${userId}`,
    role: 'user',
    registeredAt: '2024-03-15T08:00:00Z',
  };
}

function getMockPlayRecords(userId: string): PlayRecord[] {
  return [
    { gameId: 'g1', gameTitle: '暗黑破壞神 IV', playedAt: '2024-11-01T14:00:00Z', durationMinutes: 120 },
    { gameId: 'g2', gameTitle: '薩爾達傳說：王國之淚', playedAt: '2024-10-28T20:00:00Z', durationMinutes: 90 },
    { gameId: 'g3', gameTitle: '最終幻想 XVI', playedAt: '2024-10-20T18:00:00Z', durationMinutes: 60 },
  ].map((r) => ({ ...r, gameId: `${r.gameId}-${userId}` }));
}

function getMockComments(userId: string): UserComment[] {
  return [
    {
      id: `c1-${userId}`,
      gameTitle: '暗黑破壞神 IV',
      content: '遊戲非常好玩，畫面精美，劇情引人入勝。',
      postedAt: '2024-11-02T09:00:00Z',
    },
    {
      id: `c2-${userId}`,
      gameTitle: '薩爾達傳說：王國之淚',
      content: '開放世界探索感十足，建造系統創意無限。',
      postedAt: '2024-10-29T11:30:00Z',
    },
  ];
}

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-yellow-100 text-yellow-800',
  user: 'bg-blue-100 text-blue-800',
};

interface AdminUserDetailProps {
  userId: string;
}

const AdminUserDetail: React.FC<AdminUserDetailProps> = ({ userId }) => {
  const [comments, setComments] = React.useState<UserComment[]>(() =>
    getMockComments(userId)
  );

  const profile = getMockProfile(userId);
  const playRecords = getMockPlayRecords(userId);

  const handleDeleteComment = (commentId: string) => {
    console.log(`[AUDIT LOG] Admin deleted comment id=${commentId} for userId=${userId} at ${new Date().toISOString()}`);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      {/* Basic Profile */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">基本資料</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">暱稱</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.nickname}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">角色</dt>
            <dd className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_BADGE_STYLES[profile.role]}`}
              >
                {profile.role}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">註冊日期</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(profile.registeredAt).toLocaleDateString('zh-TW')}
            </dd>
          </div>
        </dl>
      </section>

      {/* Play Records */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">遊玩紀錄</h2>
        {playRecords.length === 0 ? (
          <p className="text-sm text-gray-400">尚無遊玩紀錄</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  遊戲名稱
                </th>
                <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  遊玩時間
                </th>
                <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  時長（分鐘）
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {playRecords.map((record) => (
                <tr key={record.gameId}>
                  <td className="py-2 text-sm text-gray-900">{record.gameTitle}</td>
                  <td className="py-2 text-sm text-gray-600">
                    {new Date(record.playedAt).toLocaleString('zh-TW')}
                  </td>
                  <td className="py-2 text-sm text-gray-600">{record.durationMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Comments */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          發表的評論
          <span className="ml-2 text-sm font-normal text-gray-400">
            （{comments.length} 則）
          </span>
        </h2>
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">尚無評論</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="flex items-start justify-between gap-4 p-3 rounded-md bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    {comment.gameTitle}
                  </p>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.postedAt).toLocaleString('zh-TW')}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="shrink-0 text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  刪除評論
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminUserDetail;
