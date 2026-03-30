---
slug: apm
id: apm
type: challenge
title: "Challenge 1 — Instrument the Backend with APM"
teaser: One line of code gives you full visibility into your Node.js/Express API.
notes:
- type: text
  contents: |-
    ## Application Performance Monitoring

    New Relic APM automatically instruments your application — no code changes required beyond a single `require()`.

    Once active, APM captures:
    - Every HTTP transaction (response times, throughput, errors)
    - Database queries and slow query analysis
    - External service calls
    - Full distributed traces end-to-end

    This challenge instruments the **Express backend** that powers the tutorials API.
tabs:
- id: terminal-1
  title: Terminal 1
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
- id: terminal-2
  title: Terminal 2
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
- id: editor
  title: Editor
  type: code
  hostname: pern-o11y
  path: /root/pern-newrelic/packages/backend
- id: backend-service
  title: Backend API
  type: service
  hostname: pern-o11y
  path: /api/tutorials
  port: 8080
difficulty: basic
timelimit: 720
---

While you were on the loading screen, the environment was automatically set up:
- Node.js 20 and PostgreSQL installed
- App cloned to `/root/pern-newrelic/`
- Dependencies installed, database migrated and seeded

---

## Step 1 — Verify the environment

In [button label="Terminal 1"](tab-0), confirm Node is ready:

```run
node -v
```

You should see **v20.x.x**.

---

## Step 2 — Start and test the backend

Start the Express server:

```run
npm start
```

In [button label="Terminal 2"](tab-1), test the API:

```run
curl http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080/api/tutorials
```

You should get a JSON array of tutorials. Check the [button label="Backend API"](tab-3) tab too.

Once verified, stop the server in [button label="Terminal 1"](tab-0) with `ctrl+c`.

---

## Step 3 — Configure the New Relic APM agent

The `newrelic` npm package is already installed. You just need to configure it.

Open [button label="Editor"](tab-2), then open `newrelic.js` and update these two values:

```js
app_name: ['your-app-name'],   // e.g. 'pern-tutorials-api'
license_key: 'YOUR_LICENSE_KEY',
```

> **Where to find your License Key:** New Relic UI → top-right profile menu → **API Keys** → look for the key with type **INGEST - LICENSE**.

Save the file.

---

## Step 4 — Enable APM in server.js

Open `server.js` in [button label="Editor"](tab-2) and add this as the **very first line**:

```js
const newrelic = require('newrelic');
```

> This must be line 1, before any other `require()` calls, so the agent can hook into the Node.js runtime at startup.

Save the file.

---

## Step 5 — Start the server with APM and generate traffic

In [button label="Terminal 1"](tab-0), start the server with the New Relic agent:

```run
npm run start:nr
```

In [button label="Terminal 2"](tab-1), run the load generator to produce traffic:

```run
npm run load
```

> Press `ctrl+c` in Terminal 2 to stop the load generator whenever you're ready to move on. Keep Terminal 1 running.

---

## Step 6 — Verify APM data in New Relic

Go to **[New Relic](https://one.newrelic.com) → APM & Services**.

You should see your app entity appear within a few minutes. Click into it to explore:
- **Summary** — response time, throughput, error rate
- **Transactions** — every API endpoint, slowest calls
- **Distributed Tracing** — full request traces end-to-end

> It may take **2–3 minutes** for data to appear after the agent first connects.

> **Checkpoint ✅** Confirm you can see your app under APM & Services before moving to the next challenge.
