#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm ci --production=false

echo "🔨 Building React app..."
npm run build

echo "✅ Build complete!"
