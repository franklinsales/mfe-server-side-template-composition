// Router module para gerenciar navegação entre microfrontends
// Seguindo padrões de Server-Side Template Composition

class MicrofrontendRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = this.getInitialRoute();
    this.listeners = new Set();
    this.setupEventListeners();
  }

  /**
   * Obtém a rota inicial baseada na URL atual
   */
  getInitialRoute() {
    const path = window.location.pathname;
    if (path === '/' || path === '/products') return 'products';
    if (path === '/cart') return 'cart';
    return 'products'; // fallback
  }

  /**
   * Registra uma rota com seu elemento correspondente
   */
  registerRoute(route, element) {
    this.routes.set(route, element);
  }

  /**
   * Configura event listeners para navegação
   */
  setupEventListeners() {
    // Intercepta cliques em links internos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.hasAttribute('data-external')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigateTo(href.slice(1) || 'products');
      }
    });

    // Gerencia navegação do browser (back/forward)
    window.addEventListener('popstate', () => {
      const route = this.getInitialRoute();
      this.setCurrentRoute(route, false); // false = não adicionar ao history
    });
  }

  /**
   * Navega para uma rota específica
   */
  navigateTo(route, addToHistory = true) {
    if (route === this.currentRoute) return;
    
    this.setCurrentRoute(route, addToHistory);
  }

  /**
   * Define a rota atual e atualiza a UI
   */
  setCurrentRoute(route, addToHistory = true) {
    const previousRoute = this.currentRoute;
    this.currentRoute = route;

    // Atualiza a URL no browser
    if (addToHistory) {
      const url = route === 'products' ? '/' : `/${route}`;
      window.history.pushState({ route }, '', url);
    }

    // Atualiza a visualização
    this.updateView(route, previousRoute);

    // Notifica listeners
    this.notifyListeners(route, previousRoute);
  }

  /**
   * Atualiza a visualização mostrando/escondendo seções
   */
  updateView(currentRoute, previousRoute) {
    // Esconde a seção anterior
    if (previousRoute) {
      const prevSection = document.getElementById(`page-${previousRoute}`);
      if (prevSection) {
        prevSection.classList.remove('active');
        prevSection.style.display = 'none';
      }
    }

    // Mostra a seção atual
    const currentSection = document.getElementById(`page-${currentRoute}`);
    if (currentSection) {
      currentSection.style.display = 'block';
      currentSection.classList.add('active');
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Adiciona listener para mudanças de rota
   */
  onRouteChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notifica todos os listeners sobre mudança de rota
   */
  notifyListeners(currentRoute, previousRoute) {
    this.listeners.forEach(callback => {
      try {
        callback(currentRoute, previousRoute);
      } catch (error) {
        console.error('Erro no listener de rota:', error);
      }
    });
  }

  /**
   * Obtém a rota atual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Verifica se uma rota está ativa
   */
  isActive(route) {
    return this.currentRoute === route;
  }

  /**
   * Inicializa o router
   */
  init() {
    // Mostra a página inicial
    this.updateView(this.currentRoute);
    
    // Notifica que o router foi inicializado
    this.notifyListeners(this.currentRoute, null);
    
    console.log(`[Router] Inicializado na rota: ${this.currentRoute}`);
  }
}

// Instância global do router
if (typeof window !== 'undefined') {
  window.microfrontendRouter = new MicrofrontendRouter();
}

export default window.microfrontendRouter;