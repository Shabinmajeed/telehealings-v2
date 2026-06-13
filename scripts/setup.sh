#!/bin/bash
set -e

PROJECT="/home/azureuser/Telehealings"

echo "═══════════════════════════════════════════"
echo "  TeleHealings — Dev Setup Script"
echo "═══════════════════════════════════════════"

# ── Create remaining directory structure ──
echo "📁 Creating directory structure..."

# Web admin
mkdir -p $PROJECT/packages/web-admin/src/{components/{ui,layout,charts},hooks,pages,services,stores,types,utils}

# Web therapist (similar structure)
mkdir -p $PROJECT/packages/web-therapist/src/{components/{ui,layout},pages,services,stores,types,utils}
mkdir -p $PROJECT/packages/web-therapist

# Mobile
mkdir -p $PROJECT/packages/mobile/{app,src/{components,screens,services,stores,utils,context,assets/images}}

echo "✅ Directories created"

# ── Create web-therapist package.json ──
cat > $PROJECT/packages/web-therapist/package.json << 'EOF'
{
  "name": "@telehealings/web-therapist",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "tsc && vite build",
    "preview": "vite preview --port 5173",
    "lint": "eslint . --ext ts,tsx",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "@tanstack/react-query": "^5.62.7",
    "axios": "^1.7.9",
    "zustand": "^5.0.2",
    "zod": "^3.24.1",
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "lucide-react": "^0.468.0",
    "clsx": "^2.1.1",
    "@telehealings/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "@tailwindcss/forms": "^0.5.9",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "eslint": "^9.17.0"
  }
}
EOF

# ── Create mobile package.json ──
cat > $PROJECT/packages/mobile/package.json << 'EOF'
{
  "name": "@telehealings/mobile",
  "version": "1.0.0",
  "private": true,
  "main": "index.js",
  "scripts": {
    "dev": "expo start --port 3001",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web --port 3001",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf .expo dist"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.76.5",
    "expo": "~52.0.0",
    "expo-router": "~4.0.17",
    "expo-secure-store": "~14.0.1",
    "expo-image-picker": "~16.0.4",
    "expo-linear-gradient": "~14.0.1",
    "expo-blur": "~14.0.1",
    "@react-native-async-storage/async-storage": "2.1.0",
    "react-native-svg": "15.10.1",
    "react-native-reanimated": "3.16.7",
    "zustand": "^5.0.2",
    "@tanstack/react-query": "^5.62.7",
    "axios": "^1.7.9",
    "react-native-gesture-handler": "~2.21.2",
    "react-native-safe-area-context": "4.14.1",
    "@expo/vector-icons": "^14.0.4",
    "react-native-screens": "~4.4.0",
    "@react-navigation/native": "^7.0.14",
    "@telehealings/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "~18.3.17",
    "@types/react-native": "~0.76.5",
    "typescript": "^5.7.2",
    "@babel/core": "^7.26.0"
  }
}
EOF

echo "✅ Package configs created"

# ── Create .gitignore ──
cat > $PROJECT/.gitignore << 'EOF'
# Dependencies
node_modules
**/node_modules

# Build outputs
dist
build
.expo
.next

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode
.idea
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug-lock.*

# Prisma
**/prisma/migrations

# Turbo
.turbo

# Temp
tmp
*.tmp
EOF

echo "✅ .gitignore created"

# ── Install dependencies ──
echo ""
echo "📦 Installing dependencies..."
cd $PROJECT
npm install --legacy-peer-deps 2>&1 | tail -20

echo ""
echo "═══════════════════════════════════════════"
echo "  ✅ Setup Complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "To start development:"
echo "  npm run dev          — Start all portals"
echo "  npm run dev:admin    — Admin portal only (port 5174)"
echo "  npm run dev:therapist — Therapist portal (port 5173)"
echo "  npm run dev:mobile   — Mobile app (port 3001)"
echo "  npm run dev:backend  — Backend API (port 5172)"
echo ""
