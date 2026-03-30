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

    In this challenge you will wire up the React frontend and instrument it with the Browser agent.
tabs:
- id: frontend-terminal
  title: Frontend Terminal
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/frontend
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
- id: frontend-app
  title: Live App
  type: website
  url: http://pern-o11y.${_SANDBOX_ID}.instruqt.io
difficulty: basic
timelimit: 720
---

> The backend is starting automatically in [button label="Node Terminal"](tab-1). Wait for `Server is running on port 8080` before testing the app.

---

## Step 1 — Set the API URL for this environment

The frontend needs to know the backend URL for this sandbox. Run in [button label="Frontend Terminal"](tab-0):

```run
echo "VITE_APP_API_URL=http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080/api" > /root/pern-newrelic/packages/frontend/.env.local
```

Verify it looks correct:

```run
cat /root/pern-newrelic/packages/frontend/.env.local
```

---

## Step 2 — Start the frontend and verify the app

In [button label="Frontend Terminal"](tab-0):

```run
npm start
```

Open the [button label="Live App"](tab-3) tab. You should see the tutorials app running. Browse around — add a tutorial, filter by category, visit the Analytics page.

> If you see a blank screen or API errors, confirm the Node Terminal shows the backend running.

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

Open [button label="React Editor"](tab-2) and navigate to `index.html`.

Paste the snippet inside the `<head>` section, before any other `<script>` tags:

```html
<head>
  <!-- PASTE NEW RELIC BROWSER SNIPPET HERE -->
  <meta charset="UTF-8" />
  ...
</head>
```

Save the file.

---

## Step 5 — Restart the frontend and generate traffic

Stop the frontend in [button label="Frontend Terminal"](tab-0) with `ctrl+c`, then restart:

```run
npm start
```

Open the [button label="Live App"](tab-3) tab and interact with the app:
- Browse the tutorial list
- Click into a tutorial
- Visit the **Analytics** page
- Try the **Remove All** button

This generates the real user traffic that Browser monitoring will capture.

---

## Step 6 — Verify Browser data in New Relic

Go to **New Relic → Browser** and select your app.

You should see:
- **Page views** and load times
- **Core web vitals** (LCP, FID, CLS)
- **JS errors** (check the **Errors** section — there may already be some!)
- **AJAX** calls to the backend

> It may take **2–3 minutes** for data to appear.

> **Checkpoint ✅** Confirm you can see your frontend app in New Relic Browser before moving on.
