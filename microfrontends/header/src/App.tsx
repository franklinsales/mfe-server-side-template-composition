import { useState, useEffect } from 'react'
import './App.css'

interface User {
  name: string;
  email: string;
}

interface GlobalState {
  cart: Array<{ id: number; quantity: number }>;
  user: User;
  currentRoute: string;
}

declare global {
  interface Window {
    globalStore?: {
      getState(): GlobalState;
      subscribe(callback: (state: GlobalState) => void): () => void;
      getCartItemCount(): number;
      navigateTo(route: string): void;
      getCurrentRoute(): string;
    };
  }
}

function Navigation() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [currentRoute, setCurrentRoute] = useState('products')

  useEffect(() => {
    // Conecta com o store global
    if (window.globalStore) {
      const updateState = (state: GlobalState) => {
        setCartCount(window.globalStore?.getCartItemCount() || 0);
        setUser(state.user);
        setCurrentRoute(state.currentRoute);
      };

      // Estado inicial
      updateState(window.globalStore.getState());

      // Subscreve às mudanças
      const unsubscribe = window.globalStore.subscribe(updateState);
      
      return unsubscribe;
    }
  }, []);

  return (
    <header className="header">
      <a href="/products" className="logo">
        🛍️ MicroShop
      </a>
      
      <nav className="nav">
        <a 
          href="/products" 
          className={`nav-link ${currentRoute === 'products' ? 'active' : ''}`}
        >
          Produtos
        </a>
        <a 
          href="/cart" 
          className={`nav-link ${currentRoute === 'cart' ? 'active' : ''}`}
        >
          Carrinho
        </a>
      </nav>

      <div className="user-info">
        {user && (
          <span className="user-name">
            Olá, {user.name}!
          </span>
        )}
        <a 
          href="/cart"
          className={`cart-badge ${currentRoute === 'cart' ? 'active' : ''}`}
        >
          {cartCount}
        </a>
      </div>
    </header>
  )
}

function App() {
  return <Navigation />
}

export default App
