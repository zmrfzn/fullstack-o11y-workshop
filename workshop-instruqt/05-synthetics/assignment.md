---
slug: synthetics
id: synthetics
type: challenge
title: "Challenge 5 (Bonus) — Proactive Monitoring with Synthetics"
teaser: Set up a monitor that checks your app from around the world, around the clock.
notes:
- type: text
  contents: |-
    ## Synthetic Monitoring

    Everything you've set up so far is **reactive** — you see problems after real users hit them.

    Synthetics is **proactive** — it simulates users hitting your app on a schedule, from multiple global locations, even when no real users are online.

    There are two types covered here:
    - **Simple Browser** — loads a page and checks it responds correctly
    - **Scripted Browser** — runs a full Selenium user flow (click, type, assert)

    Use synthetics to catch downtime before your users do.
tabs:
- id: node-terminal
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: npm run start:nr
- id: url-terminal
  title: Terminal
  type: terminal
  hostname: pern-o11y
- id: frontend-app
  title: Live App
  type: website
  url: http://pern-o11y.${_SANDBOX_ID}.instruqt.io:8080
difficulty: basic
timelimit: 600
---

> Both servers are starting automatically. Wait for the [button label="Live App"](tab-3) to load before setting up monitors.

---

## Get your app URL

You'll need this URL for both monitors. Run in [button label="Terminal"](tab-2):

```run
echo http://$HOSTNAME.$_SANDBOX_ID.instruqt.io
```

Copy the output. You'll use it in the steps below.

---

## Part A — Simple Browser Monitor

A Simple Browser monitor runs a full page load of your URL and reports timing, availability, and resource breakdowns.

1. Go to **New Relic → Synthetics → Create a monitor**
2. Choose **Page load performance**
3. Set a **Name** (e.g. `pern-app-uptime`)
4. Paste your URL into the **URL** field
5. Select **one location**
6. Click **Save monitor**

Wait a few minutes — you'll see pass/fail results and load time data on the monitor's Summary page.

---

## Part B — Scripted Browser Monitor

A Scripted Browser monitor runs a real Selenium user flow — it opens a browser, clicks through your app, and validates that key elements exist.

1. Go to **New Relic → Synthetics → Create a monitor**
2. Choose **User flow / functionality**
3. Set a **Name** (e.g. `pern-app-edit-tutorial`)
4. Select **one location**
5. In the **Write Script** section, paste the script below
6. **Important:** Replace `<PASTE YOUR URL HERE>` with the URL from above
7. Click **Validate** — confirm it passes before saving
8. Click **Save monitor**

```javascript
const assert = require("assert");
const URL = "<PASTE YOUR URL HERE>";
const By = $driver.By;
var DefaultTimeout = 30000;

$browser.getCapabilities().then(function () { })
  .then(function () {
    return $browser.get(URL);
  })
  .then(function () {
    return $browser.manage().window().setSize(1280, 800);
  })
  .then(function () {
    // Wait for the tutorial table to load
    return $browser.waitForAndFindElement(
      By.css("table"),
      DefaultTimeout
    );
  })
  .then(function () {
    // Click the Edit button on the first tutorial row
    return $browser.waitForAndFindElement(
      By.css("tr:nth-child(1) .p-button-info"),
      DefaultTimeout
    ).then(function (el) {
      return el.click();
    });
  })
  .then(function () {
    // Confirm we landed on the edit/detail view
    return $browser.waitForAndFindElement(
      By.css(".p-button-outlined"),
      DefaultTimeout
    );
  })
  .then(function () {
    console.log("Test passed: app loaded and tutorial edit view is accessible");
  });
```

---

## What to expect

After a few minutes, each monitor shows:
- **Success/failure** per location
- **Response time** trend
- **Page load timeline** (Simple Browser)
- **Step-by-step pass/fail** (Scripted Browser)

If the app goes down or a key UI element disappears, New Relic will alert you before any real user notices.

> **Checkpoint ✅** Both monitors show at least one completed check with a result.
