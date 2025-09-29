# Server-Side Template Composition Architecture

## 🏗️ Arquitetura

Este projeto implementa um padrão **Server-Side Template Composition** para microfrontends, seguindo as melhores práticas da indústria.

## 📁 Estrutura do Projeto

```
├── server/
│   ├── index.js          # Servidor Express com template composition
│   ├── router.js         # Router dedicado para navegação SPA
│   └── assets/           # Assets globais compartilhados
├── microfrontends/
│   ├── header/           # Microfrontend de navegação
│   ├── products/         # Microfrontend de catálogo
│   ├── cart/             # Microfrontend de carrinho
│   └── about/            # Microfrontend de informações
├── shared/
│   ├── store.js          # Store global para comunicação entre MFEs
│   └── components/       # Componentes compartilhados
└── dist/                 # Build artifacts dos microfrontends
```

## 🎯 Padrões Implementados

### 1. **Server-Side Template Composition**
- ✅ Composição de templates no servidor Express
- ✅ Assets extraídos dinamicamente dos microfrontends
- ✅ Injeção de CSS e JS de forma otimizada
- ✅ SEO-friendly com renderização server-side

### 2. **Roteamento Centralizado**
- ✅ Router dedicado (`router.js`) para gerenciar navegação
- ✅ URLs limpas sem hashtags (`/products`, `/cart`)
- ✅ Suporte a back/forward do browser
- ✅ Interceptação de links para navegação SPA

### 3. **Comunicação Entre Microfrontends**
- ✅ Store global reativo para compartilhar estado
- ✅ Event-driven architecture entre componentes
- ✅ Isolamento de estado por microfrontend
- ✅ Interface unificada para comunicação

### 4. **Build e Deploy Independente**
- ✅ Cada microfrontend possui seu próprio build
- ✅ Versionamento independente de assets
- ✅ Deploy granular por funcionalidade
- ✅ Cache busting automático

## 🔧 Tecnologias

### Frontend
- **React 19** - Componentes reativos
- **TypeScript** - Type safety
- **Vite** - Build tool moderno
- **CSS Modules** - Isolamento de estilos

### Backend
- **Express.js** - Servidor web
- **Server-Side Rendering** - Template composition
- **Static File Serving** - Assets dos microfrontends

## 🚀 Boas Práticas Implementadas

### 1. **Separação de Responsabilidades**
```javascript
// Cada microfrontend é responsável por uma única funcionalidade
header/     → Navegação e autenticação
products/   → Catálogo de produtos
cart/       → Gerenciamento de carrinho
```

### 2. **Comunicação Reativa**
```javascript
// Store global com padrão Observer
class GlobalStore {
  subscribe(callback) { /* ... */ }
  setState(newState) { /* notifica listeners */ }
}
```

### 3. **Roteamento Profissional**
```javascript
// Router dedicado com interceptação de links
class MicrofrontendRouter {
  navigateTo(route) { /* SPA navigation */ }
  onRouteChange(callback) { /* reactive updates */ }
}
```

### 4. **Performance Otimizada**
```html
<!-- Assets carregados de forma otimizada -->
<link rel="stylesheet" href="/header/assets/main-[hash].css">
<script type="module" src="/header/assets/main-[hash].js"></script>
```

## 📊 Benefícios da Arquitetura

### ✅ **Escalabilidade**
- Times independentes por microfrontend
- Deploy granular e versionamento
- Tecnologias heterogêneas suportadas

### ✅ **Performance**
- Lazy loading de funcionalidades
- Cache estratégico por microfrontend
- Bundle splitting automático

### ✅ **Manutenibilidade**
- Código isolado e testável
- Debugging simplificado
- Refactoring sem impacto global

### ✅ **SEO & UX**
- URLs limpas e semânticas
- Navegação instantânea (SPA)
- Fallback graceful para JavaScript desabilitado

## 🎨 Responsividade

- **Mobile First**: Design adaptativo desde 320px
- **Breakpoints**: 480px, 768px, 1200px, 1600px, 2000px
- **Grid System**: CSS Grid com auto-fit e minmax
- **Typography Scale**: Tipografia fluida e responsiva

## 🔒 Segurança

- **CSP Headers**: Content Security Policy configurado
- **CORS**: Cross-Origin Resource Sharing adequado
- **Input Validation**: Sanitização nos boundaries
- **Error Boundaries**: Isolamento de falhas por MFE

## 📈 Monitoramento

- **Health Checks**: Endpoint `/health` com métricas
- **Error Tracking**: Logs estruturados por microfrontend
- **Performance**: Web Vitals e métricas customizadas
- **Analytics**: Tracking de navegação e interações

---

**🏆 Esta arquitetura demonstra conhecimento avançado em:**
- Micro-frontend patterns
- Server-side composition
- Modern React patterns
- Performance optimization
- Enterprise-grade architecture