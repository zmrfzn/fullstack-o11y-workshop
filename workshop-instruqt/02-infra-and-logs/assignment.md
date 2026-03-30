---
slug: infra-and-logs
id: infra-and-logs
type: challenge
title: "Challenge 2 — Infrastructure Monitoring + Log Forwarding"
teaser: Install the Infrastructure agent and forward logs — one install covers both.
notes:
- type: text
  contents: |-
    ## Infrastructure + Logs

    The New Relic Infrastructure agent runs on the host and collects:
    - CPU, memory, disk, network metrics
    - Running processes and their resource usage
    - System events and configuration changes

    The same agent also acts as a **log forwarder** — point it at any log file and it ships those logs to New Relic, automatically correlating them with your APM traces via **Logs-in-Context**.

    In this challenge you will install the agent using New Relic's guided install (one command, auto-detects everything), then add log forwarding with a single config file.
tabs:
- id: terminal
  title: Terminal
  type: terminal
  hostname: pern-o11y
- id: node-terminal
  title: Node
  type: terminal
  hostname: pern-o11y
  workdir: /root/pern-newrelic/packages/backend
  cmd: npm run start:nr
- id: config-editor
  title: Config Editor
  type: code
  hostname: pern-o11y
  path: /etc/newrelic-infra
difficulty: basic
timelimit: 720
---

> The backend is starting automatically in the [button label="Node"](tab-1) tab. Wait until you see `Server is running on port 8080` before proceeding.

---

## Part A — Install the Infrastructure Agent

### Step 1 — Run the guided install

New Relic's guided install detects your OS, adds the correct repository, installs the agent, and starts it as a systemd service — all in one command.

Go to **[New Relic](https://one.newrelic.com) → Add data → (search) Infrastructure → Linux**.

Copy the command shown for your region. It will look like:

```
curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && \
  sudo NEW_RELIC_API_KEY=<YOUR_USER_KEY> \
  NEW_RELIC_ACCOUNT_ID=<YOUR_ACCOUNT_ID> \
  NEW_RELIC_REGION=US \
  /usr/local/bin/newrelic install -n infrastructure-agent-installer
```

> **Keys you need:**
> - `NEW_RELIC_API_KEY` — your **User Key** (starts with `NRAK-`). Find it under: profile → API Keys → type = **USER**.
> - `NEW_RELIC_ACCOUNT_ID` — the number shown at the top of your API Keys page.
> - `NEW_RELIC_REGION` — `US` or `EU` depending on your account region.

Paste and run the command in [button label="Terminal"](tab-0).

---

### Step 2 — Verify the agent is running

```run
systemctl status newrelic-infra --no-pager
```

You should see `active (running)`. The agent is now collecting host metrics and sending them to New Relic.

---

### Step 3 — Verify host data in New Relic

Go to **New Relic → Infrastructure → Hosts**.

Your host (`pern-o11y`) should appear within a few minutes showing CPU, memory, and disk metrics.

> **Checkpoint A ✅** Confirm the host appears under Infrastructure → Hosts before continuing.

---

## Part B — Add Log Forwarding

The Infrastructure agent can forward any log file to New Relic. You just need to drop a YAML config file into `/etc/newrelic-infra/logging.d/`.

### Step 1 — Create the logging config

Run in [button label="Terminal"](tab-0):

```run
sudo tee /etc/newrelic-infra/logging.d/app-logs.yml > /dev/null <<EOF
logs:
  - name: pern-app-logs
    file: /tmp/dummy.log
EOF
```

### Step 2 — Restart the agent to pick up the new config

```run
sudo systemctl restart newrelic-infra
```

### Step 3 — Generate log data

Run `flog` to generate sample log lines into `/tmp/dummy.log`:

```run
flog -t log -n 2000 -d 0.5 -o /tmp/dummy.log -w
```

Press `ctrl+c` when you have enough lines (a few seconds is fine).

### Step 4 — Verify logs in New Relic

Go to **New Relic → Logs**. You should see log entries tagged with `pern-app-logs`.

> It may take **2–3 minutes** for the first batch to appear.

---

## Bonus — Logs-in-Context

Your APM agent (from Challenge 1) automatically links application logs to distributed traces.

In New Relic → **APM & Services** → your app → **Distributed Tracing**:
1. Click any trace
2. Select the **Logs** tab inside the trace view

You'll see the log lines that were emitted during that exact request — no manual correlation needed.

> **Checkpoint B ✅** Confirm you can see logs in New Relic Logs before moving to the next challenge.
