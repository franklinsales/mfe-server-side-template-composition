class GlobalStore {
  constructor() {
    this.state = {
      cart: [],
      user: { name: 'João Silva', email: 'joao@email.com' },
      loading: false,
      error: null,
      currentRoute: 'products'
    };
    this.listeners = [];
    this.debug = true;
    this.initializeRouter();
  }

  log(message, data) {
    if (this.debug) {
      console.log('[Store]', message, data || '');
    }
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Erro no listener:', error);
      }
    });
  }

  addToCart(product) {
    const existingItem = this.state.cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = this.state.cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...this.state.cart, { ...product, quantity: 1 }];
    }
    
    this.setState({ cart: newCart });
  }

  removeFromCart(productId) {
    const newCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: newCart });
  }

  clearCart() {
    this.setState({ cart: [] });
  }

  getCartTotal() {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount() {
    return this.state.cart.reduce((total, item) => total + item.quantity, 0);
  }

  initializeRouter() {
    // Integra com o microfrontend router quando disponível
    if (window.microfrontendRouter) {
      window.microfrontendRouter.onRouteChange((currentRoute) => {
        this.setState({ currentRoute });
      });
    } else {
      // Fallback para popstate direto
      window.addEventListener('popstate', () => {
        this.handleRouteChange();
      });
    }
    
    this.handleRouteChange();
  }

  handleRouteChange() {
    const path = window.location.pathname.slice(1) || 'products';
    const validRoutes = ['products', 'cart'];
    const route = validRoutes.includes(path) ? path : 'products';
    
    this.setState({ currentRoute: route });
    this.showCurrentPage(route);
  }

  navigateTo(route) {
    if (window.microfrontendRouter) {
      window.microfrontendRouter.navigateTo(route);
    } else {
      // Fallback para history API
      window.history.pushState({}, '', '/' + route);
      this.handleRouteChange();
    }
  }

  showCurrentPage(route) {
    setTimeout(() => {
      document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
      });
      
      const targetSection = document.querySelector('#page-' + route);
      if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }

  getCurrentRoute() {
    return this.state.currentRoute;
  }
}

window.globalStore = window.globalStore || new GlobalStore();
export default window.globalStore;
