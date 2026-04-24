---
task_id: MOPFREQ-3223
title: HeroBanner 自動輪播功能（3–5 張圖片）
files_to_touch:
  - src/components/HeroBanner.tsx
  - src/components/HeroBanner.test.tsx
blocked_by: []
---

# 設計說明

## 需求摘要

實作 HeroBanner 元件支援 3–5 張圖片自動輪播，包含：
- 切換指示點（indicator dots）顯示目前位於第幾張
- 自動播放計時器（預設 5 秒切換一次）
- 向前/向後手動切換按鈕
- 滑鼠懸停時暫停自動播放（UX 優化）
- 保持與現有單圖 props 的向下相容性

## 實作方案

### 元件結構

新增 `SlideItem` 介面描述每張輪播幻燈片：

```ts
interface SlideItem {
  title: string
  subtitle: string
  backgroundUrl: string
  ctaLabel: string
  onCtaClick: () => void
}
```

`HeroBannerProps` 同時支援新的 `slides` 陣列與舊有的單圖 props（向下相容）：

```ts
interface HeroBannerProps {
  slides?: SlideItem[]         // 新：傳入 3–5 張幻燈片
  autoPlayInterval?: number    // ms，預設 5000
  // 舊有 props（向下相容）
  title?: string
  subtitle?: string
  backgroundUrl?: string
  ctaLabel?: string
  onCtaClick?: () => void
}
```

### 資料流

1. 若傳入 `slides`，直接使用；否則從舊有 props 組成單張幻燈片陣列
2. `useState` 管理 `currentIndex`
3. `useEffect` 設定 `setInterval` 自動推進 index，滑鼠懸停（`isHovered` state）時清除計時器
4. 指示點點擊可跳至任意張
5. 左右箭頭按鈕手動切換

### HomePage.tsx 更新（本 issue 範圍外）

`HomePage.tsx` 目前以舊有單圖 props 呼叫 `HeroBanner`，因本元件保持向下相容，現有程式碼無需改動。後續可另立 issue 將 `HomePage.tsx` 升級為傳入 `getFeaturedGames()` 的前 4–5 張做為 `slides`。

## 注意事項

- `slides` 陣列長度建議 3–5，但元件不強制限制，可正常顯示 1–N 張
- 若只有 1 張（含舊有單圖 props），不顯示指示點與箭頭，行為與舊版一致
- 自動播放計時器在 unmount 時必須清除（useEffect cleanup），避免 memory leak
- 測試使用 `vi.useFakeTimers()` 模擬計時器推進，不依賴實際時間
