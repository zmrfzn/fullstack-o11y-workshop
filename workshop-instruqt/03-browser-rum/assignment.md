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
  shell: /bin/bash
  cmd: npm start
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
  shell: /bin/bash
- id: ltrjajdvrmpm
  title: Live App
  type: service
  hostname: pern-o11y
  path: /
  port: 8080
difficulty: basic
timelimit: 720
enhanced_loading: null
---

> The backend is starting automatically in [button label="Node Terminal"](tab-0). Wait for `Server is running on port 8080`, then open the [button label="Live App"](tab-3) tab to confirm the app loads.

---

## Step 1 — Get the Browser agent snippet

In New Relic:

1. Go to **Add data → Browser & Mobile → React**
2. Under **Deployment method**, choose **Copy/Paste JavaScript code**
3. Scroll to the bottom and select **No (Name your standalone app)**
4. Give it a name (e.g. `pern-tutorials-frontend`) and click **Enable**
5. Copy the generated JavaScript snippet

---

## Step 2 — Add the snippet to index.html

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

## Step 3 — Rebuild and restart

The React app is served as a pre-built bundle. Rebuild it so the snippet is included, then restart the backend.

In [button label="Terminal"](tab-2):

```run
npm run build:frontend
```

In [button label="Node Terminal"](tab-0), click the **reload icon (↺)** at the top-right of the terminal to restart the server.

> Using the reload icon restarts the terminal's auto-start command. Do not use `ctrl+c` as it may not respond in all cases.

---

## Step 4 — Generate traffic

Open the [button label="Live App"](tab-3) tab and interact with the app:
- Browse the tutorial list
- Click into a tutorial
- Visit the **Analytics** page
- Try the **Remove All** button

---

## Step 5 — Verify Browser data in New Relic

Go to **New Relic → Browser** and select your app.

You should see:
- **Page views** and load times
- **Core web vitals** (LCP, FID, CLS)
- **JS errors** — check here, there may already be some lurking
- **AJAX** calls to the backend API

![Browser App Dashboard](../assets/instruqt-browser-image.png)

> It may take **2–3 minutes** for the first data to appear.

> **Checkpoint ✅** Confirm your frontend app is visible in New Relic Browser before moving on.
