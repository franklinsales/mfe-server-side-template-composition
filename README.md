# Microfrontends com Server Side Template Composition

Este projeto demonstra uma arquitetura de microfrontends **profissional** usando ReactJS, Vite.js e composição de templates no lado do servidor com Node.js/Express.

## 🏗️ Arquitetura

- **Shell App** (servidor Express) - Orquestra todos os microfrontends
- **Header Microfrontend** - Navegação e informações do usuário  
- **Products Microfrontend** - Lista de produtos
- **Cart Microfrontend** - Carrinho de compras
- **About Microfrontend** - Informações sobre o projeto
- **Profile Microfrontend** - Perfil do usuário
- **Router Client-Side** - Sistema de navegação por rotas
- **Estado Global** - Compartilhado entre todos os microfrontends

## ✨ Funcionalidades Implementadas

### 🧭 Sistema de Roteamento
- **Navegação por âncoras**: #home, #products, #cart, #about, #profile
- **Botões funcionais**: Navegação totalmente interativa no header
- **Estado ativo**: Visual feedback da rota atual
- **Scroll suave**: Transições suaves entre seções

### 🎨 Interface Melhorada
- **Design responsivo**: Funciona em desktop e mobile
- **Componentes interativos**: Todos os botões são funcionais
- **Feedback visual**: Estados hover e ativo
- **UX consistente**: Design system unificado

### 🔧 Microfrontends Adicionais
- **About**: Página institucional com informações da arquitetura
- **Profile**: Gerenciamento de perfil do usuário
- **Store melhorado**: Sistema de estado com roteamento integrado

## 📁 Estrutura do Projeto

```
├── microfrontends/          # Microfrontends independentes
│   ├── header/              # Cabeçalho + navegação
│   ├── products/            # Lista de produtos
│   ├── cart/                # Carrinho de compras
│   ├── about/               # Página sobre o projeto
│   └── profile/             # Perfil do usuário
├── server/                  # Shell App (Express)
├── shared/                  # Estado global + utilitários + router
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

## 🎯 Navegação e Rotas

### 🧭 Como navegar:
- **Home**: [http://localhost:3000](http://localhost:3000) ou [http://localhost:3000#home](http://localhost:3000#home)
- **Produtos**: [http://localhost:3000#products](http://localhost:3000#products)
- **Carrinho**: [http://localhost:3000#cart](http://localhost:3000#cart)
- **Sobre**: [http://localhost:3000#about](http://localhost:3000#about)
- **Perfil**: [http://localhost:3000#profile](http://localhost:3000#profile)

### 📊 Endpoints de sistema:
- **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)
- **Métricas**: [http://localhost:3000/metrics](http://localhost:3000/metrics)

## ✨ Funcionalidades Profissionais

### 🧭 **Router & Navegação**
- ✅ Sistema de rotas client-side funcional
- ✅ Navegação por hash (#products, #cart, etc.)
- ✅ Scroll suave entre seções
- ✅ Estados visuais ativos na navegação
- ✅ Integração completa com store global

### 🎨 **Interface & UX**
- ✅ Design responsivo e moderno
- ✅ Botões totalmente funcionais
- ✅ Feedback visual (hover, active, focus)
- ✅ Transições e animações suaves
- ✅ Sistema de cores consistente

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

### 🏠 **Home**
- Página de boas-vindas com hero section
- Navegação para todas as seções

### 🧭 **Header**
- Navegação principal funcional
- Informações do usuário clicáveis
- Contador do carrinho interativo
- Logo clicável para home

### 🛍️ **Products**
- Lista de produtos com detalhes
- Botão "Adicionar ao Carrinho" funcional
- Design de cards responsivo

### 🛒 **Cart**
- Gerenciamento completo do carrinho
- Controles de quantidade (+/-)
- Remoção de itens
- Cálculo de totais em tempo real
- Botão limpar carrinho

### ℹ️ **About**
- Informações detalhadas da arquitetura
- Explicação dos microfrontends
- Stack tecnológico usado
- Benefícios da arquitetura

### 👤 **Profile**
- Edição de informações do usuário
- Estatísticas da conta
- Configurações de notificações
- Ações da conta

### 🌐 **Estado Global**
- Sincronização automática entre microfrontends
- Persistência de dados do carrinho
- Sistema de roteamento integrado
- Debug mode com logs detalhados

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
