#!/bin/bash
set -euo pipefail

echo "============================================"
echo " 🚀 Setting up PERN Workshop Environment"
echo "============================================"

# ---- 1. Provision environment files ----
echo "📋 Setting up environment files..."
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env.local

# ---- 2. Install dependencies ----
echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing backend dependencies..."
npm run install:backend

echo "📦 Installing frontend dependencies..."
npm run install:frontend

# ---- 3. Wait for PostgreSQL to be ready ----
echo "⏳ Waiting for PostgreSQL..."
until pg_isready -h localhost -p 5432 -U postgres > /dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL is ready!"

# ---- 4. Create a monitoring user for New Relic (pre-provision) ----
PGPASSWORD=root psql -h localhost -U postgres -d DevRel -c "
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'new_relic') THEN
      CREATE ROLE new_relic WITH LOGIN PASSWORD 'instruqt';
      GRANT CONNECT ON DATABASE \"DevRel\" TO new_relic;
      GRANT pg_monitor TO new_relic;
    END IF;
  END
  \$\$;
" 2>/dev/null || true

# ---- 5. Initialize database (migrations + seeds) ----
echo "🗄️  Initializing database..."
cd packages/backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
cd ../..

# ---- 6. Start New Relic Infrastructure Agent (Option C fallback) ----
echo "🚀 Starting New Relic Infrastructure Agent..."
if [ -f /usr/bin/newrelic-infra ]; then
  # Check if a license key is provided (either in file or ENV)
  if grep -q "YOUR_LICENSE_KEY" /etc/newrelic-infra.yml && [ -z "${NR_LICENSE_KEY:-}" ]; then
    echo "⚠️  NR_LICENSE_KEY not found. Agent will start but not report."
  fi
  sudo /usr/bin/newrelic-infra -config /etc/newrelic-infra.yml > /var/log/newrelic-infra-stdout.log 2>&1 &
  echo "✅ Agent process started in background."
else
  echo "❌ New Relic Infrastructure Agent binary not found."
fi

echo ""
echo "============================================"
echo " ✅ Workshop environment is ready!"
echo ""
echo " Start both services:  npm start"
echo " Start backend only:   npm run start:backend"
echo " Start frontend only:  npm run start:frontend"
echo "============================================"
