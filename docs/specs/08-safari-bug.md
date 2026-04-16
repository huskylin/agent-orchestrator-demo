# Spec 08 — Bug: 首頁遊戲卡片在 Safari 上版面跑版

## 狀態：🔲 未修復

## 問題描述
在 Safari 16（macOS Ventura）上，首頁遊戲卡片的封面圖高度不一致，導致 grid 排版錯亂。

## 重現步驟
1. 用 Safari 開啟首頁
2. 觀察「熱門遊戲」區塊
3. 卡片高度出現不一致，圖片未正確裁切

## 預期行為
所有卡片高度應一致，封面圖以 `object-fit: cover` 呈現。

## 環境
- Browser: Safari 16.5
- OS: macOS Ventura 13.4
- 裝置：MacBook Pro M2

## 可能原因
Safari 對 CSS Grid 搭配 `aspect-ratio` 的支援與 Chrome 行為不同。

## 相關檔案
- `src/components/GameCard.tsx`
