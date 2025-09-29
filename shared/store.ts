// Tipos do estado global
export interface User {
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface GlobalState {
  cart: CartItem[];
  user: User;
  loading: boolean;
  error: string | null;
}

export type StateListener = (state: GlobalState) => void;

// Estado global compartilhado entre microfrontends
class GlobalStore {
  private state: GlobalState;
  private listeners: StateListener[];
  private debug: boolean;

  constructor() {
    this.state = {
      cart: [],
      user: { name: 'João Silva', email: 'joao@email.com' },
      loading: false,
      error: null
    };
    this.listeners = [];
    this.debug = window.location.hostname === 'localhost';
    
    this.log('🏪 Store inicializado');
  }

  private log(message: string, data?: unknown): void {
    if (this.debug) {
      console.log(`[GlobalStore] ${message}`, data || '');
    }
  }

  getState(): GlobalState {
    return { ...this.state };
  }

  setState(newState: Partial<GlobalState>): void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.log('📊 Estado atualizado', { prevState, newState: this.state });
    this.notify();
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    this.log(`👂 Novo listener registrado (total: ${this.listeners.length})`);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
      this.log(`👋 Listener removido (total: ${this.listeners.length})`);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('[GlobalStore] Erro ao notificar listener:', error);
      }
    });
  }

  // Actions específicas
  addToCart(product: Omit<CartItem, 'quantity'>): void {
    this.log('🛒 Adicionando produto ao carrinho', product);
    
    const existingItem = this.state.cart.find(item => item.id === product.id);
    let newCart: CartItem[];
    
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

  removeFromCart(productId: number): void {
    this.log('🗑️ Removendo produto do carrinho', { productId });
    const newCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: newCart });
  }

  clearCart(): void {
    this.log('🧹 Limpando carrinho');
    this.setState({ cart: [] });
  }

  setLoading(loading: boolean): void {
    this.setState({ loading });
  }

  setError(error: string | null): void {
    this.log('❌ Erro registrado', error);
    this.setState({ error });
  }

  getCartTotal(): number {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.state.cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Declaração global para TypeScript
declare global {
  interface Window {
    globalStore: GlobalStore;
  }
}

// Instância global
window.globalStore = window.globalStore || new GlobalStore();
export default window.globalStore;