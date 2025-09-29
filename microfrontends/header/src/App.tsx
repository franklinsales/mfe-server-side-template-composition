import { useState, useEffect } from 'react'
import './App.css'

interface User {
  name: string;
  email: string;
}

interface GlobalState {
  cart: Array<{ id: number; quantity: number }>;
  user: User;
}

declare global {
  interface Window {
    globalStore?: {
      getState(): GlobalState;
      subscribe(callback: (state: GlobalState) => void): () => void;
      getCartItemCount(): number;
    };
  }
}

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Conecta com o store global
    if (window.globalStore) {
      const updateState = (state: GlobalState) => {
        setCartCount(window.globalStore?.getCartItemCount() || 0);
        setUser(state.user);
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
      <div className="logo">🛍️ MicroShop</div>
      
      <nav className="nav">
        <a href="#products" className="nav-link">Produtos</a>
        <a href="#cart" className="nav-link">Carrinho</a>
        <a href="#about" className="nav-link">Sobre</a>
      </nav>

      <div className="user-info">
        {user && <span>Olá, {user.name}!</span>}
        <div className="cart-badge">{cartCount}</div>
      </div>
    </header>
  )
}

export default App
