# Microfrontends com Server Side Template Composition

Este projeto demonstra uma arquitetura de microfrontends **profissional** usando ReactJS, Vite.js e composição de templates no lado do servidor com Node.js/Express.

## 🏗️ Arquitetura

- **Shell App** (servidor Express) - Orquestra todos os microfrontends
- **Header Microfrontend** - Navegação e informações do usuário
- **Products Microfrontend** - Lista de produtos
- **Cart Microfrontend** - Carrinho de compras
- **Estado Global** - Compartilhado entre todos os microfrontends

## 📁 Estrutura do Projeto

```
├── microfrontends/          # Microfrontends independentes
│   ├── header/              # Cabeçalho + navegação
│   ├── products/            # Lista de produtos
│   └── cart/                # Carrinho de compras
├── server/                  # Shell App (Express)
├── shared/                  # Estado global + utilitários
├── dist/                    # Builds dos microfrontends
├── .env                     # Configurações do ambiente
└── scripts/                 # Scripts de desenvolvimento
```

## 🚀 Como rodar

### Método rápido (recomendado):
```bash
# Instalar dependências + build + start
npm run build
npm start
```

### Desenvolvimento:
```bash
# Ambiente de desenvolvimento com hot reload
npm run dev
```

### Verificação de qualidade:
```bash
# Verificar se tudo está funcionando
npm run check
```

## 🎯 Endpoints Disponíveis

- **Aplicação**: [http://localhost:3000](http://localhost:3000)
- **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)
- **Métricas**: [http://localhost:3000/metrics](http://localhost:3000/metrics)

## ✨ Funcionalidades Profissionais

### 🔧 **DevOps & Monitoramento**
- ✅ Health checks automatizados
- ✅ Métricas básicas (requests, uptime, memory)
- ✅ Logging estruturado com timestamps
- ✅ Variáveis de ambiente configuráveis
- ✅ Scripts de verificação de qualidade

### 🛡️ **Tratamento de Erros**
- ✅ Error boundaries para microfrontends
- ✅ Loading states
- ✅ Tratamento de falhas de rede
- ✅ Debug mode com logs detalhados

### ⚡ **Performance & UX**
- ✅ Loading spinners
- ✅ Estado reativo em tempo real
- ✅ CSS Modules para isolamento
- ✅ Build otimizado com Vite

### 🔄 **Desenvolvimento**
- ✅ Hot reload no modo dev
- ✅ Scripts automatizados
- ✅ Versionamento de microfrontends
- ✅ Configuração via `.env`

## 🎮 Funcionalidades da Aplicação

- **Header**: Informações do usuário + contador do carrinho
- **Products**: Lista de produtos com "Adicionar ao Carrinho"
- **Cart**: Gerenciamento do carrinho + finalização
- **Estado Global**: Sincronização automática entre microfrontends

## 🔧 Scripts Disponíveis

```bash
npm run build        # Build todos os microfrontends
npm start           # Inicia servidor de produção
npm run dev         # Ambiente de desenvolvimento
npm run check       # Verificações de qualidade
npm run clean       # Limpa builds anteriores
npm run install-deps # Instala todas as dependências
```

## 🌐 Configuração de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
NODE_ENV=development
PORT=3000
HOST=localhost
MICROFRONTEND_HEADER_VERSION=1.0.0
MICROFRONTEND_PRODUCTS_VERSION=1.0.0
MICROFRONTEND_CART_VERSION=1.0.0
```

## 📊 Monitoramento

O projeto inclui endpoints de monitoramento para produção:

- **Health**: Status dos microfrontends
- **Metrics**: Contadores de requests, uso de memória
- **Logs**: Timestamps estruturados no console

## 🎯 Conceitos Demonstrados

- ✅ **Server Side Template Composition**
- ✅ **Estado Global Compartilhado**
- ✅ **CSS Modules & Isolamento**
- ✅ **Error Boundaries**
- ✅ **Health Checks & Monitoramento**
- ✅ **Configuração via Environment**
- ✅ **Scripts de Automação**
