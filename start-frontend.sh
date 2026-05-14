#!/usr/bin/env bash
# Run from the project root: bash start-frontend.sh
set -e
cd "$(dirname "$0")/frontend"

echo "📦 Installing Node dependencies..."
npm install

echo "🚀 Starting React frontend on http://localhost:3000"
npm start
