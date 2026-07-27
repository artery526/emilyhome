# emilyhome Architecture

## Goal

`emilyhome` is a private front door for Emily's journal. The GitHub Pages site is public static HTML, but private records are loaded only from the protected ArkOS API.

## Data Ownership

The frontend does not store records in GitHub.

Primary storage:

```text
\\DS920II\AI_CommandCenter\data\wife-journal\entries
\\DS920II\AI_CommandCenter\data\wife-journal\indexes
\\DS920II\home\Photos\心月記
```

## API

Expected ArkOS API routes:

```text
GET  /api/wife-journal/entries
GET  /api/wife-journal/entries/:id
POST /api/wife-journal/entries
GET  /api/wife-journal/card-records
POST /api/wife-journal/card-records
GET  /api/wife-journal/cards
GET  /api/photo-library/summary
GET  /api/photo-library/months/:year/:month
```

## Privacy Model

1. Site shell is static and public.
2. Records and photos are requested only after API connection succeeds.
3. ArkOS API requires admin access or local test token.
4. Individual journal entries may still use `normal`, `locked`, or `password` visibility.

## Card Database

The card record page is separated from the mood journal. Mood entries use `type: "mood"` and card records use `type: "card"`, so the timeline and calendar can stay focused on mood journal entries.

The card picker reads from the ArkOS API. The API currently checks the configured card database root for:

```text
cards.json
medical-cards.json
tarot-cards.json
deck.json
```

The frontend accepts common fields such as `id`, `cardId`, `name`, `cardName`, `title`, `label`, `deck`, and `type`.

## Card Spreadsheet

Dedicated Google Sheet:

```text
https://docs.google.com/spreadsheets/d/1GQBYT2jcNa9D6G39tntT5UfetXpgwfKYZ2h5fSy3bV8/edit
```

Observed workbook title: `Emily卡牌空間`.

Useful tabs:

```text
卡片圖案連結 - tarot / oracle card names and Google Drive image links
牌卡統計 - card draw rows and monthly report area
```

Recommendation: keep the public GitHub Pages frontend read-only for Google credentials. Formal spreadsheet writes should be performed by ArkOS server-side code or a private Apps Script endpoint, using the same row shape as `牌卡統計`.
