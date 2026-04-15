import React, { useState } from 'react';
import { games } from '../../data/games';

type Category = {
  id: string;
  name: string;
  label: string;
};

const defaultCategories: Category[] = [
  { id: 'action', name: 'action', label: 'Action' },
  { id: 'rpg', name: 'rpg', label: 'RPG' },
  { id: 'shooter', name: 'shooter', label: 'Shooter' },
  { id: 'strategy', name: 'strategy', label: 'Strategy' },
  { id: 'casual', name: 'casual', label: 'Casual' },
];

function collectAllTags(): string[] {
  const tagSet = new Set<string>();
  games.forEach((game) => game.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

const CategoryTagPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [tags, setTags] = useState<string[]>(collectAllTags);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [newTag, setNewTag] = useState('');
  const [tagError, setTagError] = useState('');

  // --- Category handlers ---
  const handleAddCategory = () => {
    const name = newCategoryName.trim().toLowerCase();
    const label = newCategoryLabel.trim();

    if (!name || !label) {
      setCategoryError('分類識別名稱與顯示名稱皆為必填。');
      return;
    }
    if (categories.some((c) => c.name === name)) {
      setCategoryError(`分類「${name}」已存在。`);
      return;
    }

    setCategories((prev) => [...prev, { id: name, name, label }]);
    setNewCategoryName('');
    setNewCategoryLabel('');
    setCategoryError('');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // --- Tag handlers ---
  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (!tag) {
      setTagError('標籤名稱不可為空。');
      return;
    }
    if (tags.includes(tag)) {
      setTagError(`標籤「${tag}」已存在。`);
      return;
    }
    setTags((prev) => [...prev, tag].sort());
    setNewTag('');
    setTagError('');
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddCategory();
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTag();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-gray-800">分類與標籤管理</h1>

        {/* Categories Section */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">遊戲分類</h2>

          {/* Add category form */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={handleCategoryKeyDown}
              placeholder="識別名稱（英文，如 puzzle）"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              value={newCategoryLabel}
              onChange={(e) => setNewCategoryLabel(e.target.value)}
              onKeyDown={handleCategoryKeyDown}
              placeholder="顯示名稱（如 益智）"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddCategory}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              新增分類
            </button>
          </div>
          {categoryError && (
            <p className="text-sm text-red-500">{categoryError}</p>
          )}

          {/* Category list */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2 pr-4 font-medium">識別名稱</th>
                  <th className="py-2 pr-4 font-medium">顯示名稱</th>
                  <th className="py-2 font-medium">使用遊戲數</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const count = games.filter((g) => g.category === cat.name).length;
                  return (
                    <tr key={cat.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4 text-gray-600 font-mono">{cat.name}</td>
                      <td className="py-2 pr-4 text-gray-800 font-medium">{cat.label}</td>
                      <td className="py-2 text-gray-500">{count}</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded px-2 py-1 transition-colors"
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      尚無分類
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tags Section */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">遊戲標籤</h2>

          {/* Add tag form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="新標籤名稱（如 multiplayer）"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddTag}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              新增標籤
            </button>
          </div>
          {tagError && (
            <p className="text-sm text-red-500">{tagError}</p>
          )}

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-1 text-sm"
              >
                {tag}
                <button
                  onClick={() => handleDeleteTag(tag)}
                  aria-label={`刪除標籤 ${tag}`}
                  className="ml-1 text-indigo-400 hover:text-red-500 transition-colors font-bold leading-none"
                >
                  &times;
                </button>
              </span>
            ))}
            {tags.length === 0 && (
              <p className="text-gray-400 text-sm">尚無標籤</p>
            )}
          </div>

          <p className="text-xs text-gray-400">
            共 {tags.length} 個標籤，來源自現有遊戲資料。
          </p>
        </section>
      </div>
    </div>
  );
};

export default CategoryTagPage;
