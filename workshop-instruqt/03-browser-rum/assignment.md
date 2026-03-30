---
slug: browser-rum
id: oodqta8recwv
type: challenge
title: Challenge 3 — Frontend Monitoring with Browser RUM
teaser: Paste one JavaScript snippet and see exactly what your users experience.
notes:
- type: text
  contents: |-
    ## Browser Real User Monitoring

    The APM agent gives you the backend view. Browser monitoring gives you the **user's view**:
    - Page load times and web vitals
    - JavaScript errors (even ones you never knew existed)
    - AJAX call timings and failures
    - Session traces — a timeline of everything that happened in a user's browser

    You add the New Relic Browser agent by pasting a JavaScript snippet into your app's `<head>`. That's it.

    The React frontend is pre-built and served directly from the Node.js server on port 8080 — no separate process needed.
tabs:
- id: gteftsmnwvou
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: /bin/bash
- id: yfpmdw1dxn9a
  title: React Editor
  type: code
  hostname: pern-o11y
  path: /root/pern-newrelic/packages/frontend
- id: ri3vxavghkry
  title: Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic
  cmd: /bin/bash
difficulty: basic
timelimit: 720
enhanced_loading: null
---

## Step 1 — Get your app URL

In [button label="Node Terminal"](tab-0), get the public URL for this sandbox:

```run
echo http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080
```

Copy the output and **open it in a new browser tab**. The app is not running yet — we'll start it in the next step.

---

## Step 2 — Start the backend

In [button label="Node Terminal"](tab-0):

```run
cd /root/pern-newrelic/packages/backend && npm start
```

Switch to your browser tab and refresh. You should see the tutorials app load.

---

## Step 3 — Get the Browser agent snippet

In New Relic:

1. Go to **Add data → Browser & Mobile → React**
2. Under **Deployment method**, choose **Copy/Paste JavaScript code**
3. Scroll to the bottom and select **No (Name your standalone app)**
4. Give it a name (e.g. `pern-tutorials-frontend`) and click **Enable**
5. Copy the generated JavaScript snippet

---

## Step 4 — Add the snippet to index.html

Open [button label="React Editor"](tab-1) and navigate to `index.html`.

Paste the snippet inside the `<head>` section, as the **first child** before any other tags:

```html
<head>
  <!-- PASTE NEW RELIC BROWSER SNIPPET HERE -->
  <meta charset="UTF-8" />
  ...
</head>
```

Save the file.

---

## Step 5 — Rebuild and restart

In [button label="Terminal"](tab-2):

```run
cd /root/pern-newrelic && npm run build:frontend
```

In [button label="Node Terminal"](tab-0), click the **reload icon (↺)** at the top-right of the terminal to restart the server.

> The reload icon restarts the terminal's shell. Do not use `ctrl+c`.

---

## Step 6 — Generate traffic

Refresh your browser tab (the URL from Step 1) and interact with the app:
- Browse the tutorial list
- Click into a tutorial
- Visit the **Analytics** page
- Try the **Remove All** button

---

## Step 7 — Verify Browser data in New Relic

Go to **New Relic → Browser** and select your app.

You should see:
- **Page views** and load times
- **Core web vitals** (LCP, FID, CLS)
- **JS errors** — check here, there may already be some lurking
- **AJAX** calls to the backend API

![Browser App Dashboard](../assets/instruqt-browser-image.png)

> It may take **2–3 minutes** for the first data to appear.

> **Checkpoint ✅** Confirm your frontend app is visible in New Relic Browser before moving on.
