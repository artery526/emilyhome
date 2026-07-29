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

## Storage

The first version stores body records in the Emily card spreadsheet because the primary use is backup and statistics:

```text
Emily卡牌空間 -> 身體記錄
```

Columns:

```text
月份
紀錄時間
日期
類型
程度
流量
疼痛程度
氣喘誘因
是否用藥
備註
記錄ID
來源
```

The frontend calls the Apps Script Web App directly by JSONP-style GET requests, using the locally entered token. This keeps Google credentials out of GitHub Pages while avoiding a NAS backend dependency for this feature.

## Apps Script Actions

```text
emilyBodyRecords
emilyBodyRecordWrite
emilyBodyRecordDelete
```

All three actions require the write token.

## Implementation Notes

- Do not store body records in GitHub Pages local code.
- Do not mix body records into `wife-journal/entries`.
- Month calendar should support historical year/month lookup.
- Keep the first version simple: date, type, notes, optional severity.
- Avoid medical interpretation in the app. Store observations only.

## First Version

1. Add Body tab in Emily's Home.
2. Build month calendar with period/asthma markers.
3. Add selected-day create/delete.
4. Store rows in `身體記錄`.
5. Add edit only after create/delete is stable.
