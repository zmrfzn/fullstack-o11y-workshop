---
slug: synthetics
id: dnyedayq3moy
type: challenge
title: Challenge 5 (Bonus) — Proactive Monitoring with Synthetics
teaser: Set up a monitor that checks your app from around the world, around the clock.
notes:
- type: text
  contents: |-
    ## Synthetic Monitoring

    Everything you've set up so far is **reactive** — you see problems after real users hit them.

    Synthetics is **proactive** — it simulates users hitting your app on a schedule, from multiple global locations, even when no real users are online.

    Use synthetics to catch downtime before your users do.
tabs:
- id: ik7ppczp33yh
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: bash -c "npm start"
- id: solhyi1xuula
  title: Frontend Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/frontend
  cmd: bash -c "npm start"
- id: zuwsjrhlevag
  title: Terminal
  type: terminal
  hostname: pern-o11y
  cmd: /bin/bash
difficulty: basic
timelimit: 600
enhanced_loading: null
---

> Both the backend and frontend are starting automatically.
> - [button label="Node Terminal"](tab-0): wait for `Server is running on port 8080`
> - [button label="Frontend Terminal"](tab-1): wait for `ready in Xms`

---

## Get your app URL

Run in [button label="Terminal"](tab-2):

```run
echo http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:3000
```

Copy the output and open it in a new browser tab to confirm the app is running. You'll need this URL for the monitor below.

---

## Simple Browser Monitor

A Simple Browser monitor runs a full page load of your URL and reports timing, availability, and resource breakdowns.

1. Go to **New Relic → Synthetics → Create a monitor**
2. Choose **Page load performance**
3. Set a **Name** (e.g. `pern-app-uptime`)
4. Paste your URL into the **URL** field
5. Select **one location**
6. Click **Save monitor**

Wait a few minutes — you'll see pass/fail results and load time data on the monitor's Summary page.

![Simple Browser Check](../assets/SimpleBrowser_synthetics.jpg)

> **Checkpoint ✅** At least one monitor check has completed with a result.

---

## What We Built — Full Stack Observability Summary

You've instrumented every layer of this PERN stack application:

| Layer | Tool | What you can see |
|---|---|---|
| **Backend** | APM | Transactions, traces, errors, DB queries |
| **Host** | Infrastructure | CPU, memory, disk, processes |
| **Logs** | Infra log forwarder | Centralised logs linked to APM traces |
| **Frontend** | Browser RUM | Page loads, JS errors, AJAX calls, sessions |
| **Proactive** | Synthetics | Uptime checks from global locations |

And you used that full-stack telemetry to **find real bugs** — slow queries, broken endpoints, and frontend crashes — that would have been invisible without observability.

That's the difference between knowing your app is running and knowing *how* it's running.
