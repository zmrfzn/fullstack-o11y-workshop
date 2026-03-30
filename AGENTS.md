# Agent Handoff — PERN Full Stack Observability Workshop

This document is the source of truth for any agent or assistant continuing work on this project.

## Project

A PERN stack app (PostgreSQL, Express, React, Node.js) used as a **New Relic observability workshop** on **Instruqt**.

**Repo:** `zmrfzn/fullstack-o11y-workshop`
**Primary branch:** `instruqt-workshop`
**Track folder:** `workshop-instruqt/`

---

## App Architecture

- **Port 8080** — Express API + React static build (`express.static` from `packages/frontend/dist`)
- **Port 3000** — Vite dev server (used in workshop challenges C3–C5 for live editing)
- `VITE_APP_API_URL=/api` — relative URL, Vite proxies `/api → localhost:8080` in dev mode
- No `type:service` Instruqt tabs — students use `echo $HOSTNAME.$_SANDBOX_ID.instruqt.io:PORT` and open in their own browser tab (avoids Instruqt proxy CORS issues)

## Workshop Track (workshop-instruqt/)

| Challenge | What students do | Ports |
|---|---|---|
| C1 APM | `npm install newrelic`, configure `newrelic.js`, `require('newrelic')` in `server.js` | 8080 |
| C2 Infra + Logs | Guided install (say No to Postgres prompt), `logging.d` YAML, `flog` | 8080 |
| C3 Browser RUM | Add NREUM snippet to `index.html`, Vite hot-reloads | 3000 + 8080 |
| C4 Bug Hunt | Load gen + find 3 pre-injected bugs via APM/Browser | 3000 + 8080 |
| C5 Synthetics | Simple Browser monitor | 3000 + 8080 |

## Setup Script Pattern

- `track_scripts/setup-pern-o11y` → system: postgres, Node 24, flog
- `01-apm/setup-pern-o11y` → clone repo, `npm run initialize` (db:create+migrate+seed), frontend build
- `02–05/setup-pern-o11y` → `exit 0`

## 3 Injected Bugs (C4)

1. `tutorial.controller.js` `findAll()` — 20% of requests delayed 1.5–3s → APM Transactions
2. `tutorial.controller.js` `deleteAll()` — `err` undefined → APM Errors (500)
3. `Analytics.jsx` `processData()` — `filteredTutorials[0]` undefined on empty filter → Browser JS Errors

## Key Instruqt Patterns Learned

- **Auto-start terminals:** `cmd: bash -c "npm start"` (not `cmd: npm start` — shell is lost)
- **Plain terminals:** `cmd: /bin/bash`
- **No `type:service` tabs** — Instruqt proxy causes CORS failures
- **DB init:** always `npm run initialize`, never `db:migrate` alone

## Removed from App

- `weather.controller.js` + routes (external dependency, not in lab)
- `Published.jsx`, `TutorialView.jsx` (not used in any lab step)
- `app.get("/")` root JSON route (was blocking React app from loading)

## Pending

- Instruqt track import + end-to-end test
- Research: Postgres as container host in `config.yml`
  (docs: https://docs.instruqt.com/sandboxes/hosts/add-hosts#add-containers-to-sandboxes)
