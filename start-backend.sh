#!/usr/bin/env bash
# Run from the project root: bash start-backend.sh
set -e
cd "$(dirname "$0")/backend"

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt --quiet

echo "🚀 Starting FastAPI backend on http://localhost:8000"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
