// Estado global compartilhado entre microfrontends
class GlobalStore {
  constructor() {
    this.state = {
      cart: [],
      user: { name: 'João Silva', email: 'joao@email.com' },
      loading: false,
      error: null
    };
    this.listeners = [];
    this.debug = process?.env?.NODE_ENV === 'development' || window.location.hostname === 'localhost';
    
    this.log('🏪 Store inicializado');
  }

  log(message, data = null) {
    if (this.debug) {
      console.log(`[GlobalStore] ${message}`, data || '');
    }
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.log('📊 Estado atualizado', { prevState, newState: this.state });
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    this.log(`👂 Novo listener registrado (total: ${this.listeners.length})`);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
      this.log(`👋 Listener removido (total: ${this.listeners.length})`);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('[GlobalStore] Erro ao notificar listener:', error);
      }
    });
  }

  // Actions específicas
  addToCart(product) {
    this.log('🛒 Adicionando produto ao carrinho', product);
    
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
    this.log('🗑️ Removendo produto do carrinho', { productId });
    const newCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: newCart });
  }

  clearCart() {
    this.log('🧹 Limpando carrinho');
    this.setState({ cart: [] });
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  setError(error) {
    this.log('❌ Erro registrado', error);
    this.setState({ error });
  }

  getCartTotal() {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount() {
    return this.state.cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Instância global
window.globalStore = window.globalStore || new GlobalStore();
export default window.globalStore;