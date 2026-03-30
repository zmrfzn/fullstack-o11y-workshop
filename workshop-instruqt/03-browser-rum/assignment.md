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
tabs:
- id: gteftsmnwvou
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: bash -c "npm start"
- id: a11a0zdxp3ky
  title: Frontend Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/frontend
  cmd: bash -c "npm start"
- id: yfpmdw1dxn9a
  title: React Editor
  type: code
  hostname: pern-o11y
  path: /root/pern-newrelic/packages/frontend
difficulty: basic
timelimit: 720
enhanced_loading: null
---

> Both the backend and frontend are starting automatically.
> - [button label="Node Terminal"](tab-0): wait for `Server is running on port 8080`
> - [button label="Frontend Terminal"](tab-1): wait for `ready in Xms`

---

## Step 1 — Open the app

Get your app URL and open it in a **new browser tab**:

```run
echo http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:3000
```

You should see the tutorials app running.

---

## Step 2 — Get the Browser agent snippet

In New Relic:

1. Go to **Add data → Browser & Mobile → React**
2. Under **Deployment method**, choose **Copy/Paste JavaScript code**
3. Scroll to the bottom and select **No (Name your standalone app)**
4. Give it a name (e.g. `pern-tutorials-frontend`) and click **Enable**
5. Copy the generated JavaScript snippet

---

## Step 3 — Add the snippet to index.html

Open [button label="React Editor"](tab-2) and navigate to `index.html`.

Paste the snippet inside the `<head>` section, as the **first child** before any other tags:

```html
<head>
  <!-- PASTE NEW RELIC BROWSER SNIPPET HERE -->
  <meta charset="UTF-8" />
  ...
</head>
```

Save the file. Vite will automatically reload — **refresh your browser tab** to pick up the change.

---

## Step 4 — Generate traffic

In your browser tab, interact with the app:
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
