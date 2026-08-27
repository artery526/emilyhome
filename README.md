# emilyhome

Emily 的私密心情日記、NAS Photos 與抽牌記錄入口。

這個 repo 是 GitHub Pages 前端。文章、照片、語音與抽牌資料不存放在 GitHub，正式資料由 ArkOS API 寫入 NAS。

## Folders

- `index.html` - GitHub Pages 入口頁
- `scripts/` - 前端互動與 API 連線腳本
- `README/` - 架構、設計與部署說明
- `assets/` - 未來放品牌圖、社群預覽圖或靜態素材

## Project Docs

- `README/architecture.md` - Emily's Home 架構與資料歸屬
- `README/change-guide.md` - 以後新增或修正功能時，判斷要改哪個系統
- `README/decisions.md` - 目前已定案的設計決策
- `README/deploy.md` - 前端發布、後端同步與重啟流程
- `README/todo.md` - 待辦與後續功能候選
- `README/body-records-assessment.md` - 身體記錄功能評估與第一版設計

## Private Data

GitHub Pages 只提供入口畫面。未通過 ArkOS 後端登入時，頁面不會載入時間軸、月曆、文章、照片或抽牌紀錄。

預設 API 位置：

```text
https://api.ark-os26.cc
```

本機測試可在入口頁輸入測試 token。正式使用建議走 Cloudflare Access。

## 文件狀態

> 第一版，依目前 `D:\emilyhome` 前端與既有架構文件整理
>
> 最後整理：2026-08-10

## 功能總覽

| 分頁 | 主要內容 | 主要資料來源 |
| --- | --- | --- |
| 🌿 心情日記 | 月曆、時間軸、搜尋、文章新增／閱讀／編輯／刪除、照片與語音附件 | ArkOS wife-journal API、NAS |
| 🔮 記錄卡牌 | 單張／三張抽牌、牌卡圖片、牌卡時間軸 | ArkOS card API、Emily 卡牌試算表 |
| 🌙 身體記錄 | 月曆、月經／氣喘記錄、附件、當月檢視鎖 | Google Sheet Web App、Emily 卡牌試算表 |
| ✍️ 客戶記錄 | 人物設定、算牌紀錄、牌卡、附件、對方反饋 | ArkOS wife-journal API |

## 專案來源與責任邊界

| 功能 | 主要來源 | 維修位置 |
| --- | --- | --- |
| 畫面、樣式、分頁、行動版 | `index.html`、`scripts/emilyhome.js` | `D:\emilyhome` |
| 日記文字、附件、編輯與刪除 | ArkOS API | `D:\ArkOS26\src\server.js` |
| NAS Photos 影像庫與同步 | ArkOS API／NAS | `D:\ArkOS26\src\server.js` |
| 牌卡資料與客戶牌卡紀錄 | ArkOS API；必要時 Apps Script | `D:\ArkOS26`、`D:\WebApp` |
| 身體記錄與鎖定設定 | Google Sheet Web App | `D:\WebApp\WebApp.gs` 及 Emily 卡牌試算表 |

Emily's Home 與 Empire Control 是不同前端。除非明確需要共享資料，不要把兩者的 UI、token、資料表或 API 邏輯混在一起。

## 前端設定

主要腳本：[scripts/emilyhome.js](./scripts/emilyhome.js)

```text
預設 ArkOS API：https://api.ark-os26.cc
前端 localStorage：
  emilyhome.apiBase
  emilyhome.token
  emilyhome.sheetToken
```

使用者可在入口頁設定 API Base、ArkOS token 與試算表 token。token 只可留在使用者瀏覽器的 localStorage 或正式秘密管理位置，不可提交到 GitHub。

## 心情日記流程

```text
通過 ArkOS token
    ↓
GET /api/wife-journal/entries
    ↓
月份篩選／月曆／搜尋／時間軸
    ↓
GET /api/wife-journal/entries/:id
    ↓
閱讀、編輯或刪除
```

主要 API：

```text
GET    /api/wife-journal/entries
GET    /api/wife-journal/entries/:id
POST   /api/wife-journal/entries
PUT    /api/wife-journal/entries/:id
DELETE /api/wife-journal/entries/:id
```

規則：

- 一般心情日記與卡牌紀錄分開；前端以 `type`、`cardOnly`、`cardDraw` 分類。
- 每篇文章可使用 `normal`、`locked` 或 `password` visibility。
- 密碼文章閱讀時才要求密碼，不把密碼寫入 GitHub Pages。
- 照片／語音附件由前端分批上傳，目前每批最多 12 個檔案。
- 使用 NAS Photos 既有照片時保存引用；移除日記引用不應刪除原始 Photos 影像。
- 文章刪除與附件刪除是有影響的操作，執行前要確認是否為「移除文章附件」或「刪除 NAS 原檔」。

## 記錄卡牌流程

主要 API：

```text
GET  /api/wife-journal/cards
GET  /api/wife-journal/card-records
POST /api/wife-journal/card-records
```

卡牌資料可能由 ArkOS card database 根目錄的下列檔案提供：

```text
cards.json
medical-cards.json
tarot-cards.json
deck.json
```

Emily 卡牌試算表：

```text
Spreadsheet ID: 1GQBYT2jcNa9D6G39tntT5UfetXpgwfKYZ2h5fSy3bV8
觀察到的分頁：卡片圖案連結、牌卡統計、奧修禪卡記錄
```

牌卡圖片與 Google Sheet 寫入由後端處理；不要把 Google 帳號或寫入憑證放進公開前端。

## 身體記錄流程

身體記錄獨立於心情日記，資料寫入 Emily 卡牌試算表的：

```text
身體記錄
身體記錄設定
```

目前 action：

```text
emilyBodyRecords
emilyBodyLockStatus
emilyBodyLockSet
emilyBodyLockUnlock
emilyBodyRecordWrite
emilyBodyRecordDelete
```

前端透過 `sheetRequest()` 以 JSONP-style GET 呼叫 Apps Script Web App，並使用本機輸入的 sheet token。月曆以 `月經` 與 `氣喘` 類型顯示不同標記；身體記錄鎖定密碼由 `身體記錄設定` 的 `lockPassword` 控制，空白代表不鎖定。

身體記錄屬健康資料，除非使用者明確要求，不要在除錯輸出、截圖、Git 或公開回報中放入實際內容。

## 客戶記錄流程

客戶記錄使用 ArkOS 受保護 API：

```text
GET    /api/wife-journal/clients
POST   /api/wife-journal/clients
PUT    /api/wife-journal/clients/:personId
DELETE /api/wife-journal/clients/:personId
GET    /api/wife-journal/clients/:personId/records
POST   /api/wife-journal/clients/:personId/records
GET    /api/wife-journal/clients/:personId/records/:recordId
PUT    /api/wife-journal/clients/:personId/records/:recordId
POST   /api/wife-journal/clients/:personId/records/:recordId/feedback
```

人物設定刪除不應連帶刪除既有算牌紀錄；編輯紀錄、追加附件與新增對方反饋要分開驗證。

## 媒體與 NAS

正式資料不放在 GitHub Pages，主要 NAS 路徑為：

```text
\\DS920II\AI_CommandCenter\data\wife-journal\entries
\\DS920II\AI_CommandCenter\data\wife-journal\indexes
\\DS920II\home\Photos\心月記
```

前端媒體 URL 由 `mediaUrl()` 組合 API base；遇到圖片讀不到時，依序檢查 API token、Photo Library 讀取權限、`assetId`／舊 ID、縮圖與原圖端點。不要為了方便顯示而把私密照片改成公開分享。

## 部署與驗證

前端 repository：

```text
https://github.com/artery526/emilyhome.git
正式網站：https://artery526.github.io/emilyhome/
```

前端修改流程：

```powershell
git -C D:\emilyhome status --short --branch
git -C D:\emilyhome add index.html scripts\emilyhome.js README README.md
git -C D:\emilyhome commit -m "Describe the change"
git -C D:\emilyhome push origin main
```

Git push 不等於 Pages 已更新；要等待 build，再讀取正式 HTML／JS marker 驗證。

ArkOS 後端修改流程：

```text
D:\ArkOS26\src\server.js
    ↓ node --check
備份 NAS server.js
複製至 \\DS920II\AI_CommandCenter\docker\ArkOS26\src
重啟 arkos-api
驗證 live API
```

不要整份覆蓋 NAS 的 compose 或秘密設定。上傳功能應先使用暫存 `ARKOS_DATA_ROOT`／`ARKOS_PHOTOS_ROOT` 做 smoke test，再接觸正式資料。

## 維修順序

1. 先判斷是 UI、ArkOS、Google Sheet Web App、Apps Script、NAS 或 GitHub Pages 問題。
2. 讀取現有文件：[architecture](./README/architecture.md)、[change-guide](./README/change-guide.md)、[deploy](./README/deploy.md)、[decisions](./README/decisions.md)。
3. 讀取本機原始碼與正式 API 狀態，避免只依畫面推測。
4. 只修改指定系統與最小範圍。
5. 分開驗證前端發布、ArkOS live API、Apps Script GET／寫入與試算表回查。
6. 若是敏感資料、刪除操作、token 或 NAS 原檔，先確認邊界再動作。

## 既有文件

- [README/architecture.md](./README/architecture.md)：架構、資料歸屬與卡牌試算表。
- [README/change-guide.md](./README/change-guide.md)：需求對應的修改位置。
- [README/decisions.md](./README/decisions.md)：隱私、日記、卡牌與身體記錄設計決策。
- [README/deploy.md](./README/deploy.md)：GitHub Pages、ArkOS 與 NAS 部署驗證。
- [README/body-records-assessment.md](./README/body-records-assessment.md)：身體記錄資料模型與初版評估。
- [README/todo.md](./README/todo.md)：待辦與後續候選功能。
