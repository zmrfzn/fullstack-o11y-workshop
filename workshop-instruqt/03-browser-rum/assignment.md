---
slug: browser-rum
id: browser-rum
type: challenge
title: "Challenge 3 — Frontend Monitoring with Browser RUM"
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

    The React frontend is already built and served directly from the same Node.js server on port 8080 — no separate process, no CORS, no configuration needed.
tabs:
- id: node-terminal
  title: Node Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: npm run start:nr
- id: react-editor
  title: React Editor
  type: code
  hostname: pern-o11y
  path: /root/pern-newrelic/packages/frontend
- id: terminal
  title: Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic
- id: frontend-app
  title: Live App
  type: service
  hostname: pern-o11y
  path: /
  port: 8080
difficulty: basic
timelimit: 720
---

> The backend is starting automatically in [button label="Node Terminal"](tab-0). Wait for `Server is running on port 8080` before opening the app.

---

## Step 1 — Verify the app is working

Open the [button label="Live App"](tab-3) tab. You should see the tutorials app. Browse around — the frontend and API are both served from port 8080.

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

## Step 4 — Rebuild the frontend

The React app is served as a pre-built bundle. After editing `index.html`, rebuild it so the changes take effect:

In [button label="Terminal"](tab-2):

```run
npm run build:frontend
```

Then restart the backend in [button label="Node Terminal"](tab-0) (`ctrl+c`, then):

```run
npm run start:nr
```

---

## Step 5 — Generate traffic

Open the [button label="Live App"](tab-3) tab and interact with the app:
- Browse the tutorial list
- Click into a tutorial
- Visit the **Analytics** page
- Try the **Remove All** button

---

## Step 6 — Verify Browser data in New Relic

Go to **New Relic → Browser** and select your app.

You should see:
- **Page views** and load times
- **Core web vitals** (LCP, FID, CLS)
- **JS errors** — check here, there may already be some lurking
- **AJAX** calls to the backend API

> It may take **2–3 minutes** for the first data to appear.

> **Checkpoint ✅** Confirm your frontend app is visible in New Relic Browser before moving on.
