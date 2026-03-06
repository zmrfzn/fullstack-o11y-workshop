# 🔭 Full Stack Observability Workshop

**PERN Stack + New Relic — GitHub Codespaces Edition**

A hands-on workshop for learning New Relic observability with a real full-stack application built on PostgreSQL, Express, React, and Node.js.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/zmrfzn/fullstack-o11y-workshop?quickstart=1)

## 🚀 Quick Start

1. Click the **Open in GitHub Codespaces** button above
2. Wait for the environment to build (~2–3 minutes)
3. When you see `✅ Workshop environment is ready!` — you're good to go!
4. Follow the workshop guide: **[WORKSHOP.md](WORKSHOP.md)**

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

## 🛠️ Running Locally (Without Codespaces)

If you prefer to run locally:

1. Install [Node.js 20+](https://nodejs.org/) and [PostgreSQL 14+](https://www.postgresql.org/)
2. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/zmrfzn/fullstack-o11y-workshop.git
   cd fullstack-o11y-workshop
   npm install && npm run install:backend && npm run install:frontend
   ```
3. Configure PostgreSQL:
   - Create a database named `DevRel`
   - Update `packages/backend/.env` with your DB credentials
4. Initialize and start:
   ```bash
   npm run initialize:db
   npm start
   ```

## 📄 License

ISC

---

*Created by the Developer Relations team at New Relic • GitHub Codespaces Edition — March 2026*