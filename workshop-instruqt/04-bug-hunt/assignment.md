---
slug: bug-hunt
id: bug-hunt
type: challenge
title: "Challenge 4 — Bug Hunt: Find Three Real Issues"
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
- id: node-terminal
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: npm run start:nr
- id: frontend-terminal
  title: Frontend Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/frontend
  cmd: npm start
- id: load-terminal
  title: Load Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
- id: frontend-app
  title: Live App
  type: service
  hostname: pern-o11y
  path: /
  port: 8080
difficulty: basic
timelimit: 900
---

> Both servers are starting automatically. Wait for `Server is running on port 8080` in [button label="Node Terminal"](tab-0) and the app to load in [button label="Live App"](tab-3) before starting the hunt.

---

## Generate traffic first

In [button label="Load Terminal"](tab-2), run the load generator to produce enough data for all three bugs to surface:

```run
npm run load
```

Let it run for **1–2 minutes**, then stop with `ctrl+c`. Also click around the [button label="Live App"](tab-3) — visit Analytics, try the Remove All button.

---

## Bug 1 — Something is making the API slow 🐌

**Signal to use:** APM

**Where to look:**
1. New Relic → **APM & Services** → your app
2. Click **Transactions**
3. Sort by **% time** or look at the slowest transactions
4. Find `GET /api/tutorials` — look at its response time distribution

**What you're looking for:** A small percentage of requests (~20%) taking **1.5–3 seconds** instead of the usual sub-100ms. The P95/P99 response time will show a clear spike.

**Dig deeper:** Click into the transaction → **Trace listings** → open a slow trace. What does the timeline show before the database call?

<details>
<summary>💡 Hint (click to reveal)</summary>

Look at `packages/backend/app/controllers/tutorial.controller.js`, the `findAll` function. There is a block that runs on 20% of requests.

</details>

---

## Bug 2 — The Delete All button is broken 💥

**Signal to use:** APM → Errors

**How to trigger it:** In the [button label="Live App"](tab-3), click the **Remove All** button in the tutorial list.

**Where to look:**
1. New Relic → **APM & Services** → your app
2. Click **Errors** (or **Error Analytics**)
3. Find the `500` error on `DELETE /api/tutorials`

**What you're looking for:** A `ReferenceError` or `500` error every time Delete All is called. Look at the error message and the stack trace — it will point to the exact file and line.

**Dig deeper:** Go to **Distributed Tracing**, find a trace for `DELETE /api/tutorials`, and open it. The error span will show you the exact exception.

<details>
<summary>💡 Hint (click to reveal)</summary>

Look at the `deleteAll` function in `tutorial.controller.js`. A variable is referenced that was never declared in the active code path — it only exists inside a commented-out block.

</details>

---

## Bug 3 — The Analytics page crashes for some users 📊

**Signal to use:** Browser → JS Errors

**How to trigger it:** In the [button label="Live App"](tab-3):
1. Go to the **Analytics** page
2. Use the **category filter** dropdown and select a category that has zero tutorials

**Where to look:**
1. New Relic → **Browser** → your app
2. Click **JS Errors**
3. Find the `TypeError` — look at the error message and the file/line reference

**What you're looking for:** A `TypeError: Cannot read properties of undefined` when the category filter returns zero results. The stack trace will show the component and line.

**Dig deeper:** Click the error → **Error instances** → look at the session trace. You can see exactly what the user did before the crash.

<details>
<summary>💡 Hint (click to reveal)</summary>

Look at `processData()` in `packages/frontend/src/components/Analytics.jsx`. It accesses `filteredTutorials[0].category` without first checking that `filteredTutorials[0]` exists.

</details>

---

## Wrap up

Once you've found all three bugs, note:
- **Which signal led you to each bug** (APM / Browser / Logs)
- **How long it would have taken** to find these by reading code alone

That gap — between "I had no idea" and "I know exactly what line is broken" — is what observability gives you.

> **Checkpoint ✅** Move on when you've identified the root cause of at least two of the three bugs.
