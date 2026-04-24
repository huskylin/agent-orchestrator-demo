---
task_id: MOPFREQ-3224
title: 首頁「最新上架」區塊
files_to_touch:
  - src/pages/HomePage.tsx
  - src/components/NewReleaseSection.tsx
blocked_by: []
---

# 設計說明

## 需求摘要

在 HomePage 新增「最新上架」遊戲區塊，依上架日期（`publishedAt`）排序，顯示最新的 6 款遊戲。

## 實作方案

### 元件結構

**`src/components/NewReleaseSection.tsx`**
- 接收 `games: Game[]` prop（已由 HomePage 依 `publishedAt` 降冪排序並取前 6 筆）
- 渲染一個帶有「最新上架」標題的區塊
- 使用與現有遊戲網格相同的 RWD grid（1/2/3 欄）展示 `GameCard`
- 不持有資料邏輯，純呈現層元件

**`src/pages/HomePage.tsx`**（修改）
- 從 `games.ts` 的 `games` 陣列依 `publishedAt` 降冪排序，取前 6 筆
- 在現有的 CategoryFilter + 遊戲卡片網格**上方**插入 `<NewReleaseSection games={newReleases} />`

### 資料流

```
src/data/games.ts
  └── games[]  ──sort by publishedAt desc, slice(0,6)──▶ newReleases
                                                          └── NewReleaseSection (props)
                                                                └── GameCard × 6
```

### 日期欄位說明

issue 描述使用「releaseDate」，但現有 `Game` 介面的對應欄位為 `publishedAt`（格式：`YYYY-MM-DD` 字串）。實作時直接使用 `publishedAt` 進行排序，不新增欄位。

## 注意事項

- `NewReleaseSection` 為純 UI 元件，資料排序邏輯留在 `HomePage`，保持元件可測試性。
- 排序以字串比較即可（ISO 8601 格式保證字典序等同時間序）。
- 測試檔案 `src/components/NewReleaseSection.test.tsx` 需一併新增（project rule）。
- 不修改 `src/data/games.ts`，使用現有欄位即可。
