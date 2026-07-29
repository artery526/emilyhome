# Emily's Home Decisions

## Project Role

Emily's Home is a private journal and card-record frontend. It is not the same system as Empire Control, even though it reuses ArkOS backend patterns.

## Storage

- GitHub Pages stores only the static frontend.
- Journal text is stored by ArkOS under NAS-backed wife-journal data folders.
- Journal-uploaded photos are synced into NAS Photos under `心月記/YYYY/MM`.
- Voice files are stored as journal attachments.
- Existing NAS Photos selected from the picker are referenced by the entry; the original library photo is not duplicated unless uploaded through the journal form.

## Privacy

- The site shell may be public.
- Journal records load only after protected ArkOS API access.
- Individual entries can use normal, locked, or password visibility.
- Public frontend code must not contain write credentials for Google Sheets or NAS.

## Journal UI

- First screen prioritizes timeline and month calendar.
- Mood score and mood field were removed.
- Photos, voice, and quick tags are part of mood journal creation/editing.
- Timeline entries support edit and delete.
- Entry delete removes the journal entry and that entry's uploaded/synced attachments, but should not delete original NAS Photos library images that were only inserted.

## Calendar

- Month calendar displays Monday through Sunday.
- Weekends use a light red background.
- Dates show dot counts when multiple journal entries exist on the same day.
- Clicking a date filters the timeline to that day.

## Cards

- Card records are separated from mood journal entries.
- The card page supports single-card and three-card draws.
- Card records automatically sync to the Emily card spreadsheet through ArkOS and private Apps Script action `emilyCardRecord`.
- Osho single-card options come from `Emily卡牌空間` -> `卡片圖案連結` columns C:D, where C is the card name and D is the image link.
- Tarot records write to `牌卡統計`.
- Osho Zen records write to `奧修禪卡記錄`.

## Body Records

- Body records are separated from mood journal entries and card records.
- The first version writes directly from Emily's Home to Apps Script actions with the locally entered token.
- Body rows are stored in `Emily卡牌空間` -> `身體記錄`.
- The body record page supports month lookup, calendar markers, create, and delete.

## Branding

- Page title is `Emily's Home`.
- Main background uses `background.png`.
- Top-left logo uses `cssindex.png`.
- The logo is fixed at the top-left corner.
- The refresh button sits beside the journal/card view tabs, not in the top header.
