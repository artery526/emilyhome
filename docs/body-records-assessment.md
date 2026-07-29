# Body Records Assessment

## Goal

Add a separate body records area to Emily's Home for month-based review and historical lookup.

Initial record types:

- 月經來時
- 氣喘發作日

This should be separated from mood journal entries. Body records are health timeline data, not articles.

## Recommended UI

Add a new top-level view tab:

```text
🌙 身體記錄
```

Main layout:

- Month calendar first.
- Left or lower panel shows selected day records.
- A compact add form for the selected day.
- Year/month selectors for old data lookup.

Calendar markers:

- 月經日: soft rose marker.
- 氣喘發作日: soft blue marker.
- Both on the same day: dual marker.

## Data Model

Recommended JSON record shape:

```json
{
  "id": "2026-07-29-period-001",
  "date": "2026-07-29",
  "type": "period",
  "severity": "",
  "notes": "",
  "createdAt": "2026-07-29T00:00:00.000Z",
  "updatedAt": "2026-07-29T00:00:00.000Z"
}
```

Allowed `type` values:

```text
period
asthma
```

Optional future fields:

- `flow`: light / normal / heavy
- `painLevel`: 0-10
- `asthmaLevel`: mild / medium / severe
- `medicine`: text
- `trigger`: weather / dust / stress / exercise / unknown

## NAS Storage

Recommended root:

```text
\\DS920II\AI_CommandCenter\data\emily-body-records
```

Recommended structure:

```text
records/YYYY/MM/YYYY-MM-DD.json
indexes/months/YYYY-MM.json
indexes/summary.json
```

Each day file can contain multiple records:

```json
{
  "date": "2026-07-29",
  "records": []
}
```

## API Proposal

```text
GET    /api/emily-body-records/months/:year/:month
GET    /api/emily-body-records/days/:date
POST   /api/emily-body-records
PUT    /api/emily-body-records/:id
DELETE /api/emily-body-records/:id
```

All routes should require the same protected ArkOS access as wife journal records.

## Implementation Notes

- Do not store body records in GitHub Pages.
- Do not mix body records into `wife-journal/entries`.
- Month calendar should support historical year/month lookup.
- Keep the first version simple: date, type, notes, optional severity.
- Avoid medical interpretation in the app. Store observations only.

## Suggested First Version

1. Add body records backend storage and API in ArkOS.
2. Add Body tab in Emily's Home.
3. Build month calendar with period/asthma markers.
4. Add selected-day create/delete.
5. Add edit only after create/delete is stable.
