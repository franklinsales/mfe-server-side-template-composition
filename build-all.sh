#!/bin/bash

echo "🚀 Buildando todos os microfrontends..."

# Build Header
echo "📦 Buildando Header..."
cd microfrontends/header
rm -rf node_modules package-lock.json
npm install --silent
npm run build

# Build Products
echo "📦 Buildando Products..."
cd ../products
rm -rf node_modules package-lock.json
npm install --silent
npm run build

# Build Cart
echo "📦 Buildando Cart..."
cd ../cart
rm -rf node_modules package-lock.json
npm install --silent
npm run build

# Build About
echo "📦 Buildando About..."
cd ../about
rm -rf node_modules package-lock.json
npm install --silent
npm run build

# Build Profile
echo "📦 Buildando Profile..."
cd ../profile
rm -rf node_modules package-lock.json
npm install --silent
npm run build

# Install server dependencies
echo "📦 Instalando dependências do servidor..."
cd ../../server
npm install --silent

echo "✅ Build completo com Vite 7.1.7! Execute 'npm start' na pasta server para rodar a aplicação."