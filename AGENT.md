# 🤖 Agent Handoff Context: PERN Observability Workshop

This document provides essential context for any AI agent or assistant continuing work on this project. It summarizes the project's foundation, its evolution for cloud-native learning, and its current state.

## 🛠️ Project Foundation & Evolution
- **Base Application**: Originally a standard PERN (PostgreSQL, Express, React, Node.js) tutorial app.
- **Codespaces Rewrite**: The project has been heavily modified to be **"Codespaces-First"**. This involved:
    - **Monorepo Structure**: Transitioned to NPM Workspaces (root `package.json` orchestrates `packages/backend` and `packages/frontend`).
    - **Environment Automation**: Created `.devcontainer/setup.sh` to automate the entire bootstrap process (dependency installation, DB creation, roles provisioning, migrations, and seeding).
    - **Networking Overhaul**: Configured `docker-compose` to run PostgreSQL while allowing Node processes to run either in-container or on the host (Codespace) with exposed ports 80, 8080, and 5432.
    - **Port Management**: Fixed port conflicts (e.g., moved frontend to avoid sudo-only port 80 issues where necessary, though currently settled on 80/3000 mapping).

## 🎯 Primary Objective
The project serves as a **New Relic Observability Workshop**. The goal is for students to start with a "basic" app and instrument it across the full stack (APM, Infrastructure, Logs, Browser, Synthetics).

## 🏗️ Technical Architecture
- **Frontend**: React SPA (Vite, PrimeReact).
- **Backend**: Node.js / Express API.
- **Database**: PostgreSQL (Sequelize ORM).
- **Observability**: Fully instrumented with New Relic (currently in the "Post-UI-Overhaul" state).

## ✅ Recent Major Work (March 2026)

### 📈 Infrastructure Agent (Option A)
- **Status**: **Fully Implemented** on branch `workshop-polish`.
- **Implementation**: Enabled `systemd` in the container via the official Dev Container feature (`ghcr.io/devcontainers/features/systemd:1`).
- **Dockerfile**: Updated to install `newrelic-infra` on **Debian** with dynamic architecture detection (`arm64`/`amd64`).
- **Configuration**: Created `newrelic-infra.yml` in the root (copied to `/etc/` in the container).
- **Mandatory Flags**: Set `"overrideCommand": false` and `"privileged": true` in `devcontainer.json` to allow `systemd` to run as PID 1.
- **Troubleshooting**: Encountered registry issues with `ghcr.io` locally; prioritized functionality for GitHub Codespaces.

### 🎨 UI/UX Overhaul
- **Dark Theme**: Implemented a New Relic-inspired dark theme using CSS variables (`theme.css`) and custom animations (`animations.css`).
- **Main Layout**: Rewrote `MainLayout.jsx` with a collapsible sidebar and premium header.
- **Component Redesigns**: Card/table toggle with glossy card effects and status pulses in `TutorialsList.jsx`; dark theme KPI cards and charts in `Dashboard.jsx`.
- **Typography**: Inter (UI) and JetBrains Mono (Technical).

### 🐛 Injected Workshop Bugs (For Students)
1. **Intermittent Latency**: Delay in `GET /api/tutorials`.
2. **Broken Delete-All**: 500 error in backend (undefined variable).
3. **External Timeout**: Aggressive timeout in `weather.controller.js`.
4. **Analytics Crash**: TypeError on empty category results.
5. **Silent Frontend Failure**: Missing `.catch()` in frontend `removeAll()`.

## 🚀 Environment & Handoff
- **Default Port (Frontend)**: `80` (mapped to `3000` internally in `.env.local`).
- **Default Port (Backend)**: `8080`.
- **Database**: `DevRel` database with `postgres/root` credentials.
- **Remote Repos**: `zmrfzn/fullstack-o11y-workshop`
- **Branch**: `workshop-polish` (Active dev) / `codespaces-workshop` (Base)

## 📋 Next Steps for Incoming Agents
- **Testing**: Rebuild the Dev Container in GitHub Codespaces to verify the Infrastructure Agent service (`systemctl status newrelic-infra`).
- **License Calibration**: Ensure `newrelic-infra.yml` or `NR_LICENSE_KEY` environment variables are properly handled.
- **O11y Calibration**: Verify that New Relic dashboards still render correctly with the new CSS classes.

---
*Updated by Gemini CLI • March 9, 2026*
