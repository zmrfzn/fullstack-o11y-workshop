# 🔭 Full Stack Observability Workshop

**PERN Stack + New Relic — GitHub Codespaces Edition**

A hands-on workshop for learning New Relic observability with a real full-stack application built on PostgreSQL, Express, React, and Node.js.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/zmrfzn/fullstack-o11y-workshop?quickstart=1)

## 🚀 Quick Start (GitHub Codespaces)

The easiest way to complete this workshop is using GitHub Codespaces. The entire environment (Node.js, PostgreSQL, dependencies) is pre-configured.

1. Click the **Open in GitHub Codespaces** button above
2. Wait for the environment to build (~2–3 minutes)
3. When you see `✅ Workshop environment is ready!` in the terminal, your workspace is prepared.

### 🛑 Stop! Verify the App is Running Locally

Before diving into the New Relic instrumentation in `WORKSHOP.md`, make sure the application actually works! 

1. **Start the applications:**
   Open two terminals and run the default startup scripts:
   - **Terminal 1 (Backend):** `npm run start:backend`
   - **Terminal 2 (Frontend):** `npm run start:frontend`

2. **Verify it works:**
   - Go to the **Ports** tab in VS Code.
   - Click the globe icon next to Port **80** to open the Frontend React app in your browser.
   - You should see the fully styled "Tutorials" list loaded with sample data.

If everything looks good, stop the servers (`Ctrl+C`) and move on to the workshop guide: **[WORKSHOP.md](WORKSHOP.md)**!

## 📋 Workshop Challenges

| # | Challenge | Duration | What you'll learn |
|---|-----------|----------|-------------------|
| 1 | **APM** | ~15 min | Instrument a Node.js/Express API with Application Performance Monitoring |
| 2 | **Infrastructure** | ~10 min | Install the New Relic Infrastructure agent to monitor the host |
| 3 | **Log Forwarding** | ~10 min | Configure custom log forwarding via the Infrastructure agent |
| 4 | **Browser** | ~15 min | Instrument a React SPA with Real User Monitoring |
| 5 | **Synthetics** | ~15 min | Set up proactive uptime and functional monitoring |

## 🏗️ Application Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│  Express API    │────▶│   PostgreSQL    │
│   (Port 80)     │     │  (Port 8080)    │     │   (Port 5432)   │
│                 │     │                 │     │                 │
│  Browser Agent  │     │   APM Agent     │     │  Auto-managed   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                        Infrastructure
                           Agent
                        (Host metrics
                         + Log fwd)
```

## 📁 Project Structure

```
├── .devcontainer/          # Codespaces configuration
│   ├── devcontainer.json   # Container settings, port forwarding
│   ├── docker-compose.yml  # App + Postgres services
│   ├── Dockerfile          # Node 20 + tools
│   └── setup.sh            # Auto-setup script
├── packages/
│   ├── backend/            # Express API + Sequelize ORM
│   │   ├── app/            # Controllers, routes, models
│   │   ├── database/       # Sequelize config, migrations, seeds
│   │   ├── newrelic.js     # New Relic APM configuration
│   │   └── server.js       # Express server entry point
│   └── frontend/           # React + Vite SPA
│       ├── src/            # Components, services, layouts
│       └── index.html      # Browser agent snippet goes here
├── assets/                 # Workshop screenshot references
├── WORKSHOP.md             # 📖 The workshop guide
└── package.json            # Monorepo root (npm workspaces)
```

## 🎯 Prerequisites

- A free [New Relic account](https://newrelic.com/signup)
- A GitHub account with Codespaces access

## 🛠️ Running Natively (Without Codespaces)

If you prefer to run this entirely on your local machine (Mac/Windows/Linux) instead of Codespaces, you will need to manually map your ports and install dependencies.

1. **Prerequisites:** Install [Node.js 20+](https://nodejs.org/) and [Docker Desktop](https://www.docker.com/).
2. **Clone and Install:**
   ```bash
   git clone https://github.com/zmrfzn/fullstack-o11y-workshop.git
   cd fullstack-o11y-workshop
   npm install && npm run install:backend && npm run install:frontend
   ```
3. **Expose the Database:**
   Edit `.devcontainer/docker-compose.yml` to expose port 5432 so your host machine can reach PostgreSQL:
   ```yaml
     db:
       image: postgres:15
       ports:
         - "5432:5432"
   ```
4. **Start the Database:**
   ```bash
   cd .devcontainer
   docker-compose up -d db
   cd ..
   ```
5. **Initialize Database:**
   ```bash
   cd packages/backend
   cp .env.example .env
   # Ensure DB_HOST=localhost in your new .env file
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   cd ../..
   ```
6. **Start the Services:**
   ```bash
   npm run start:backend 
   # In a new terminal:
   npm run start:frontend
   ```

## 📄 License

ISC

---

*Created by the Developer Relations team at New Relic • GitHub Codespaces Edition — March 2026*