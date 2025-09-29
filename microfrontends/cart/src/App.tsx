import { useState, useEffect } from 'react'
import './App.css'
import type { CartItem } from '../../../shared/store'
import store from '../../../shared/store'

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    // Carregar estado inicial do carrinho
    const currentState = store.getState()
    setCartItems(currentState.cart)
    setTotal(store.getCartTotal())

    // Escutar mudanças no carrinho
    const unsubscribe = store.subscribe((state) => {
      setCartItems(state.cart)
      setTotal(store.getCartTotal())
    })

    return unsubscribe
  }, [])

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      store.removeFromCart(productId)
      return
    }

    const currentState = store.getState()
    const existingItem = currentState.cart.find(item => item.id === productId)
    
    if (existingItem) {
      // Remove o item atual e adiciona com nova quantidade
      store.removeFromCart(productId)
      
      // Adiciona o produto quantas vezes for necessário
      for (let i = 0; i < newQuantity; i++) {
        store.addToCart({
          id: existingItem.id,
          name: existingItem.name,
          description: existingItem.description,
          price: existingItem.price
        })
      }
    }
  }

  const removeFromCart = (productId: number) => {
    store.removeFromCart(productId)
  }

  const clearCart = () => {
    store.clearCart()
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container" id="cart">
        <h2>Seu Carrinho</h2>
        <div className="empty-cart">
          <p>Seu carrinho está vazio</p>
          <p>Adicione alguns produtos para começar!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container" id="cart">
      <h2>Seu Carrinho</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="item-price">R$ {item.price.toFixed(2)}</p>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remover
              </button>
            </div>
            <div className="item-total">
              R$ {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-btn">
            Limpar Carrinho
          </button>
          <button className="checkout-btn">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
