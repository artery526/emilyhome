# Emily's Home Change Guide

This file answers: when the user asks for a new feature or bug fix, which project should be changed?

## First Question

Before editing, classify the request by where the behavior lives.

```text
Visual layout or buttons in Emily's Home      -> D:\emilyhome
Journal save/read/edit/delete behavior        -> D:\ArkOS26\src\server.js
NAS Photos storage or image picker            -> D:\ArkOS26\src\server.js + D:\emilyhome UI if needed
Card picker or card record API                -> D:\ArkOS26\src\server.js + Emily card data source
Card spreadsheet writing/reporting            -> ArkOS server-side writer + Apps Script emilyCardRecord
Empire Control web dashboard                  -> D:\wealth-dashboard\index.html
Empire Control backend / Apps Script          -> D:\WebApp
Empire Android app                            -> D:\WebApp\EmpireAndroid
Emily workshop                                -> confirm exact folder first
```

## Modification Map

| User asks to change | Main owner | Usually edit | Verification |
| --- | --- | --- | --- |
| Logo, background, colors, button placement | Emily frontend | `D:\emilyhome\index.html` | GitHub Pages public HTML |
| Journal form fields or timeline display | Emily frontend | `D:\emilyhome\scripts\emilyhome.js`, `index.html` | Browser test + public JS |
| Save journal text | ArkOS backend | `D:\ArkOS26\src\server.js` | API smoke test |
| Upload journal photos to NAS Photos | ArkOS backend | `D:\ArkOS26\src\server.js` | API upload test + NAS file check |
| Edit or delete an entry | ArkOS backend + UI | `server.js`, `emilyhome.js` | API smoke test + browser flow |
| NAS Photos picker | ArkOS backend + UI | photo-library routes + Emily UI | month API + mobile layout |
| Card thumbnails | ArkOS backend + UI | card loader + card picker UI | card API + preview render |
| Card record spreadsheet sync | ArkOS + Apps Script | `D:\ArkOS26\src\server.js`, `D:\WebApp\WebApp.gs` | Sheet row verification |
| Empire command page | Empire frontend | `D:\wealth-dashboard\index.html` | GitHub Pages build + public HTML |
| Empire finance or command data | Apps Script | `D:\WebApp` | clasp deploy + live endpoint |
| App display or mobile native behavior | Android | `D:\WebApp\EmpireAndroid` | build + install or emulator/device check |

## Change Workflow

1. Identify the owner system from the map above.
2. Check the current local source before editing.
3. Make the smallest targeted change.
4. Run the relevant local check.
5. Publish or sync the changed system.
6. Verify both "code deployed" and "live behavior" separately.
7. Record important design decisions in `docs/decisions.md` when the behavior becomes a rule.

## Publication Rules

Frontend-only Emily changes:

```text
Edit D:\emilyhome
Commit and push to GitHub
Wait for GitHub Pages build
Read back public HTML/JS markers
```

ArkOS backend changes:

```text
Edit D:\ArkOS26\src\server.js
Run syntax/API smoke test locally
Backup NAS server.js
Copy server.js to \\DS920II\AI_CommandCenter\docker\ArkOS26\src
Restart arkos-api on NAS
Verify live API
```

Empire Control frontend changes:

```text
Edit D:\wealth-dashboard\index.html
Commit and push
Wait for Pages build
Verify public page markers
```

Apps Script changes:

```text
Edit D:\WebApp
Deploy with clasp.cmd
Verify live Apps Script endpoint
```

Android changes:

```text
Edit D:\WebApp\EmpireAndroid
Build APK
Install or launch on device/emulator
Verify the target screen directly
```

## Safety Rules

- Do not put private records or tokens in GitHub Pages.
- Do not let Emily's Home writes use Google credentials in public frontend code.
- Keep Emily journal data isolated from Empire Control data.
- For NAS deletes, confirm whether the request means "remove from entry" or "delete original NAS Photos file".
- For spreadsheet changes, confirm the target workbook and tab before writing.
