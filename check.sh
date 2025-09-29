#!/bin/bash

echo "🔍 Executando verificações de qualidade..."

# Verifica se todos os microfrontends foram buildados
echo "📦 Verificando builds..."
if [ ! -d "dist/header" ]; then
    echo "❌ Build do header não encontrado"
    exit 1
fi

if [ ! -d "dist/products" ]; then
    echo "❌ Build dos products não encontrado"
    exit 1
fi

if [ ! -d "dist/cart" ]; then
    echo "❌ Build do cart não encontrado"
    exit 1
fi

echo "✅ Todos os builds encontrados"

# Verifica health check
echo "🏥 Testando health check..."
if curl -f http://localhost:3000/health 2>/dev/null; then
    echo "✅ Health check passou"
else
    echo "❌ Health check falhou - servidor pode não estar rodando"
fi

# Verifica se arquivos essenciais existem
echo "📁 Verificando arquivos essenciais..."
essential_files=(
    "shared/store.js"
    "server/index.js"
    ".env"
    "README.md"
)

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file não encontrado"
    fi
done

echo "🎉 Verificações concluídas!"