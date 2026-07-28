# Emily's Home Deploy Notes

## Frontend

Repository:

```text
D:\emilyhome
https://github.com/artery526/emilyhome.git
```

Live site:

```text
https://artery526.github.io/emilyhome/
```

Deploy flow:

```powershell
git -C D:\emilyhome status --short --branch
git -C D:\emilyhome add index.html scripts\emilyhome.js docs README.md
git -C D:\emilyhome commit -m "Describe the change"
git -C D:\emilyhome push origin main
```

Then wait for the GitHub Pages workflow and verify public HTML/JS markers.

## ArkOS Backend

Local source:

```text
D:\ArkOS26\src\server.js
```

NAS deployment target:

```text
\\DS920II\AI_CommandCenter\docker\ArkOS26\src\server.js
```

Before copying to NAS, run:

```powershell
node --check D:\ArkOS26\src\server.js
```

Recommended backup and copy pattern:

```powershell
$stamp=Get-Date -Format 'yyyyMMdd-HHmmss'
$nas='\\DS920II\AI_CommandCenter\docker\ArkOS26'
$src=Join-Path $nas 'src'
$backup=Join-Path $nas ("backup-emilyhome-"+$stamp)
New-Item -ItemType Directory -Force -Path $backup | Out-Null
Copy-Item -LiteralPath (Join-Path $src 'server.js') -Destination (Join-Path $backup 'server.js.bak') -Force
Copy-Item -LiteralPath 'D:\ArkOS26\src\server.js' -Destination (Join-Path $src 'server.js') -Force
```

Restart on NAS:

```bash
cd /volume2/AI_CommandCenter/docker/ArkOS26
sudo docker compose up -d --build arkos-api
```

## Verification Examples

Frontend:

```powershell
$html=(Invoke-WebRequest -UseBasicParsing 'https://artery526.github.io/emilyhome/?v=<commit>').Content
$html.Contains("Emily's Home")
```

Backend:

```powershell
node --check D:\ArkOS26\src\server.js
```

For uploads, use a temporary local `ARKOS_DATA_ROOT` and `ARKOS_PHOTOS_ROOT` smoke test before touching live data.
