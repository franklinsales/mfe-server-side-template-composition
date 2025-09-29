import './App.css'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

declare global {
  interface Window {
    globalStore?: {
      addToCart(product: Product): void;
    };
  }
}

const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    description: 'Smartphone com 128GB de armazenamento, câmera de 48MP e tela de 6.1"',
    price: 899.99
  },
  {
    id: 2,
    name: 'Notebook Pro',
    description: 'Notebook para desenvolvimento com 16GB RAM, SSD 512GB e processador Intel i7',
    price: 2499.99
  },
  {
    id: 3,
    name: 'Fone Bluetooth',
    description: 'Fone de ouvido sem fio com cancelamento de ruído e 30h de bateria',
    price: 299.99
  },
  {
    id: 4,
    name: 'Mouse Gamer',
    description: 'Mouse óptico com 16000 DPI, RGB personalizável e 8 botões programáveis',
    price: 149.99
  },
  {
    id: 5,
    name: 'Teclado Mecânico',
    description: 'Teclado mecânico com switches Cherry MX, RGB e layout ABNT2',
    price: 349.99
  },
  {
    id: 6,
    name: 'Monitor 4K',
    description: 'Monitor 27" 4K UHD, 144Hz, painel IPS com suporte a HDR10',
    price: 1299.99
  }
];

function App() {
  const handleAddToCart = (product: Product) => {
    if (window.globalStore) {
      window.globalStore.addToCart(product);
    } else {
      alert(`Adicionado ao carrinho: ${product.name}`);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Nossos Produtos</h2>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
            <button 
              className="add-button"
              onClick={() => handleAddToCart(product)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
