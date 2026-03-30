# Workshop Instruqt Track — Progress Report

## Branch
`instruqt-workshop` on `zmrfzn/fullstack-o11y-workshop`

## Status: Track validated and pushed. Research pending.

---

## What's done

### Track files (`workshop-instruqt/`)
| File | Status |
|---|---|
| `track.yml` | ✅ Validated by `instruqt track validate` |
| `config.yml` | ✅ Ubuntu 24.04, e2-standard-2, ports 80/8080/5432 |
| `track_scripts/setup-pern-o11y` | ✅ Node 24, Postgres, clone, install, migrate, seed, flog, frontend build |
| `01-apm/assignment.md` | ✅ |
| `02-infra-and-logs/assignment.md` | ✅ Guided install + log forwarding + Logs-in-Context |
| `03-browser-rum/assignment.md` | ✅ type:service tab, rebuild step |
| `04-bug-hunt/assignment.md` | ✅ 3 bugs, collapsible hints |
| `05-synthetics/assignment.md` | ✅ Simple + scripted browser |

### App changes (same branch)
| Change | Status |
|---|---|
| React served as static from Express (port 8080) | ✅ |
| `VITE_APP_API_URL=/api` (relative, same-origin) | ✅ |
| Vite dev proxy `/api → localhost:8080` | ✅ |
| `npm run build` / `build:frontend` scripts | ✅ |
| Weather route/controller removed | ✅ |
| Published, TutorialView removed | ✅ |
| Dashboard + Analytics restored | ✅ |
| CORS: Instruqt `*.instruqt.io` pattern added | ✅ |

---

## Pending / Next Steps

### 1. Research: Postgres as a container host in Instruqt
**Goal:** Add `postgres:15` as a separate container host in `config.yml` instead of installing Postgres via apt in the setup script.

**Docs to read:**
- https://docs.instruqt.com/sandboxes/hosts/add-hosts#add-containers-to-sandboxes
- https://docs.instruqt.com/reference/configs/host-config

**Questions to answer:**
- config.yml syntax for container host (image, env vars, ports)
- How VM reaches the container by hostname (networking)
- Whether env vars like `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` work directly
- Health check / readiness support
- Whether setup script still needs to run `psql` commands against the container

**Expected outcome:** Cleaner setup — remove Postgres apt install from setup script, replace with a container definition in config.yml. Update `packages/backend/.env.example` DB_HOST to point to the container hostname.

### 2. Test in Instruqt sandbox
- Verify full setup script runs without errors
- Verify `newrelic install -n infrastructure-agent-installer` works on Ubuntu 24.04
- Verify frontend build completes and app loads on port 8080
- Verify all 3 bugs are reproducible

### 3. Minor: update challenge 1 note — says "Node.js 20" but setup script now installs Node 24

---

## Bug Map (Challenge 4)
| # | Bug | Signal | File |
|---|---|---|---|
| 1 | 20% of `GET /api/tutorials` delayed 1.5–3s | APM → Transactions → P95 | `packages/backend/app/controllers/tutorial.controller.js` `findAll()` |
| 2 | `DELETE /api/tutorials` → 500 always | APM → Errors | `tutorial.controller.js` `deleteAll()` — `err` undefined |
| 3 | Analytics crash on empty category filter | Browser → JS Errors | `packages/frontend/src/components/Analytics.jsx` `processData()` |

---

## App Structure (post-simplification)
```
4 nav pages:   Tutorials / Add Tutorial / Dashboard / Analytics
1 port:        8080 (Express serves API + React static build)
Backend:       tutorial CRUD only (weather removed)
Frontend:      built via `npm run build:frontend`, served from ../frontend/dist
```
