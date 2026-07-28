# emilyhome

Emily 的私密心情日記、NAS Photos 與抽牌記錄入口。

這個 repo 是 GitHub Pages 前端。文章、照片、語音與抽牌資料不存放在 GitHub，正式資料由 ArkOS API 寫入 NAS。

## Folders

- `index.html` - GitHub Pages 入口頁
- `scripts/` - 前端互動與 API 連線腳本
- `docs/` - 架構、設計與部署說明
- `assets/` - 未來放品牌圖、社群預覽圖或靜態素材

## Project Docs

- `docs/architecture.md` - Emily's Home 架構與資料歸屬
- `docs/change-guide.md` - 以後新增或修正功能時，判斷要改哪個系統
- `docs/decisions.md` - 目前已定案的設計決策
- `docs/deploy.md` - 前端發布、後端同步與重啟流程
- `docs/todo.md` - 待辦與後續功能候選

## Private Data

GitHub Pages 只提供入口畫面。未通過 ArkOS 後端登入時，頁面不會載入時間軸、月曆、文章、照片或抽牌紀錄。

預設 API 位置：

```text
https://api.ark-os26.cc
```

本機測試可在入口頁輸入測試 token。正式使用建議走 Cloudflare Access。
