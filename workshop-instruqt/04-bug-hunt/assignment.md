---
slug: bug-hunt
id: hrvfxcy5cnm9
type: challenge
title: 'Challenge 4 — Bug Hunt: Find Three Real Issues'
teaser: Use APM, Browser, and Logs together to diagnose three bugs hidden in the app.
notes:
- type: text
  contents: |-
    ## Bug Hunt

    This app has **three deliberate bugs** injected into it. They are real-world bug patterns that would be painful to find by reading code alone.

    Your job is to use the telemetry you've set up — APM, Browser, and Logs — to locate each one.

    No fixes required. Finding and explaining the root cause is the goal.

    This is the skill that observability gives you.
tabs:
- id: aqscygmy8cvg
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  shell: /bin/bash
  cmd: npm start
- id: yki74poaj6et
  title: Load Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  shell: /bin/bash
- id: anlb5zxie5c6
  title: Live App
  type: service
  hostname: pern-o11y
  path: /
  port: 8080
difficulty: basic
timelimit: 900
enhanced_loading: null
---

> The backend is starting automatically in [button label="Node Terminal"](tab-0). Wait for `Server is running on port 8080` and the app loads in [button label="Live App"](tab-2) before starting the hunt.

To open the app in your own browser tab, run in [button label="Load Terminal"](tab-1):

```run
echo http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080
```

---

## Generate traffic first

In [button label="Load Terminal"](tab-1), run the load generator to produce enough data for all three bugs to surface:

```run
npm run load
```

Let it run for **1–2 minutes**, then stop with `ctrl+c`. Also click around the [button label="Live App"](tab-2) — visit Analytics, try the Remove All button.

---

## Bug 1 — Something is making the API slow 🐌

**Signal:** APM → Transactions

**Where to look:**
1. New Relic → **APM & Services** → your app → **Transactions**
2. Find `GET /api/tutorials` — look at its response time distribution

**What you're looking for:** ~20% of requests taking **1.5–3 seconds** instead of the usual sub-100ms. The P95/P99 response time shows a clear spike.

**Dig deeper:** Click into the transaction → **Trace listings** → open a slow trace and look at the timeline.

<details>
<summary>💡 Hint</summary>

Look at `packages/backend/app/controllers/tutorial.controller.js` — the `findAll` function.

</details>

---

## Bug 2 — The Delete All button is broken 💥

**Signal:** APM → Errors

**How to trigger:** In the [button label="Live App"](tab-2), click the **Remove All** button in the tutorial list.

**Where to look:**
1. New Relic → **APM & Services** → your app → **Errors**
2. Find the `500` error on `DELETE /api/tutorials`

**What you're looking for:** A `ReferenceError` every time Delete All is called. Look at the error message and stack trace — it points to the exact file and line.

<details>
<summary>💡 Hint</summary>

Look at the `deleteAll` function in `tutorial.controller.js`. A variable is referenced that was never declared in the active code path.

</details>

---

## Bug 3 — The Analytics page crashes for some users 📊

**Signal:** Browser → JS Errors

**How to trigger:** Go to the **Analytics** page → use the **category filter** dropdown → select a category that has zero tutorials.

**Where to look:**
1. New Relic → **Browser** → your app → **JS Errors**
2. Find the `TypeError` — look at the error message and file/line reference

**What you're looking for:** `TypeError: Cannot read properties of undefined` when the filter returns zero results.

<details>
<summary>💡 Hint</summary>

Look at `processData()` in `packages/frontend/src/components/Analytics.jsx`. It accesses `filteredTutorials[0].category` without first checking that the array is non-empty.

</details>

---

> **Checkpoint ✅** Move on when you've identified the root cause of at least two bugs.
