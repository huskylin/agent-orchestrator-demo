# Spec 01 — 首頁遊戲列表與輪播 Banner

## 狀態：✅ 部分完成

## 需求描述
實作遊戲平台首頁，包含主視覺輪播 Banner 與遊戲卡片列表。

## 驗收條件

- [x] 頂部 HeroBanner 元件
- [x] 「熱門遊戲」區塊，顯示遊戲卡片（封面圖、名稱、分類、評分）
- [ ] Banner 支援 3–5 張圖片自動輪播
- [ ] 「最新上架」區塊
- [x] 遊戲卡片點擊後導向遊戲詳情頁（路由待 #15 完成）
- [ ] RWD，支援手機與桌機

## 技術備註
- React + Tailwind CSS
- 遊戲資料使用 mock data（`src/data/games.ts`）

## 已完成的實作
- `src/components/HeroBanner.tsx`
- `src/components/GameCard.tsx`
- `src/components/CategoryFilter.tsx`
- `src/data/games.ts`
- `src/pages/HomePage.tsx`
- `src/utils/formatRating.ts`

## 待實作
- Banner 自動輪播功能
- 「最新上架」區塊
- RWD 完整調整
