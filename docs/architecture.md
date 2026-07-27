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

The card picker reads from the ArkOS API. The API currently checks the configured card database root for:

```text
cards.json
medical-cards.json
tarot-cards.json
deck.json
```

The frontend accepts common fields such as `id`, `cardId`, `name`, `cardName`, `title`, `label`, `deck`, and `type`.
