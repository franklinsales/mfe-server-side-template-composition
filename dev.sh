#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento..."

# Função para parar processos em caso de Ctrl+C
cleanup() {
    echo "🛑 Parando todos os processos..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT

# Inicia o servidor principal
echo "📡 Iniciando servidor principal..."
cd server
npm run dev &
SERVER_PID=$!

# Aguarda um pouco para o servidor iniciar
sleep 2

# Monitora o health check
echo "🏥 Monitorando health check..."
while true; do
    if curl -s http://localhost:3000/health > /dev/null; then
        echo "✅ Sistema saudável ($(date))"
    else
        echo "❌ Sistema com problemas ($(date))"
    fi
    sleep 30
done &

echo "🎯 Ambiente pronto!"
echo "📊 Health check: http://localhost:3000/health"
echo "🌐 Aplicação: http://localhost:3000"
echo "👀 Logs do servidor serão exibidos abaixo..."
echo "Press Ctrl+C to stop"

# Aguarda indefinidamente
wait